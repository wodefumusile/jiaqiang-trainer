/**
 * 渲染心跳诊断（针对"画面定格但主循环还活着"这一症状）
 *
 * 原理：
 *   - step() 每帧都会更新 lastLoopTick（主循环心跳）→ 现有看门狗只看这个，
 *     一旦有代码提前 return 跳过 renderer.render()，看门狗完全检测不到；
 *   - 这里改看"真实出图计数 renders"，只要它停止增长就是画面真的定格了。
 *
 * 输出：每次定格（>300ms 没有新图）的持续时间 + 定格瞬间的敌人状态/路径长度。
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const SECONDS = Number(process.argv[3] ?? 25);

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(600);

const sample = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return {
      renders: d.perf().renders,
      sinceRenderMs: d.perf().sinceRenderMs,
      fps: d.perf().fps,
      state: d.ai.state,
      pathLen: d.ai.path.length,
      pos: [+d.enemy.group.position.x.toFixed(2), +d.enemy.group.position.z.toFixed(2)],
      loopError: d.perf().loopError,
    };
  });

const timeline = [];
const stalls = [];
const t0 = Date.now();
let stallStart = null;
let stallSnapshot = null;
let prev = await sample();
let prevAt = Date.now();

while (Date.now() - t0 < SECONDS * 1000) {
  await page.waitForTimeout(100);
  const now = Date.now();
  const s = await sample();
  const advanced = s.renders > prev.renders;
  if (!advanced) {
    if (stallStart === null) {
      stallStart = prevAt;
      stallSnapshot = prev;
    }
  } else {
    if (stallStart !== null && now - stallStart > 300) {
      stalls.push({ ms: now - stallStart, ...stallSnapshot });
    }
    stallStart = null;
    stallSnapshot = null;
  }
  // 每 2 秒记录一次轨迹，便于看整体节奏
  if (now - t0 > timeline.length * 2000) {
    timeline.push({
      t: ((now - t0) / 1000).toFixed(1),
      renders: s.renders,
      state: s.state,
      path: s.pathLen,
      pos: s.pos,
    });
  }
  prev = s;
  prevAt = now;
}

const last = await sample();
const elapsed = (Date.now() - t0) / 1000;
const stillFrozen = stallStart !== null;

console.log('TIMELINE', JSON.stringify(timeline));
console.log('RENDER_FPS', (last.renders / elapsed).toFixed(1), 'fps（真实出图）');
console.log('STALL_COUNT', stalls.length);
console.log(
  'STALLS',
  JSON.stringify(
    stalls.map((s) => ({
      ms: s.ms,
      state: s.state,
      pathLen: s.pathLen,
      pos: s.pos,
    })),
  ),
);
console.log('FROZEN_AT_END', stillFrozen, stillFrozen ? `已定格 ${Date.now() - stallStart} ms` : '');
console.log('FINAL', JSON.stringify(last));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
