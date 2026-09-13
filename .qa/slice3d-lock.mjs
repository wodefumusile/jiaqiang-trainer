// 验证指针锁定修复：
// 1) 点击进入后必须真的锁定鼠标（之前是被浏览器拒绝 → 视角冻住）
// 2) Esc 退出后再次"点击进入"走快速路径（不重复加载）并重新锁定
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
await page.waitForTimeout(1200);
const first = await page.evaluate(() => ({
  locked: document.pointerLockElement !== null,
  loadingHidden: document.querySelector('#s3-loading')?.classList.contains('hidden'),
  pool: window.__slice3d.poolSize(),
}));
console.log('FIRST_ENTER', JSON.stringify(first));

// Esc 退出 → 应显示开始界面
await page.keyboard.press('Escape');
await page.waitForTimeout(600);
const paused = await page.evaluate(() => ({
  overlayVisible: !document.querySelector('#s3-overlay')?.classList.contains('hidden'),
  locked: document.pointerLockElement !== null,
}));
console.log('AFTER_ESC', JSON.stringify(paused));

// 再次进入 → 快速路径 + 重新锁定
await page.click('#s3-start');
await page.waitForTimeout(900);
const second = await page.evaluate(() => ({
  locked: document.pointerLockElement !== null,
  pool: window.__slice3d.poolSize(),
  lockHintVisible: !document.querySelector('#s3-lock-hint')?.classList.contains('hidden'),
}));
console.log('SECOND_ENTER', JSON.stringify(second));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
