// 真实开枪验证：连射触发弹道散布 + 抓拍枪口火光/曳光/弹壳
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa');
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
await page.waitForTimeout(400);
const locked = await page.evaluate(() => document.pointerLockElement !== null);
console.log('POINTER_LOCKED', locked);

// 移动视角验证（合成键盘事件；Playwright 键盘模拟在指针锁定下有怪癖）
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(outDir, 'move-neutral.png') });
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' })));
await page.waitForTimeout(900);
await page.screenshot({ path: path.join(outDir, 'move-d.png') });
const moveHud = await page.evaluate(() => document.querySelector('#hud-move')?.textContent);
console.log('MOVE_HUD', JSON.stringify(moveHud));
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyD' })));
await page.waitForTimeout(400);
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' })));
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(outDir, 'move-crouch.png') });
const crouchHud = await page.evaluate(() => ({
  text: document.querySelector('#hud-move')?.textContent,
  cls: document.querySelector('#hud-move')?.className,
}));
console.log('CROUCH_HUD', JSON.stringify(crouchHud));
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keyup', { code: 'ControlLeft' })));
await page.waitForTimeout(300);

const ammoBefore = await page.evaluate(() => document.querySelector('#hud-ammo')?.textContent);
console.log('AMMO_BEFORE', JSON.stringify(ammoBefore));

// 全自动：按住不放扫射多轮，验证弹量消耗与连发
for (let round = 0; round < 6; round++) {
  await page.waitForTimeout(1000);
  await page.mouse.down();
  await page.waitForTimeout(500);
  await page.mouse.up();
  const ammo = await page.evaluate(() => document.querySelector('#hud-ammo')?.textContent);
  console.log(`AMMO_AFTER_ROUND_${round}`, JSON.stringify(ammo));
}

// R 换弹
await page.keyboard.press('KeyR');
await page.waitForTimeout(300);
const reloadingHud = await page.evaluate(() => ({
  ammo: document.querySelector('#hud-ammo')?.textContent,
  cls: document.querySelector('#hud-ammo')?.className,
}));
console.log('RELOADING_HUD', JSON.stringify(reloadingHud));
await page.waitForTimeout(2700);
const afterReload = await page.evaluate(() => document.querySelector('#hud-ammo')?.textContent);
console.log('AFTER_RELOAD', JSON.stringify(afterReload));

await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
const stats = await page.evaluate(() => ({
  all: [...document.querySelectorAll('.stat')].map((el) => el.textContent?.trim()),
}));
console.log('SHOOT_STATS', JSON.stringify(stats));
await browser.close();
