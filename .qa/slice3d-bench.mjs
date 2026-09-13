// 验证性能自检功能：点「性能自检」→ 3 秒后输出帧率/帧时间分布/渲染器
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-bench');
await page.click('#s3-bench');
await page.waitForTimeout(6000);
const out = await page.evaluate(() => document.querySelector('#s3-bench-out')?.textContent?.replace(/\s+/g, ' ').trim());
console.log('BENCH_OUT', JSON.stringify(out));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
