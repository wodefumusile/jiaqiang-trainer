// 验证看门狗自动恢复：模拟冻结 → 应在约 1-2 秒内自动重载页面
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 640 } });
let loads = 0;
page.on('load', () => loads++);
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
for (let i = 0; i < 40; i++) {
  const pct = await page.evaluate(() => document.querySelector('#s3-load-pct')?.textContent);
  if (pct === '100%') break;
  await page.waitForTimeout(200);
}
console.log('LOAD_EVENTS_BEFORE', loads);
// 模拟冻结
await page.evaluate(() => window.__slice3d.forceStall());
await page.waitForTimeout(3500);
const after = await page.evaluate(() => ({
  overlayPresent: !!document.querySelector('#s3-start'),
  recoveries: window.__slice3d ? window.__slice3d.perf().recoveries : null,
}));
console.log('LOAD_EVENTS_AFTER', loads);
console.log('AFTER', JSON.stringify(after));
await browser.close();
