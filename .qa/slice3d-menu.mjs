/**
 * 主页菜单自检（四个单元）：
 *  1) 四个单元标题齐全：场景 / 难度 / 灵敏度及其相关 / 准星设置
 *  2) 准星设置真的作用到游戏内准星（比对 CSS 变量与真实渲染尺寸）
 *  3) 灵敏度设置真的作用到转视角（同样位移下，高灵敏度转得更多）
 *  4) 设置持久化（重载后还在）
 *  5) 菜单不遮挡、不溢出，且不影响进入游戏
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

// 1) 四个单元
const sections = await page.evaluate(() =>
  [...document.querySelectorAll('.s3-sec-head')].map((el) => el.textContent.replace(/\s+/g, ' ').trim()),
);
console.log('单元标题', JSON.stringify(sections));
const wantSections = ['场景', '难度', '灵敏度及其相关', '准星设置'];
console.log(
  '四单元校验',
  wantSections.every((w) => sections.some((s) => s.includes(w))) ? '✅ 齐全' : '❌ 缺失',
);

// 布局：卡片不能超出视口（之前出现过"内容缩在一角/溢出"的问题）
const layout = await page.evaluate(() => {
  const card = document.querySelector('.s3-menu-card').getBoundingClientRect();
  const menu = document.querySelector('.s3-menu');
  return {
    card: { w: Math.round(card.width), h: Math.round(card.height), top: Math.round(card.top), left: Math.round(card.left) },
    scrollable: menu.scrollHeight > menu.clientHeight,
    b: window.innerWidth,
    h: window.innerHeight,
  };
});
console.log('布局', JSON.stringify(layout));
console.log(
  '布局校验',
  layout.card.left >= 0 && layout.card.top >= 0 && layout.card.left + layout.card.w <= layout.b && layout.card.top + layout.card.h <= layout.h
    ? '✅ 完整可见'
    : '❌ 溢出视口',
);

// 2) 准星设置 → 游戏内准星
await page.click('#s3-ch-colors .s3-swatch:nth-child(4)'); // 换一个颜色
await page.evaluate(() => {
  const size = document.querySelector('#s3-ch-size');
  size.value = '18';
  size.dispatchEvent(new Event('input', { bubbles: true }));
  const gap = document.querySelector('#s3-ch-gap');
  gap.value = '7';
  gap.dispatchEvent(new Event('input', { bubbles: true }));
});
await page.click('#s3-ch-dot');
const chState = await page.evaluate(() => {
  const cross = document.querySelector('#s3-cross');
  const top = cross.querySelector('.ch-t');
  const dot = cross.querySelector('.ch-dot');
  const cs = getComputedStyle(top);
  return {
    varLen: getComputedStyle(document.querySelector('#app')).getPropertyValue('--ch-len').trim(),
    renderedTopHeight: cs.height,
    renderedTopWidth: cs.width,
    dotSize: getComputedStyle(dot).width,
    settings: window.__slice3d.settings().crosshair,
    demoLen: getComputedStyle(document.querySelector('.s3-ch-preview .ch-t')).height,
  };
});
console.log('准星状态', JSON.stringify(chState));
console.log(
  '准星校验',
  chState.renderedTopHeight === '18px' && chState.renderedTopWidth === chState.settings.thickness + 'px' && chState.dotSize !== '0px' && chState.demoLen === chState.renderedTopHeight
    ? '✅ 游戏内与预览一致，且按设置生效'
    : '❌ 没生效',
);

// 3) 灵敏度 → 转视角（伪造 pointer lock + movementX，测同样位移下的角度变化）
const lookDelta = async (sens) => {
  await safe(page, (v) => {
    const range = document.querySelector('#s3-sens');
    range.value = String(v);
    range.dispatchEvent(new Event('input', { bubbles: true }));
  }, sens);
  // 环境偶发丢上下文→自动重载会打断 evaluate，这里最多重试 3 次
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.click('#s3-start').catch(() => {});
    await ensureRunning(page);
    const delta = await safe(page, async () => {
      const d = window.__slice3d;
      const canvas = document.querySelector('#c3d');
      Object.defineProperty(document, 'pointerLockElement', { configurable: true, get: () => canvas });
      const before = d.look().yaw;
      for (let i = 0; i < 10; i++) {
        const ev = new MouseEvent('mousemove');
        Object.defineProperty(ev, 'movementX', { value: 10 });
        Object.defineProperty(ev, 'movementY', { value: 0 });
        document.dispatchEvent(ev);
        await new Promise((r) => setTimeout(r, 8));
      }
      return +(before - d.look().yaw).toFixed(4);
    });
    if (typeof delta === 'number') return delta;
  }
  return -1;
};
const deltaLow = await lookDelta(1);
const deltaHigh = await lookDelta(8);
const ratio = deltaLow === 0 ? 0 : deltaHigh / deltaLow;
console.log('同样 100 计数下的转角（灵敏度 1 / 8）', deltaLow, deltaHigh, '比值', ratio.toFixed(2));
console.log('灵敏度校验', ratio > 7 && ratio < 9 ? '✅ 按设置线性生效' : '❌ 没生效或非线性');

// 4) 持久化：重载后设置还在
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
const persisted = await page.evaluate(() => ({
  settings: window.__slice3d.settings(),
  varLen: getComputedStyle(document.querySelector('#app')).getPropertyValue('--ch-len').trim(),
}));
console.log('重载后', JSON.stringify(persisted));
console.log(
  '持久化校验',
  persisted.settings.crosshair.size === 18 && persisted.settings.sens.sens === 8 && persisted.varLen === '18px'
    ? '✅ 保持'
    : '❌ 丢失',
);

await page.screenshot({ path: '.qa/menu-v2.png' });

// 不同窗口尺寸下的布局体检（1280x720 是用户实际窗口）
const sizes = [
  [1280, 720],
  [1920, 1080],
];
for (const pair of sizes) {
  const w = pair[0];
  const h = pair[1];
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(160);
  const r = await page.evaluate(() => {
    const card = document.querySelector('.s3-menu-card');
    const menu = document.querySelector('.s3-menu');
    const rect = card.getBoundingClientRect();
    const start = document.querySelector('#s3-start').getBoundingClientRect();
    return {
      fits: rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight + 1 && rect.right <= window.innerWidth + 1,
      needScrollPx: menu.scrollHeight - menu.clientHeight,
      startVisible: start.top >= 0 && start.bottom <= window.innerHeight + 1,
      overflowXPx: menu.scrollWidth - menu.clientWidth,
    };
  });
  console.log('窗口 ' + w + 'x' + h, JSON.stringify(r));
  if (w === 1280) await page.screenshot({ path: '.qa/menu-1280.png' });
}

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
