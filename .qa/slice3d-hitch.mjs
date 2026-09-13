// 卡顿验证：强制多波敌人刷新 + 击杀，测量最大帧时间与长卡次数
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(800);
// 从统计清零开始计
await page.evaluate(() => window.__slice3d.resetMaxFrame());
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' })));

let kills = 0;
let prevState = '';
for (let i = 0; i < 240 && kills < 6; i++) {
  const s = await page.evaluate(() => ({ state: window.__slice3d.ai.state, seq: window.__slice3d.spawnInfo().seq }));
  if (s.state === 'aiming' && prevState !== 'aiming') {
    await page.evaluate(() => {
      const d = window.__slice3d;
      const v = new d.enemy.head.position.constructor(0, 1.63, 0);
      d.enemy.group.localToWorld(v);
      d.aimAt(v.x, v.y, v.z);
    });
    await page.waitForTimeout(100);
    await page.mouse.down();
    await page.waitForTimeout(35);
    await page.mouse.up();
    kills++;
  }
  prevState = s.state;
  await page.waitForTimeout(150);
}
const perf = await page.evaluate(() => window.__slice3d.perf());
console.log('KILLS', kills);
console.log('PERF', JSON.stringify(perf));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
