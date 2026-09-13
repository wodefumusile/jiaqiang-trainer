// 验证极限档的「拉出后横向移动射击」：不还手，让敌人架住并移动
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
// 关键：开局前就把难度设为极限，保证第一波就带"移动射击"战术
await page.evaluate(() => localStorage.setItem('jg.slice3d.diff', 'extreme'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(300);
// 蹲下躲掩体（避免被击杀打断观察）
await page.evaluate(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ControlLeft' })));


const snap = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return {
      state: d.ai.state,
      x: +d.enemy.group.position.x.toFixed(2),
      strafe: +d.ai.strafeSeconds.toFixed(2),
      strafeOn: d.ai.strafeShoot,
    };
  });

const xs = [];
for (let i = 0; i < 45; i++) {
  const s = await snap();
  if (s.state === 'aiming') xs.push(s);
  await page.waitForTimeout(200);
}
console.log('AIMING_SAMPLES', xs.length);
console.log('STRAFE_SECONDS', JSON.stringify(xs.at(-1)?.strafe ?? 0));
console.log('STRAFE_FLAG', JSON.stringify(xs.at(-1)?.strafeOn ?? false));
console.log('X_RANGE', JSON.stringify([Math.min(...xs.map((s) => s.x)), Math.max(...xs.map((s) => s.x))]));
await browser.close();
