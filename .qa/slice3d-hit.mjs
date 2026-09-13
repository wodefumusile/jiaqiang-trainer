// 命中判定自检：瞄准敌人头部/躯干/手臂各打一枪，读取血量变化
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(300);

const state = async () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    const p = d.enemy.group.position;
    return { state: d.ai.state, hp: d.ai.hp, x: +p.x.toFixed(2), z: +p.z.toFixed(2) };
  });

// 等敌人走到开阔处
for (let i = 0; i < 40; i++) {
  const s = await state();
  if (s.z > -5.2) break;
  await page.waitForTimeout(150);
}
console.log('BEFORE', JSON.stringify(await state()));

// 瞄准头部点射一发
const aim = async (part) =>
  page.evaluate((which) => {
    const d = window.__slice3d;
    const g = d.enemy.group;
    const local = which === 'head' ? [0, 1.63, 0] : which === 'torso' ? [0, 1.18, 0] : [0.29, 1.16, -0.06];
    const v = new d.enemy.head.position.constructor(local[0], local[1], local[2]);
    g.localToWorld(v);
    d.aimAt(v.x, v.y, v.z);
    return { x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) };
  }, part);

for (const part of ['head', 'torso', 'arm']) {
  const target = await aim(part);
  await page.waitForTimeout(120);
  await page.mouse.down();
  await page.waitForTimeout(40);
  await page.mouse.up();
  await page.waitForTimeout(160);
  console.log(`SHOT_${part.toUpperCase()}`, JSON.stringify({ target, after: await state() }));
}
await browser.close();
