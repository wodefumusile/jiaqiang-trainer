// 验证更正的敌人移动逻辑：
// 1) 不穿模（任何时刻都不嵌入实体碰撞盒）
// 2) 移动时始终朝玩家（facingPlayer 接近 1）
// 3) 目标是"枪线覆盖玩家"（最终 lineClear=true 才停下开火）
// 4) 不是走向玩家（距离不会一路缩小到贴脸）
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
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' }))); // 蹲下躲掩体

let clips = 0;
let samples = 0;
let minFacingWhileWalking = 1;
let minDistance = 99;
const reached = [];
let prevState = '';
for (let i = 0; i < 200 && reached.length < 4; i++) {
  const s = await page.evaluate(() => ({
    info: window.__slice3d.enemyInfo(),
    clip: window.__slice3d.enemyClipCheck(),
  }));
  samples++;
  if (s.clip) clips++;
  if (s.info.state === 'walking' || s.info.state === 'feinting') {
    minFacingWhileWalking = Math.min(minFacingWhileWalking, s.info.facingPlayer);
  }
  if (s.info.state !== 'hidden') minDistance = Math.min(minDistance, s.info.distance);
  if (s.info.state === 'aiming' && prevState !== 'aiming') {
    reached.push(s.info);
    console.log('AIMING', reached.length, JSON.stringify(s.info));
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
  prevState = s.info.state;
  await page.waitForTimeout(180);
}
console.log('SAMPLES', samples, 'CLIP_HITS', clips);
console.log('MIN_FACING_WHILE_MOVING', minFacingWhileWalking.toFixed(2));
console.log('MIN_DISTANCE_TO_PLAYER', minDistance.toFixed(2));
console.log('REACHED_AIMING', reached.length, JSON.stringify(reached.map((r) => r.lineClear)));
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
