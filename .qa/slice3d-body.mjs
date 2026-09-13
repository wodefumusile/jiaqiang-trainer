// 身体 4 枪致死自检
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(300);

const state = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return { state: d.ai.state, hp: d.ai.hp, z: +d.enemy.group.position.z.toFixed(2) };
  });

for (let i = 0; i < 40; i++) {
  const s = await state();
  if (s.state === 'aiming') break; // 等敌人停下（不再移动）再打，排除提前量误差
  await page.waitForTimeout(150);
}
console.log('BEFORE', JSON.stringify(await state()));

for (let shot = 1; shot <= 4; shot++) {
  await page.evaluate(() => {
    const d = window.__slice3d;
    const v = new d.enemy.head.position.constructor(0, 1.15, 0);
    d.enemy.group.localToWorld(v);
    d.aimAt(v.x, v.y, v.z);
  });
  await page.waitForTimeout(150);
  await page.mouse.down();
  await page.waitForTimeout(40);
  await page.mouse.up();
  await page.waitForTimeout(260);
  console.log(`SHOT_${shot}`, JSON.stringify(await state()));
}
await browser.close();
