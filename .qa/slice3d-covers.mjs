// 多掩体验证：连续多轮记录敌人从哪个掩体拉出、是否蹲下、血量伤害链是否正常
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const outDir = path.join(process.cwd(), '.qa', 'slice3d');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');

const snap = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    const p = d.enemy.group.position;
    return {
      state: d.ai.state,
      cover: d.ai.coverName,
      crouch: d.ai.crouch,
      hp: d.ai.hp,
      x: +p.x.toFixed(2),
      z: +p.z.toFixed(2),
    };
  });

const seen = [];
// 每一轮：等敌人停下 → 记录掩体/蹲下 → 爆头秒杀 → 等下一个
for (let round = 0; round < 5; round++) {
  let got = null;
  for (let i = 0; i < 60; i++) {
    const s = await snap();
    if (s.state === 'aiming') {
      got = s;
      break;
    }
    await page.waitForTimeout(200);
  }
  if (!got) break;
  seen.push({ cover: got.cover, crouch: got.crouch });
  console.log('ENCOUNTER', round + 1, JSON.stringify(got));
  if (round === 0) await page.screenshot({ path: path.join(outDir, 'covers.png') });
  // 爆头秒杀
  await page.evaluate(() => {
    const d = window.__slice3d;
    const v = new d.enemy.head.position.constructor(0, 1.63, 0);
    d.enemy.group.localToWorld(v);
    d.aimAt(v.x, v.y, v.z);
  });
  await page.waitForTimeout(150);
  await page.mouse.down();
  await page.waitForTimeout(40);
  await page.mouse.up();
  await page.waitForTimeout(400);
  console.log('  AFTER_HEADSHOT', JSON.stringify(await snap()));
}
console.log('COVERS_SEEN', JSON.stringify(seen));
console.log('DISTINCT_COVERS', JSON.stringify([...new Set(seen.map((s) => s.cover))]));
console.log('CROUCH_RATE', JSON.stringify(seen.filter((s) => s.crouch).length + '/' + seen.length));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
