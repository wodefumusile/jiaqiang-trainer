// 验证"冻结前动作日志"：模拟冻结 → 自动重载后，启动界面应显示上次冻结原因与最后动作
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 640 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
for (let i = 0; i < 40; i++) {
  const pct = await page.evaluate(() => document.querySelector('#s3-load-pct')?.textContent);
  if (pct === '100%') break;
  await page.waitForTimeout(200);
}
await page.waitForTimeout(1500); // 让日志里至少有一条"敌人刷新"
await page.evaluate(() => window.__slice3d.forceStall());
await page.waitForTimeout(4000);
const shown = await page.evaluate(() => document.querySelector('#s3-lastlog')?.textContent?.replace(/\s+/g, ' ').trim());
console.log('LASTLOG', JSON.stringify(shown));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
