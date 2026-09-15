/**
 * 阵亡流程自检（需求：血量≤0 阵亡 → 死亡动画约 3 秒 → 大红字「你死了」→
 * 点击任意处返回开始界面；连续死 3 次改显示「又死了，你个菜鸡」）
 *
 * 验证点：
 *  1) 真血量：100 → 60 → 20 → 0（每一枪 40），HUD 同步
 *  2) 阵亡瞬间：不再接受输入、敌人停火，但渲染继续（动画能播）
 *  3) 死亡动画：相机高度从 1.62m 降到 ~0.34m 并侧倾
 *  4) 约 3 秒后弹出阵亡界面（红字 + 提示）
 *  5) 点击任意处 → 回开始界面，血量重置 100
 *  6) 连续 3 次阵亡 → 文案变成嘲讽；打满目标完成一局后计数清零
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, renders, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => {
  localStorage.setItem('jg.slice3d.count', '5'); // 打满 5 个即可"完成一局"
  localStorage.setItem('jg.slice3d.diff', 'normal');
  localStorage.removeItem('jg.slice3d.lastRecovery');
  localStorage.removeItem('jg.slice3d.deathStreak');
});
await page.goto(BASE, { waitUntil: 'networkidle' });

const snap = () =>
  safe(page, () => {
    const d = window.__slice3d;
    const hpEl = document.querySelector('#s3-hp');
    return {
      hp: d.playerState().hp,
      dead: d.playerState().dead,
      streak: d.playerState().streak,
      hudHp: hpEl.textContent,
      deadShown: !document.querySelector('#s3-dead').classList.contains('hidden'),
      deadText: document.querySelector('#s3-dead-text').textContent,
      streakText: document.querySelector('#s3-dead-streak').textContent,
      menuShown: !document.querySelector('#s3-overlay').classList.contains('hidden'),
      camY: +d.camera.position.y.toFixed(2),
      camRoll: +d.camera.rotation.z.toFixed(2),
      renders: d.perf().renders,
    };
  });

/** 走进游戏 */
const enter = async () => {
  await ensureRunning(page);
};

/** 打死玩家（走和敌人开火完全一样的伤害路径），返回阵亡耗时 */
const killPlayer = async () => {
  await safe(page, () => {
    window.__slice3d.hurtPlayer(40);
    window.__slice3d.hurtPlayer(40);
    window.__slice3d.hurtPlayer(40);
  });
  const t0 = Date.now();
  let textAt = 0;
  while (Date.now() - t0 < 8000) {
    await page.waitForTimeout(100);
    const s = await snap();
    if (s?.deadShown) {
      textAt = Date.now() - t0;
      break;
    }
  }
  return { textAt, state: await snap() };
};

console.log('进入游戏', (await enter(), (await snap())?.menuShown === false));

// 1) 真血量
const seq = [];
for (let i = 0; i < 2; i++) {
  await safe(page, () => window.__slice3d.hurtPlayer(40));
  await page.waitForTimeout(150);
  seq.push((await snap())?.hudHp);
}
console.log('受伤后的 HUD 血量（应为 60 / 20）', JSON.stringify(seq), JSON.stringify(seq) === '["60","20"]' ? '✅' : '❌');

// 2) 第三枪致死 + 动画 + 红字
const rendersBefore = (await snap())?.renders ?? 0;
const death = await killPlayer();
console.log('阵亡后', JSON.stringify({ dead: death.state?.dead, hp: death.state?.hp, streak: death.state?.streak }));
console.log('弹出红字耗时', death.textAt + 'ms', death.textAt > 2400 && death.textAt < 3600 ? '✅ 约 3 秒' : '❌ 时长不对');
console.log('阵亡文案', JSON.stringify(death.state?.deadText), death.state?.deadText === '你死了' ? '✅（第 1 次不该嘲讽）' : '❌');
const rendersAfter = (await snap())?.renders ?? 0;
console.log('动画期间持续出图', rendersBefore, '→', rendersAfter, rendersAfter > rendersBefore + 30 ? '✅' : '❌');

// 3) 倒地动画：再死一次，采样相机高度/侧倾
await page.click('#s3-dead'); // 回到开始界面
await page.waitForTimeout(1200);
await enter();
const samples = [];
await safe(page, () => {
  window.__slice3d.hurtPlayer(100);
});
for (let i = 0; i < 16; i++) {
  await page.waitForTimeout(200);
  const s = await snap();
  if (!s) break;
  samples.push({ t: i * 200, camY: s.camY, roll: s.camRoll });
}
const first = samples[0];
const settled = samples[samples.length - 1];
console.log('倒地动画', JSON.stringify({ 起始高度: first?.camY, 结束高度: settled?.camY, 结束侧倾: settled?.roll }));
console.log('相机倒下', first && settled && settled.camY < first.camY - 0.4 && settled.roll > 0.5 ? '✅ 高度下降且侧倾' : '❌');

// 4) 数组里已经死了 2 次 → 再死一次应出现嘲讽
await page.click('#s3-dead');
await page.waitForTimeout(1200);
await enter();
const third = await killPlayer();
console.log('第 3 次阵亡文案', JSON.stringify(third.state?.deadText), '· 计数行', JSON.stringify(third.state?.streakText));
console.log(
  '连续 3 次嘲讽',
  third.state?.deadText === '又死了，你个菜鸡' && third.state?.streakText.includes('3') ? '✅' : '❌',
);

// 5) 点击任意处 → 回开始界面 + 血量重置
await page.click('#s3-dead');
await page.waitForTimeout(1200);
const back = await snap();
console.log('点击后', JSON.stringify({ 菜单: back?.menuShown, 血量: back?.hudHp, 阵亡界面: back?.deadShown, dead: back?.dead }));
console.log('回到开始界面', back?.menuShown && !back?.deadShown && back?.hudHp === '100' && back?.dead === false ? '✅' : '❌');

// 6) 完成一局（打满 5 个）→ 连续阵亡计数清零
console.log('连续阵亡计数（完成前）', (await snap())?.streak);
await enter();
for (let i = 0; i < 12; i++) {
  await safe(page, () => {
    const d = window.__slice3d;
    if (d.ai.state !== 'dead') d.forceKill();
  });
  await page.waitForTimeout(700);
  const st = await safe(page, () => window.__slice3d.kills());
  if (st >= 5) break;
}
const afterWin = await snap();
console.log('打满目标后', JSON.stringify({ kills: await safe(page, () => window.__slice3d.kills()), streak: afterWin?.streak }));
console.log('完成一局清零', afterWin?.streak === 0 ? '✅' : '❌');

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
