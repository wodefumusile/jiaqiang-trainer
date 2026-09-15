/**
 * 玩法回归（真实链路，不使用 forceKill）：
 *   敌人从掩体后刷新 → 拉出（walking，走路径）→ 站定架枪（aiming）
 *   → 玩家瞄准头部开一枪 → 击杀计数 +1
 * 同时全程监控"真实出图计数"，确认拉出过程中画面不再定格。
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
  localStorage.setItem('jg.slice3d.count', '5');
  localStorage.removeItem('jg.slice3d.lastRecovery');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

const snap = () =>
  safe(page, () => {
    const d = window.__slice3d;
    const p = d.perf();
    return {
      renders: p.renders,
      state: d.ai.state,
      hp: d.ai.hp,
      kills: d.kills(),
      info: d.enemyInfo(),
      loopError: p.loopError,
    };
  });

// 进入游戏（软件渲染环境可能丢上下文自动重载，工具函数会重新点进入）
const entered = await ensureRunning(page);
console.log('ENTERED', entered);

const seen = new Set();
let stalls = 0;
let lastRenders = (await snap())?.renders ?? 0;
let lastAdvance = Date.now();
let killed = null;
let walkStallMs = 0;
let deaths = 0;

for (let i = 0; i < 260; i++) {
  const s = await snap();
  if (!s) {
    await page.waitForTimeout(200);
    continue;
  }
  seen.add(s.state);
  const now = Date.now();
  if (s.renders > lastRenders) {
    lastRenders = s.renders;
    lastAdvance = now;
  } else if (now - lastAdvance > 400) {
    stalls++;
    if (s.state === 'walking') walkStallMs += now - lastAdvance;
  }
  // 站定架枪后，瞄准头部打一枪
  if (s.state === 'aiming' && killed === null) {
    const target = await safe(page, () => {
      const d = window.__slice3d;
      const g = d.enemy.group;
      const V = d.enemy.head.position.constructor;
      const v = new V(0, 1.63, 0);
      g.localToWorld(v);
      d.aimAt(v.x, v.y, v.z);
      return { x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) };
    });
    if (!target) continue;
    await page.waitForTimeout(120);
    await page.mouse.down();
    await page.waitForTimeout(60);
    await page.mouse.up();
    await page.waitForTimeout(400);
    const after = (await snap()) ?? s;
    killed = { target, kills: after.kills, state: after.state, hp: after.hp };
    console.log('HEADSHOT', JSON.stringify(killed));
  }
  // 玩家现在会真的被打死（3 枪阵亡）：出现阵亡界面就回菜单重开一局，最多重试 2 次
  if (await safe(page, () => window.__slice3d.playerState().dead)) {
    deaths++;
    console.log(`玩家阵亡（第 ${deaths} 次）→ 回菜单重开一局`);
    await page.click('#s3-dead').catch(() => {});
    await page.waitForTimeout(1200);
    await ensureRunning(page);
    killed = null;
    seen.clear();
    if (deaths >= 3) break;
    continue;
  }
  if (killed && seen.has('dead') && seen.has('hidden')) break;
  await page.waitForTimeout(120);
}

const final = await snap();
console.log('状态机走过', JSON.stringify([...seen]));
console.log('定格次数（>400ms）', stalls, '· 其中处于 walking 的累计毫秒', walkStallMs);
console.log('FINAL', JSON.stringify({ state: final.state, kills: final.kills, renders: final.renders, loopError: final.loopError }));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
