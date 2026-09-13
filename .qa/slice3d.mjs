// 3D 垂直切片实机验证：加载 ?view=3d、进入、射击、抓图
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173/?view=3d';
const outDir = path.join(process.cwd(), '.qa', 'slice3d');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start', { timeout: 20000 });
await page.screenshot({ path: path.join(outDir, 'overlay.png') });
await page.click('#s3-start');
await page.waitForTimeout(1200);
await page.screenshot({ path: path.join(outDir, 'scene.png') });

// 开一梭子（同时验证后坐力/枪口火光/弹孔）
await page.mouse.down();
await page.waitForTimeout(600);
await page.mouse.up();
await page.waitForTimeout(200);
await page.screenshot({ path: path.join(outDir, 'fire.png') });

// 等敌人出来，连拍
for (let i = 0; i < 18; i++) {
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, `f-${i}.png`) });
}
const hud = await page.evaluate(() => ({
  kills: document.querySelector('#s3-kills')?.textContent,
  acc: document.querySelector('#s3-acc')?.textContent,
  ammo: document.querySelector('#s3-ammo')?.textContent,
  canvas: !!document.querySelector('#c3d'),
}));
console.log('SLICE3D_HUD', JSON.stringify(hud));
const dbg = await page.evaluate(() => {
  const w = window;
  const s = w.__slice3d;
  if (!s) return { hook: false };
  const p = s.enemy.group.position;
  return {
    hook: true,
    visible: s.enemy.group.visible,
    pos: { x: +p.x.toFixed(2), y: +p.y.toFixed(2), z: +p.z.toFixed(2) },
    cam: { x: +s.camera.position.x.toFixed(2), y: +s.camera.position.y.toFixed(2), z: +s.camera.position.z.toFixed(2) },
  };
});
console.log('SLICE3D_ENEMY', JSON.stringify(dbg));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
