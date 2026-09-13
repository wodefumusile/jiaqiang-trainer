/**
 * 定格复现：把敌人置于 walking（跟随路径点）状态，路径点故意设为"走不到"的位置。
 *
 * 原理：step() 的 walking 分支里若有 `return`，就会跳过 renderer.render()。
 *       路径点走不到 → moveEnemyTo 永远返回 false → 每帧都 return → 画面永久定格，
 *       而主循环心跳（lastLoopTick）照常更新 → 看门狗永远不会触发。
 *
 * 判定：注入后的 3 秒内 renders 是否继续增长。
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
await page.goto(BASE, { waitUntil: 'networkidle' });

let navs = 0;
page.on('framenavigated', (f) => {
  if (f === page.mainFrame()) navs++;
});

let total = 0;
let rendersPerWindow = [];
let state = null;
let loopError = null;
let attemptsUsed = 0;

// 环境偶发"丢上下文 → 自动重载"会打断测量，这里最多重试 3 次
for (let attempt = 0; attempt < 3; attempt++) {
  attemptsUsed = attempt + 1;
  if (!(await ensureRunning(page))) continue;
  const navBefore = navs;
  const before = await renders(page);
  // 注入：walking + 一个走不到的路径点
  await safe(page, () => {
    const d = window.__slice3d;
    const V = d.camera.position.constructor;
    d.ai.state = 'walking';
    d.ai.feintPlan = false;
    d.ai.path = [new V(50, 0, 50)];
  });
  rendersPerWindow = [];
  for (let i = 0; i < 12; i++) {
    const a = await renders(page);
    await page.waitForTimeout(250);
    const b = await renders(page);
    if (a < 0 || b < 0) {
      rendersPerWindow.push(-1); // 页面重载中
      continue;
    }
    rendersPerWindow.push(b - a);
  }
  const after = await renders(page);
  state = await safe(page, () => ({ state: window.__slice3d.ai.state, path: window.__slice3d.ai.path.length }));
  loopError = await safe(page, () => window.__slice3d.perf().loopError);
  total = after - before;
  // 测量期间发生重载 → 数据作废，重来
  if (navs === navBefore && !rendersPerWindow.includes(-1)) break;
}

console.log('RENDERS_PER_250MS', JSON.stringify(rendersPerWindow));
console.log('RENDERS_INJECTED_TOTAL', total);
console.log('AI_STATE', JSON.stringify(state));
console.log('LOOP_ERROR', JSON.stringify(loopError));
console.log('环境重载次数', navs, '· 本轮尝试', attemptsUsed);
// 每 250ms 正常应有 12~15 帧；低于 3 帧即视为"画面定格"
console.log('VERDICT', total < 30 ? '❌ 定格（walking 路径分支把渲染跳过了）' : '✅ 持续出图');
if (rendersPerWindow.filter((n) => n === 0).length) {
  console.log('FROZEN_WINDOWS', rendersPerWindow.filter((n) => n === 0).length, '/ 12');
}
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
