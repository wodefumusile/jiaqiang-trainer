/**
 * 在用户机器上打开可见 Edge，并预选指定场景（默认 long），然后保持进程存活。
 * 用法：node .qa/open-browser-scene.mjs http://localhost:4173/ long
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL = process.argv[2] ?? 'http://localhost:4173/';
const SCENE = process.argv[3] ?? 'long';

const browser = await chromium.launch({ executablePath: EDGE, headless: false, args: ['--start-maximized'] });
const page = await browser.newPage();
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.evaluate((id) => {
  try {
    localStorage.setItem('jg.slice3d.scene', id);
  } catch {
    // 存储不可用就按默认场景打开
  }
}, SCENE);
await page.reload({ waitUntil: 'domcontentloaded' });
console.log('BROWSER_OPENED', URL, 'scene =', SCENE);
setInterval(() => {}, 1000);
