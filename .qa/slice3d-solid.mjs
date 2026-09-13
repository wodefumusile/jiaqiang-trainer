// 验证掩体的"实体"属性：
// 1) 玩家向前冲刺 → 被掩体挡住（z 不会越过掩体）
// 2) 玩家射掩体 → 留下弹孔（不是穿过去打空气）
// 3) 敌人刷新点是否在掩体后（visible=false）
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(400);

const pos = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return { x: +d.camera.position.x.toFixed(2), z: +d.camera.position.z.toFixed(2) };
  });
const key = (code, down) =>
  page.evaluate(([c, d]) => document.dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', { code: c })), [code, down]);

console.log('START', JSON.stringify(await pos()));
// 掩体在 z=0.9；一直按 W 往前冲，应被挡在掩体后（z 不会小于约 1.3）
await key('KeyW', true);
await page.waitForTimeout(2500);
await key('KeyW', false);
const afterPush = await pos();
console.log('AFTER_PUSH_INTO_COVER', JSON.stringify(afterPush));

// 射掩体：先蹲下（眼高 1.05 < 掩体 1.3），子弹应打在掩体上留弹孔
await key('ControlLeft', true);
await page.waitForTimeout(500);
const decalsBefore = await page.evaluate(() => window.__slice3d.decals ? window.__slice3d.decals() : -1);
await page.mouse.down();
await page.waitForTimeout(300);
await page.mouse.up();
await page.waitForTimeout(200);
const decalsAfter = await page.evaluate(() => window.__slice3d.decals ? window.__slice3d.decals() : -1);
console.log('DECALS', JSON.stringify({ decalsBefore, decalsAfter }));
// 伏在掩体后时，敌人应看不到玩家（挡子弹 = 挡视线）
console.log('COVER_STATE', JSON.stringify(await page.evaluate(() => window.__slice3d.coverState())));

// 敌人刷新点合法性
const spawn = await page.evaluate(() => window.__slice3d.spawnInfo());
console.log('SPAWN', JSON.stringify(spawn));
await browser.close();
