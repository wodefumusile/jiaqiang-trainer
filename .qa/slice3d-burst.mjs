// 需求④ 验证（3D）：站定连射累积 → 一旦移动立即清零
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(400);

const burst = () => page.evaluate(() => window.__slice3d.getBurst());
const holdKey = (code, down) =>
  page.evaluate(([c, d]) => document.dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', { code: c })), [code, down]);

// 站定连射 5 发
await page.mouse.down();
await page.waitForTimeout(600);
await page.mouse.up();
const afterStanding = await burst();
console.log('AFTER_STANDING_BURST', JSON.stringify(afterStanding));

// 移动（W）——连射累积应立刻清零
await holdKey('KeyW', true);
await page.waitForTimeout(300);
const duringMove = await burst();
console.log('DURING_MOVE_BURST', JSON.stringify(duringMove));

// 移动中开火：连射计数应被打断（每发都按第 1 发算）
await page.mouse.down();
await page.waitForTimeout(300);
await page.mouse.up();
const firingWhileMoving = await burst();
console.log('FIRING_WHILE_MOVING_BURST', JSON.stringify(firingWhileMoving));

// 停下后立即开火：应从前两发精准重新开始
await holdKey('KeyW', false);
await page.waitForTimeout(120);
const afterStop = await burst();
console.log('RIGHT_AFTER_STOP_BURST', JSON.stringify(afterStop));
await browser.close();
