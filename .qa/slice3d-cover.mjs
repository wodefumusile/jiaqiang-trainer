// 需求⑥ 验证（3D）：
// 1) 有掩体 + 下蹲 → 敌人视线被挡 → 不开火（阵亡数不增长）
// 2) 有掩体 + 站立 → 视线通畅 → 敌人开火
// 3) 切换空旷场地 → 掩体物件为 0
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
await page.screenshot({ path: path.join(outDir, 'cover-menu.png') });
await page.click('#s3-start');
await page.waitForTimeout(400);

const info = () =>
  page.evaluate(() => ({ ...window.__slice3d.coverState(), deaths: window.__slice3d.deaths() }));
const key = (code, down) =>
  page.evaluate(([c, d]) => document.dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', { code: c })), [code, down]);

console.log('COVER_ON_DEFAULT', JSON.stringify(await info()));

// 蹲下躲掩体：等敌人走到架枪位，观察 6 秒是否被打
await key('ControlLeft', true);
await page.waitForTimeout(6000);
const whileCrouched = await info();
console.log('CROUCHED_BEHIND_COVER', JSON.stringify(whileCrouched));
await page.screenshot({ path: path.join(outDir, 'cover-crouch.png') });

// 站起来（露出上半身）：应恢复视线并被打
await key('ControlLeft', false);
await page.waitForTimeout(6000);
const whileStanding = await info();
console.log('STANDING_EXPOSED', JSON.stringify(whileStanding));

// 切到空旷场地：掩体物件应清零
await key('KeyC', true);
await page.waitForTimeout(400);
console.log('COVER_OFF', JSON.stringify(await info()));
await page.screenshot({ path: path.join(outDir, 'cover-off.png') });
await browser.close();
