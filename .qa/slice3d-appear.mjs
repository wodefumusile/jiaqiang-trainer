// 回归验证：敌人能否正常从掩体后走出来（不再被卡住）
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(300);

const seen = new Set();
const reached = [];
let prevState = '';
for (let i = 0; i < 260 && reached.length < 3; i++) {
  const s = await page.evaluate(() => {
    const d = window.__slice3d;
    const p = d.enemy.group.position;
    return {
      state: d.ai.state,
      path: d.ai.path.length,
      x: +p.x.toFixed(2),
      z: +p.z.toFixed(2),
      cover: d.ai.coverName,
    };
  });
  seen.add(s.state);
  if (s.state === 'aiming' && prevState !== 'aiming') {
    reached.push(s);
    console.log('REACHED_AIMING', reached.length, JSON.stringify(s));
    // 爆头秒杀，推进下一波
    await page.evaluate(() => {
      const d = window.__slice3d;
      const v = new d.enemy.head.position.constructor(0, 1.63, 0);
      d.enemy.group.localToWorld(v);
      d.aimAt(v.x, v.y, v.z);
    });
    await page.waitForTimeout(120);
    await page.mouse.down();
    await page.waitForTimeout(40);
    await page.mouse.up();
  }
  prevState = s.state;
  await page.waitForTimeout(220);
}
console.log('REACHED_COUNT', reached.length, JSON.stringify(reached.map((r) => r.cover)));
console.log('STATES_SEEN', JSON.stringify([...seen]));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
