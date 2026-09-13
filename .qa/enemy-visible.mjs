// 对照实验：竞技场（无遮挡）里敌人是否渲染
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'vis');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.click('[data-mode="flick"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `arena-${i}.png`) });
}
console.log('ARENA_DONE');
await browser.close();
