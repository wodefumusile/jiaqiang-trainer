// 性能诊断：不同画质档位下的绘制批次/三角形/缓冲区分辨率
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/?view=3d';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(1500);

for (const q of ['high', 'medium', 'low']) {
  await page.evaluate((level) => window.__slice3d.setQuality(level), q);
  await page.waitForTimeout(1200);
  const p = await page.evaluate(() => window.__slice3d.perf());
  console.log(q.toUpperCase(), JSON.stringify(p));
}
// 大窗口（4K 级）下的像素预算保护验证
await page.setViewportSize({ width: 2560, height: 1440 });
await page.waitForTimeout(1200);
console.log('WINDOW_2560x1440', JSON.stringify(await page.evaluate(() => window.__slice3d.perf())));
await browser.close();
