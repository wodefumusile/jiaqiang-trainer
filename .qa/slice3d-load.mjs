// 验证"开局前加载 + 敌人池 + 打完出成绩"流程：
// 1) 选 5 个敌人 → 点开始 → 出现加载进度并跑到 100%
// 2) 池里应有 5 个敌人实例
// 3) 击杀 5 个 → 弹出成绩面板
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const outDir = path.join(process.cwd(), '.qa', 'slice3d');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

// 选 5 个敌人
await page.click('[data-count="5"]');
await page.screenshot({ path: path.join(outDir, 'setup.png') });
await page.click('#s3-start');
await page.waitForTimeout(600);
const midLoad = await page.evaluate(() => ({
  loadingVisible: !document.querySelector('#s3-loading')?.classList.contains('hidden'),
  step: document.querySelector('#s3-load-step')?.textContent,
  pct: document.querySelector('#s3-load-pct')?.textContent,
}));
console.log('DURING_LOAD', JSON.stringify(midLoad));
await page.screenshot({ path: path.join(outDir, 'loading.png') });

// 等加载完成
for (let i = 0; i < 80; i++) {
  const pct = await page.evaluate(() => document.querySelector('#s3-load-pct')?.textContent);
  if (pct === '100%') break;
  await page.waitForTimeout(250);
}
const afterLoad = await page.evaluate(() => ({
  loadingHidden: document.querySelector('#s3-loading')?.classList.contains('hidden'),
  pct: document.querySelector('#s3-load-pct')?.textContent,
  pool: window.__slice3d?.poolSize?.() ?? null,
}));
console.log('AFTER_LOAD', JSON.stringify(afterLoad));

// 击杀 5 个
let kills = 0;
for (let i = 0; i < 400 && kills < 5; i++) {
  const s = await page.evaluate(() => ({ state: window.__slice3d.ai.state, kills: window.__slice3d.kills() }));
  if (s.state === 'aiming' || s.state === 'walking' || s.state === 'feinting') {
    await page.evaluate(() => {
      const d = window.__slice3d;
      const v = new d.enemy.head.position.constructor(0, 1.63, 0);
      d.enemy.group.localToWorld(v);
      d.aimAt(v.x, v.y, v.z);
    });
    await page.waitForTimeout(90);
    await page.mouse.down();
    await page.waitForTimeout(35);
    await page.mouse.up();
    kills = s.kills;
  }
  await page.waitForTimeout(160);
}
await page.waitForTimeout(1200);
const result = await page.evaluate(() => ({
  resultVisible: !document.querySelector('#s3-result')?.classList.contains('hidden'),
  score: document.querySelector('#s3-score')?.textContent?.replace(/\s+/g, ' ').trim(),
  kills: window.__slice3d.kills(),
}));
console.log('RESULT', JSON.stringify(result));
await page.screenshot({ path: path.join(outDir, 'result.png') });
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
