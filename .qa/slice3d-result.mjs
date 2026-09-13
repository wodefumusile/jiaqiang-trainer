// 结算流程验证：选 5 个敌人 → 加载 → 打满 5 个 → 出成绩面板
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
await page.click('[data-count="5"]');
await page.click('#s3-start');
for (let i = 0; i < 80; i++) {
  const pct = await page.evaluate(() => document.querySelector('#s3-load-pct')?.textContent);
  if (pct === '100%') break;
  await page.waitForTimeout(200);
}
console.log('АFTER_LOAD', JSON.stringify(await page.evaluate(() => ({ pool: window.__slice3d.poolSize(), pct: document.querySelector('#s3-load-pct')?.textContent }))));

// 用与爆头击杀完全相同的链路打满 5 个（等尸体消失后再打下一次）
for (let k = 0; k < 40; k++) {
  const s = await page.evaluate(() => ({ state: window.__slice3d.ai.state, kills: window.__slice3d.kills() }));
  if (s.kills >= 5) break;
  if (s.state !== 'dead') await page.evaluate(() => window.__slice3d.forceKill());
  await page.waitForTimeout(400);
}
await page.waitForTimeout(600);
const res = await page.evaluate(() => ({
  visible: !document.querySelector('#s3-result')?.classList.contains('hidden'),
  score: document.querySelector('#s3-score')?.textContent?.replace(/\s+/g, ' ').trim(),
  kills: window.__slice3d.kills(),
}));
console.log('RESULT', JSON.stringify(res));
await page.screenshot({ path: path.join(outDir, 'result.png') });
console.log('ERRORS', JSON.stringify(errors));
await browser.close();
