// 连射中途抓拍：验证敌人完整性 / 血液 / 伤害数字 / 血条
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'hit');
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
await page.waitForTimeout(500);

// 视角右移，让门洞中心对准准星
await page.mouse.move(800 + 270, 450, { steps: 10 });
await page.waitForTimeout(300);

// 持续扫射，同时高频抓拍（敌人出现/被击中的瞬间）
await page.mouse.down();
for (let i = 0; i < 16; i++) {
  await page.waitForTimeout(220);
  await page.screenshot({ path: path.join(outDir, `f-${String(i).padStart(2, '0')}.png`) });
}
await page.mouse.up();
console.log('HIT_FRAMES_DONE');
await browser.close();
