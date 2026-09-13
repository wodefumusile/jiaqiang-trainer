// 判定：1) 渲染循环是否在跑 2) 用 JS 直接触发开始按钮是否有反应
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 640 } });
const logs = [];
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
page.on('console', (m) => logs.push(m.type() + ': ' + m.text()));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.waitForTimeout(1500);
const loopRunning = await page.evaluate(() => {
  const p = window.__slice3d?.perf?.();
  return { perf: p, hasPerf: !!p };
});
console.log('LOOP_CHECK', JSON.stringify(loopRunning));
const syn = await page.evaluate(() => {
  const btn = document.querySelector('#s3-start');
  btn.click(); // 直接用 JS 触发
  return {
    overlayHidden: document.querySelector('#s3-overlay')?.classList.contains('hidden'),
    loadingVisible: !document.querySelector('#s3-loading')?.classList.contains('hidden'),
  };
});
console.log('SYNTHETIC_CLICK', JSON.stringify(syn));
await page.waitForTimeout(2500);
console.log(
  'AFTER_SYNTHETIC',
  JSON.stringify(
    await page.evaluate(() => ({
      pool: window.__slice3d?.poolSize?.(),
      locked: document.pointerLockElement !== null,
      overlayHidden: document.querySelector('#s3-overlay')?.classList.contains('hidden'),
    })),
  ),
);
console.log('LOGS', JSON.stringify(logs.slice(0, 10)));
await browser.close();
