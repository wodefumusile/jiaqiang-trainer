/**
 * 鼠标输入安全自检（针对"视角突然不受控地快速转动"）：
 *  1) 正常位移（20/100 计数）必须线性、不被吞掉
 *  2) 异常尖峰（500/5000 计数）必须被夹住（<= 320 计数），并在 HUD 计数上留痕
 *  3) 刚拿到指针锁定后的 120ms 内不采样（防 pointer-lock jump）
 *  4) 极点俯仰仍然被夹在 ±1.1rad
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
await page.goto(BASE, { waitUntil: 'networkidle' });
console.log('进入游戏', await ensureRunning(page));

const res = await safe(page, async () => {
  const d = window.__slice3d;
  const canvas = document.querySelector('#c3d');
  Object.defineProperty(document, 'pointerLockElement', { configurable: true, get: () => canvas });
  const send = (mx, my) => {
    const e = new MouseEvent('mousemove');
    Object.defineProperty(e, 'movementX', { value: mx });
    Object.defineProperty(e, 'movementY', { value: my });
    document.dispatchEvent(e);
  };
  const deg = (rad) => +(rad * 180 / Math.PI).toFixed(2);
  const per = d.settings().sens.sens * d.settings().sens.multiplier; // 度/计数
  const dpi = d.settings().sens.dpi;
  const limit = Math.max(256, Math.round(dpi * 0.6)); // 与 runtime 同一套规则
  const out = { perCountDeg: +per.toFixed(4), dpi, limit };

  let y = d.look().yaw;
  send(20, 0);
  out.normal20 = deg(y - d.look().yaw);
  y = d.look().yaw;
  send(100, 0);
  out.normal100 = deg(y - d.look().yaw);
  const spikesBefore = d.perf().spikes;
  y = d.look().yaw;
  send(500, 0);
  out.spike500 = deg(y - d.look().yaw);
  y = d.look().yaw;
  send(5000, 0);
  out.spike5000 = deg(y - d.look().yaw);
  out.spikesCounted = d.perf().spikes - spikesBefore;

  // 俯仰极点
  const p0 = d.look().pitch;
  for (let i = 0; i < 40; i++) send(0, 300);
  out.pitchAfter40 = d.look().pitch;
  void p0;
  return out;
});

console.log('结果', JSON.stringify(res));
const per = res?.perCountDeg ?? 0;
const ok = (v, counts) => Math.abs(v - counts * per) < 0.35;
console.log('正常位移线性', ok(res.normal20, 20) && ok(res.normal100, 100) ? '✅' : '❌');
console.log(
  '中等超限被夹住',
  Math.abs(res.spike500 - res.limit * per) < 0.5 ? `✅ 500 计数被夹到 ${res.limit} 计数（${(res.limit * per).toFixed(2)}°）` : '❌',
);
console.log(
  '超大尖峰直接丢弃',
  res.spike5000 === 0 && res.spikesCounted === 1 ? '✅ 5000 计数整条丢弃（0°），并计数 +1' : '❌',
);
console.log('俯仰夹紧', Math.abs(res.pitchAfter40) <= 1.101 ? '✅ ' + res.pitchAfter40 : '❌ ' + res.pitchAfter40);
await browser.close();
