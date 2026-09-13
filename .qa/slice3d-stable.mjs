// 稳定性与设计验证：
// 1) 长时间运行不出现渲染异常 / 断链（loopError、长卡次数）
// 2) 敌人刷新点全部在玩家正面（不允许身后/侧后出现）
// 3) 敌人能正常出场并架枪
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const logs = [];
page.on('console', (m) => {
  if (m.type() === 'error') logs.push(m.text());
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(400);
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' })));

const spawns = [];
const reached = [];
let prevSeq = -1;
let prevState = '';
for (let i = 0; i < 260 && reached.length < 4; i++) {
  const s = await page.evaluate(() => {
    const d = window.__slice3d;
    return {
      spawn: d.spawnInfo(),
      info: d.enemyInfo(),
      perf: d.perf(),
      cam: { x: +d.camera.position.x.toFixed(2), z: +d.camera.position.z.toFixed(2) },
    };
  });
  if (s.spawn.seq !== prevSeq) {
    prevSeq = s.spawn.seq;
    spawns.push({
      cover: s.spawn.cover,
      x: s.spawn.x,
      z: s.spawn.z,
      camZ: s.cam.z,
      // 判定：刷新点必须在玩家前方（z 至少比玩家小 1.5m）
      inFront: s.spawn.z < s.cam.z - 1.5,
      distance: s.spawn.distance,
    });
  }
  if (s.info.state === 'aiming' && prevState !== 'aiming') {
    reached.push(s.info);
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
  if (i === 250) {
    console.log('PERF_SAMPLE', JSON.stringify(s.perf));
  }
  await page.waitForTimeout(170);
}
const final = await page.evaluate(() => ({ perf: window.__slice3d.perf(), info: window.__slice3d.enemyInfo() }));
console.log('SPAWNS', JSON.stringify(spawns));
console.log('ALL_SPAWNS_IN_FRONT', spawns.every((s) => s.inFront));
console.log('REACHED_AIMING', reached.length);
console.log('FINAL_PERF', JSON.stringify(final.perf));
console.log('FINAL_ENEMY', JSON.stringify(final.info));
console.log('PAGE_ERRORS', JSON.stringify(errors));
console.log('CONSOLE_ERRORS', JSON.stringify(logs));
await browser.close();
