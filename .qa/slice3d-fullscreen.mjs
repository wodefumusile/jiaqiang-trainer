/**
 * 战斗画面全屏自检：
 *  1) 默认设置下，点「点击进入」应自动进入网页内全屏（全屏元素 = .slice3d）
 *  2) 全屏后画布必须真的铺满屏幕（画布 CSS 尺寸 = 窗口尺寸），且持续出图
 *  3) F 键可以退出/再进入全屏
 *  4) 菜单里切成「只在窗口内」并重载后，进战斗不再自动全屏（设置持久化）
 *  5) 退出战斗（Esc→返回菜单）会退出全屏
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, renders, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => {
  localStorage.setItem('jg.slice3d.count', '5');
  localStorage.removeItem('jg.slice3d.lastRecovery');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

const fsInfo = () =>
  safe(page, () => {
    const canvas = document.querySelector('#c3d');
    const el = document.fullscreenElement;
    return {
      fullscreen: !!el,
      fullscreenEl: el ? el.className : null,
      canvasCss: [canvas.clientWidth, canvas.clientHeight],
      canvasBuffer: [canvas.width, canvas.height],
      win: [window.innerWidth, window.innerHeight],
      renders: window.__slice3d.perf().renders,
    };
  });

// 1) 进战斗自动全屏（用统一入口：会重试点击/重载后重进，避免环境抖动导致误判）
console.log('进入游戏', await ensureRunning(page));
await page.waitForTimeout(600);
const entered = await fsInfo();
console.log('进入战斗后', JSON.stringify(entered));
console.log(
  '自动全屏',
  entered.fullscreen && entered.fullscreenEl.includes('slice3d') ? '✅ 全屏元素 = 3D 容器' : '❌ 没进全屏',
);
const fills = entered.canvasCss[0] >= entered.win[0] - 2 && entered.canvasCss[1] >= entered.win[1] - 2;
console.log('画布铺满', JSON.stringify({ canvas: entered.canvasCss, win: entered.win }), fills ? '✅' : '❌');

// 2) 全屏下持续出图
await page.waitForTimeout(1200);
const after = await fsInfo();
console.log('全屏下持续出图', after.renders > entered.renders ? '✅' : '❌', entered.renders, '→', after.renders);

// 3) F 键切换
await page.keyboard.press('KeyF');
await page.waitForTimeout(1300);
const out1 = await fsInfo();
await page.keyboard.press('KeyF');
await page.waitForTimeout(1300);
const back = await fsInfo();
console.log('F 键切换', !out1.fullscreen && back.fullscreen ? '✅ 能退出也能再进' : `❌ out=${out1.fullscreen} back=${back.fullscreen}`);

// 4) 切成"只在窗口内"并重载
await page.keyboard.press('Escape');
await page.waitForTimeout(1500);
await page.waitForSelector('#s3-start');
const afterEsc = await fsInfo();
console.log('退出战斗后是否还在全屏', afterEsc.fullscreen ? '❌ 仍全屏' : '✅ 已退出全屏');

await page.click('#s3-fs-row [data-fs="window"]');
console.log('菜单设置', JSON.stringify(await safe(page, () => [...document.querySelectorAll('#s3-fs-row .s3-pill')].map((b) => ({ fs: b.dataset.fs, on: b.classList.contains('is-on') })))));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
const savedPills = await safe(page, () => [...document.querySelectorAll('#s3-fs-row .s3-pill')].map((b) => ({ fs: b.dataset.fs, on: b.classList.contains('is-on') })));
console.log('重载后设置保持', JSON.stringify(savedPills), savedPills.find((p) => p.on)?.fs === 'window' ? '✅' : '❌');
await page.click('#s3-start');
await ensureRunning(page);
const noFs = await fsInfo();
console.log('只在窗口内时不再自动全屏', !noFs.fullscreen ? '✅' : '❌', JSON.stringify(noFs.canvasCss));

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
