// 全屏功能验证：按钮存在、点击后（无头环境可能不支持）不报错、画布随容器尺寸同步
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const BASE = process.argv[2] ?? 'http://localhost:4173/?view=3d';
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

const before = await page.evaluate(() => {
  const c = document.querySelector('#c3d');
  const wrap = document.querySelector('.slice3d');
  return {
    btn: !!document.querySelector('#s3-fullscreen'),
    canvasCss: [c.clientWidth, c.clientHeight],
    wrapCss: [wrap.clientWidth, wrap.clientHeight],
  };
});
console.log('BEFORE', JSON.stringify(before));

await page.click('#s3-fullscreen');
await page.waitForTimeout(600);
const after = await page.evaluate(() => ({
  fullscreenElement: !!document.fullscreenElement,
  canvasCss: [document.querySelector('#c3d').clientWidth, document.querySelector('#c3d').clientHeight],
}));
console.log('AFTER_FULLSCREEN_CLICK', JSON.stringify(after));

// 缩放窗口 → 画布应跟着变（验证 ResizeObserver/全屏切换的尺寸同步）
await page.setViewportSize({ width: 900, height: 600 });
await page.waitForTimeout(500);
const resized = await page.evaluate(() => ({
  canvasCss: [document.querySelector('#c3d').clientWidth, document.querySelector('#c3d').clientHeight],
}));
console.log('AFTER_RESIZE', JSON.stringify(resized));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
