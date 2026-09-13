// 拉起用户机器上的可见 Edge 窗口打开训练器，并保持进程存活
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL = process.argv[2] ?? 'http://localhost:5173';

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: false,
  args: ['--start-maximized'],
});
const page = await browser.newPage();
await page.goto(URL, { waitUntil: 'domcontentloaded' });
console.log('BROWSER_OPENED', URL);

// 保持进程与浏览器存活
setInterval(() => {}, 1000);
