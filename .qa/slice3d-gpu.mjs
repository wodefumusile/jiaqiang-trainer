// 真实显卡诊断：用「有头 + 启用 GPU」的浏览器窗口运行，读取实际渲染器与帧率
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: false, // 有头：与主人实际使用一致
  args: ['--enable-gpu', '--ignore-gpu-blocklist', '--start-maximized'],
  // 关键：不要沿用 Playwright 默认注入的 GPU 相关禁用参数
  ignoreDefaultArgs: ['--disable-gpu', '--disable-gpu-compositing', '--disable-software-rasterizer'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(4000);
const perf = await page.evaluate(() => window.__slice3d.perf());
console.log('GPU_PERF', JSON.stringify(perf));
const glInfo = await page.evaluate(() => {
  const c = document.createElement('canvas');
  const gl = c.getContext('webgl2');
  const d = gl && gl.getExtension('WEBGL_debug_renderer_info');
  return d ? String(gl.getParameter(d.UNMASKED_RENDERER_WEBGL)) : 'n/a';
});
console.log('RAW_RENDERER', JSON.stringify(glInfo));
await browser.close();
