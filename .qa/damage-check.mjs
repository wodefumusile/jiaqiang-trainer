// 验证：身体 4 枪致死 + 新美术表现（血液/伤害数字/血条）
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'dmg');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.click('[data-mode="positioning"]');
await page.click('[data-scene="narrow-door"]');
await page.click('[data-difficulty="easy"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
await page.waitForTimeout(600);

// 把视角右移，让门洞中心落到准星（屏幕中心）
await page.mouse.move(800 + 270, 450, { steps: 10 });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(outDir, 'aligned.png') });

// 多轮点射：准星位于身体高度，命中应累积 25 伤害，4 枪致死
for (let round = 0; round < 14; round++) {
  await page.mouse.down();
  await page.waitForTimeout(650);
  await page.mouse.up();
  await page.screenshot({ path: path.join(outDir, `round-${String(round).padStart(2, '0')}.png`) });
  await page.waitForTimeout(350);
}

await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
const stats = await page.evaluate(() => ({
  all: [...document.querySelectorAll('.stat')].map((el) => el.textContent?.trim()),
  feed: document.querySelectorAll('.kill-feed-item').length,
}));
console.log('DAMAGE_RESULTS', JSON.stringify(stats));
await browser.close();
