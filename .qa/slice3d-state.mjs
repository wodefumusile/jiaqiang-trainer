// 采样敌人状态机（判断是逻辑没跑还是渲染看不见）
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
for (let i = 0; i < 14; i++) {
  await page.waitForTimeout(320);
  const s = await page.evaluate(() => {
    const w = window;
    const d = w.__slice3d;
    if (!d) return null;
    const p = d.enemy.group.position;
    return {
      x: +p.x.toFixed(2),
      z: +p.z.toFixed(2),
      vis: d.enemy.group.visible,
      inScene: d.enemy.group.parent !== null,
      hp: document.querySelector('#s3-hp')?.textContent,
    };
  });
  console.log(i, JSON.stringify(s));
}
await browser.close();
