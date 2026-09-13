import { chromium } from 'playwright-core';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.click('[data-mode="positioning"]');
await page.click('[data-scene="narrow-door"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
await page.waitForTimeout(500);

const probe = async (label, fn) => {
  await fn();
  await page.waitForTimeout(350);
  const hud = await page.evaluate(() => document.querySelector('#hud-move')?.textContent);
  console.log(label, JSON.stringify(hud));
  await page.waitForTimeout(400);
};

await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' })));
for (let i = 1; i <= 6; i++) {
  await page.waitForTimeout(300);
  const hud = await page.evaluate(() => document.querySelector('#hud-move')?.textContent);
  console.log(`T+${i * 300}ms`, JSON.stringify(hud));
}
await page.screenshot({ path: path.join(process.cwd(), '.qa', 'move-d-debug.png') });
const afterShot = await page.evaluate(() => document.querySelector('#hud-move')?.textContent);
console.log('AFTER_SCREENSHOT', JSON.stringify(afterShot));

await browser.close();
