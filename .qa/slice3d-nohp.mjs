// 验证：3D 版不再有敌人血条（不会透过掩体暴露位置），且游戏可正常运行
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const outDir = path.join(process.cwd(), '.qa', 'slice3d');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(1200);

// 打几枪（看是否还有血条元素冒出来）
await page.mouse.down();
await page.waitForTimeout(700);
await page.mouse.up();
await page.waitForTimeout(400);

const dom = await page.evaluate(() => ({
  hpBarExists: !!document.querySelector('#s3-hpbar'),
  hpBarAny: document.querySelectorAll('[class*=hpbar]').length,
  dmgLayerExists: !!document.querySelector('#s3-dmg'),
}));
console.log('DOM_CHECK', JSON.stringify(dom));
await page.screenshot({ path: path.join(outDir, 'no-hp.png') });
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
