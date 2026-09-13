// 场景内敌人可见性判定（预瞄模式：敌人会在门口停留）
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa', 'scenevis');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.click('[data-mode="preaim"]');
await page.click('[data-scene="narrow-door"]');
await page.click('[data-difficulty="easy"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
for (let i = 0; i < 14; i++) {
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(outDir, `p-${String(i).padStart(2, '0')}.png`) });
}
console.log('SCENE_ENEMY_DONE');
await browser.close();
