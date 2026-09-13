// 探针：直接验证「玩家 → 门后点」的射线是否被墙体挡住
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(500);
const r = await page.evaluate(() => {
  const d = window.__slice3d;
  return {
    // 门后两个点（背墙后方）
    doorRight: d.probe(1.9, 1.6, -8.2),
    doorLeft: d.probe(-1.9, 1.6, -8.2),
    // 侧后方箱后
    flankLeft: d.probe(-4.75, 1.6, 4.64),
    // 敞开方向（应无遮挡）
    open: d.probe(0, 1.6, -5.0),
    cam: { x: +d.camera.position.x.toFixed(2), y: +d.camera.position.y.toFixed(2), z: +d.camera.position.z.toFixed(2) },
  };
});
console.log('PROBE', JSON.stringify(r));
await browser.close();
