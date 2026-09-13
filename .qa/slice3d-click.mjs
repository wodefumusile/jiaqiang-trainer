// 逐步诊断：点击"点击进入"后，每秒打印 池大小/加载条状态/按钮状态/控制台错误
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1024, height: 640 } });
const logs = [];
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') logs.push('console: ' + m.text());
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
// 记录点击前的按钮状态
console.log(
  'BEFORE_CLICK',
  JSON.stringify(
    await page.evaluate(() => ({
      label: document.querySelector('#s3-start')?.textContent,
      disabled: document.querySelector('#s3-start')?.disabled,
      hook: !!window.__slice3d,
    })),
  ),
);
await page.click('#s3-start');
for (let i = 0; i < 8; i++) {
  await page.waitForTimeout(600);
  const s = await page.evaluate(() => ({
    pool: window.__slice3d ? window.__slice3d.poolSize() : null,
    loadingVisible: !document.querySelector('#s3-loading')?.classList.contains('hidden'),
    pct: document.querySelector('#s3-load-pct')?.textContent,
    overlayHidden: document.querySelector('#s3-overlay')?.classList.contains('hidden'),
    locked: document.pointerLockElement !== null,
    hint: !document.querySelector('#s3-lock-hint')?.classList.contains('hidden'),
  }));
  console.log('T' + (i + 1) * 600, JSON.stringify(s));
}
console.log('LOGS', JSON.stringify(logs));
await browser.close();
