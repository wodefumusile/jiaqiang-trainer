// 验证：随时开枪（打墙留弹孔）+ 新武器模型 + 3D 掩体
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'weapon');
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
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, 'view-0.png') });

// 随时开枪：对空气/墙面扫射（应产生弹孔与空枪计数）
for (let i = 0; i < 4; i++) {
  await page.mouse.move(800 + (i % 2 === 0 ? 120 : -120), 450, { steps: 4 });
  await page.mouse.down();
  await page.waitForTimeout(400);
  await page.mouse.up();
  await page.waitForTimeout(250);
}
await page.screenshot({ path: path.join(outDir, 'view-holes.png') });
const ammoHud = await page.evaluate(() => document.querySelector('#hud-ammo')?.textContent);
console.log('AMMO_HUD', JSON.stringify(ammoHud));
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
const stats = await page.evaluate(() => ({
  all: [...document.querySelectorAll('.stat')].map((el) => el.textContent?.trim()),
}));
console.log('RESULTS', JSON.stringify(stats));
await browser.close();
