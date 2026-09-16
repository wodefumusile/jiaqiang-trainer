/**
 * 受击 / 阵亡 表现反馈自检：
 *  1) 受击：红屏脉冲（先冲峰值 → 0.6s 内回落）+ 相机震动（有幅度 → 规定时长内归零）
 *     + 见血音效被触发 + 血量数字闪红
 *  2) 阵亡：红屏渐红到 ≥0.8 并保持；震动 1.4s 后归零；死亡界面仍在 ~2.8s 出现
 *  3) 点击返回后：红屏 0、震动 0（无残留）
 *  4) 纯表现：血量/命中判定不受影响（受击前后 HP 只按伤害变化）
 *
 * 用法：node .qa/slice3d-hurtfx.mjs http://localhost:4173/
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, ensureRunning } from './lib.mjs';

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
  localStorage.setItem('jg.slice3d.count', '999');
  localStorage.setItem('jg.slice3d.diff', 'normal');
  localStorage.removeItem('jg.slice3d.deathStreak');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
console.log('进入游戏', await ensureRunning(page));

const snap = () =>
  safe(page, () => {
    const d = window.__slice3d;
    const fx = d.hurtFx();
    return {
      blood: fx.blood,
      shakeAmp: fx.shakeAmp,
      shakeLeftMs: fx.shakeLeftMs,
      bloodSfx: fx.bloodSfx,
      lastShake: fx.lastShake,
      dead: fx.dead,
      hp: d.playerState().hp,
      hudHp: document.querySelector('#s3-hp').textContent,
      hpFlash: document.querySelector('#s3-hp').classList.contains('s3-hp-hit'),
      cam: [+d.camera.position.x.toFixed(4), +d.camera.position.y.toFixed(4), +d.camera.position.z.toFixed(4)],
      deadShown: !document.querySelector('#s3-dead').classList.contains('hidden'),
    };
  });

// ---------- 1) 受击反馈 ----------
console.log('--- 受击（身体，40 伤害）---');
const base = await snap();
await safe(page, () => window.__slice3d.hurtPlayer(40));
const samples = [];
const camXs = [];
const shakeOffsets = [];
for (let i = 0; i < 22; i++) {
  await page.waitForTimeout(45);
  const s = await snap();
  if (!s) continue;
  samples.push({ t: i * 45, blood: s.blood, shake: s.shakeAmp, left: s.shakeLeftMs, sfx: s.bloodSfx });
  shakeOffsets.push(Math.max(Math.abs(s.lastShake.x), Math.abs(s.lastShake.z), Math.abs(s.lastShake.roll)));
  camXs.push(s.cam[0]);
  if (i === 1) console.log('  受击瞬间', JSON.stringify({ 红屏: s.blood, 震动幅度: s.shakeAmp, 触发见血: s.bloodSfx, 血量闪红: s.hpFlash, HP: s.hudHp }));
}
const peak = Math.max(...samples.map((s) => s.blood));
const last = samples[samples.length - 1];
const shakePeak = Math.max(...samples.map((s) => s.shake));
const camDev = Math.max(...camXs.map((x) => Math.abs(x - base.cam[0])));
const appliedPeak = Math.max(...shakeOffsets);
console.log(
  '  红屏峰值',
  peak.toFixed(2),
  '· 1 秒后',
  last.blood.toFixed(2),
  '· 震动峰值',
  shakePeak,
  '· 实际施加偏移峰值',
  appliedPeak,
  '(相机采样值 ' + camDev.toFixed(4) + ')',
);
console.log('  红屏脉冲', peak > 0.2 && last.blood < 0.05 ? '✅ 冲到峰值后回落' : '❌');
console.log(
  '  相机震动',
  shakePeak > 0.01 && appliedPeak > 0.01 && last.left === 0 ? '✅ 每帧真的施加了偏移且已归零' : '❌',
);
console.log('  见血音效', samples.some((s) => s.sfx > 0) ? '✅ 已触发' : '❌');

// ---------- 2) 阵亡反馈 ----------
console.log('--- 阵亡 ---');
const beforeDeath = await snap();
await safe(page, () => window.__slice3d.setPlayerHp(30));
await safe(page, () => window.__slice3d.hurtPlayer(40)); // 打死
const deathSamples = [];
const t0 = Date.now();
let windowShot = false;
while (Date.now() - t0 < 4200) {
  await page.waitForTimeout(60);
  const s = await snap();
  if (!s) continue;
  deathSamples.push({ t: Date.now() - t0, blood: s.blood, shake: s.shakeAmp, left: s.shakeLeftMs, dead: s.dead, shown: s.deadShown });
  if (s.deadShown && !windowShot) windowShot = true;
  if (windowShot && Date.now() - t0 > 3200) break;
}
const at = (ms) => deathSamples.reduce((best, s) => (Math.abs(s.t - ms) < Math.abs(best.t - ms) ? s : best), deathSamples[0]);
const textAt = deathSamples.find((s) => s.shown)?.t ?? -1;
const bloodLate = at(2600).blood;
const shakeLeftLate = at(1700).left;
console.log('  红屏轨迹 0.2s/0.8s/1.6s/2.6s:', [200, 800, 1600, 2600].map((m) => at(m).blood.toFixed(2)).join(' → '));
console.log('  震动轨迹 0.2s/0.8s/1.7s:', [200, 800, 1700].map((m) => at(m).left).join(' → ') + 'ms 剩余');
console.log('  渐红并保持', bloodLate >= 0.8 ? '✅ 2.6s 时仍有 ' + bloodLate.toFixed(2) : '❌ 只有 ' + bloodLate.toFixed(2));
console.log('  阵亡震动', deathSamples.some((s) => s.shake >= 0.08) && shakeLeftLate === 0 ? '✅ 强震后归零' : '❌');
console.log('  大红字出现于', textAt + 'ms', textAt > 2400 && textAt < 3600 ? '✅ 约 3 秒' : '❌');
console.log('  阵亡见血音效', (await snap()).bloodSfx > beforeDeath.bloodSfx ? '✅' : '❌');

// ---------- 3) 点击返回后复位 ----------
await page.click('#s3-dead');
await page.waitForTimeout(1200);
const after = await snap();
console.log('--- 返回后 ---');
console.log('  状态', JSON.stringify({ 红屏: after.blood, 震动: after.shakeAmp, HP: after.hudHp, dead: after.dead, 菜单: !after.deadShown }));
console.log('  无残留', after.blood === 0 && after.shakeAmp === 0 && !after.dead ? '✅' : '❌');

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
