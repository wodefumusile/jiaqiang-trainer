// 需求② 验证（3D）：换弹动画的部件位移 + 时长 + HUD 提示
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const outDir = path.join(process.cwd(), '.qa', 'slice3d');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(400);

const snap = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return { ...d.reloadState(), ammo: document.querySelector('#s3-ammo')?.textContent };
  });
console.log('BEFORE_RELOAD', JSON.stringify(await snap()));

await page.keyboard.press('KeyR');
const samples = [];
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(220);
  const s = await snap();
  samples.push(s);
  if (i === 5) await page.screenshot({ path: path.join(outDir, 'reload-mid.png') });
}
console.log('SAMPLES', JSON.stringify(samples));
const magY = samples.map((s) => s.magY);
console.log('MAG_Y_MIN', Math.min(...magY), 'MAG_Y_MAX', Math.max(...magY));
console.log('CHARGE_MAX', Math.max(...samples.map((s) => s.chargeZ)));
console.log('HUD_DURING', JSON.stringify(samples.slice(0, 4).map((s) => s.ammo)));
console.log('AFTER_RELOAD', JSON.stringify(await snap()));
await browser.close();
