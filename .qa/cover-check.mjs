// 验证：准星固定中心 + 鼠标转视角 + 多掩体（右墙/木箱/左墙）随机拉出
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'cover');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.click('[data-mode="positioning"]');
await page.click('[data-scene="corner-peek"]');
await page.click('[data-difficulty="easy"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
await page.waitForTimeout(600);
await page.screenshot({ path: path.join(outDir, 'neutral.png') });

// 鼠标向右移动 → 视角右转 → 场景左移
await page.mouse.move(800 + 300, 450, { steps: 8 });
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, 'look-right.png') });
await page.mouse.move(800 - 300, 450, { steps: 8 });
await page.waitForTimeout(400);

// 多掩体拉出连拍
for (let i = 0; i < 30; i++) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `peek-${String(i).padStart(2, '0')}.png`) });
}
console.log('COVER_CHECK_DONE');
await browser.close();
