/**
 * 场景系统自检：
 *  1) 主页有两张场景卡，当前场景有"当前"标记
 *  2) 点另一张卡 → 保存 + 重载 → 房间真的按新尺寸重建（sceneInfo 复核）
 *  3) 长地图里敌人仍从掩体后拉出（可见性=false）、能走位到架枪位（aiming）
 *  4) 刷新距离随难度拉远（简单=近掩体，极限=含 30m+ 远掩体）
 *  5) 全程不出图定格、无异常
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
  localStorage.setItem('jg.slice3d.count', '999');
  localStorage.removeItem('jg.slice3d.lastRecovery');
  window.__rejections = [];
  window.addEventListener('unhandledrejection', (e) => window.__rejections.push(String(e.reason)));
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

// 1) 场景卡
const cards = await page.evaluate(() =>
  [...document.querySelectorAll('#s3-scene-row .s3-scene')].map((b) => ({
    id: b.dataset.scene,
    on: b.classList.contains('is-on'),
  })),
);
console.log('场景卡片', JSON.stringify(cards));

/** 切到指定场景（点卡片 → 自动重载） */
const switchScene = async (id) => {
  await page.click(`#s3-scene-row [data-scene="${id}"]`);
  await page.waitForTimeout(1800);
  await page.waitForSelector('#s3-start');
};

const collectSpawns = async (seconds) => {
  const entered = await ensureRunning(page);
  const out = { entered, distances: [], hidden: [], covers: new Set(), aiming: 0, stalls: 0, envReloads: 0 };
  let lastSeq = -1;
  let lastRenders = await renders(page);
  let lastAdvance = Date.now();
  let lastKill = 0;
  let aimSince = null;
  const t0 = Date.now();
  while (Date.now() - t0 < seconds * 1000) {
    await page.waitForTimeout(120);
    const now = Date.now();
    const r = await renders(page);
    // 环境重载（软件渲染偶发丢上下文）→ 页面回到开始界面，数据作废、重新进入
    if (r < 0 || now - lastAdvance > 3000) {
      out.envReloads++;
      await ensureRunning(page, 12);
      lastRenders = await renders(page);
      lastAdvance = Date.now();
      continue;
    }
    if (r > lastRenders) {
      lastRenders = r;
      lastAdvance = now;
    } else if (now - lastAdvance > 400) {
      out.stalls++;
    }
    const s = await safe(page, () => ({ spawn: window.__slice3d.spawnInfo(), state: window.__slice3d.ai.state }));
    if (!s) continue;
    if (s.spawn?.seq !== lastSeq) {
      lastSeq = s.spawn.seq;
      out.distances.push(s.spawn.distance);
      out.hidden.push(s.spawn.visible === false);
      out.covers.add(s.spawn.cover);
    }
    if (s.state === 'aiming') {
      if (aimSince === null) aimSince = now;
    } else if (s.state !== 'dead') {
      aimSince = null;
    }
    if (s.state === 'aiming' && aimSince && now - aimSince > 800) {
      out.aiming++;
      aimSince = null;
      lastKill = now;
      await safe(page, () => {
        if (window.__slice3d.ai.state !== 'dead') window.__slice3d.forceKill();
      });
    } else if (now - lastKill > 9000) {
      lastKill = now;
      await safe(page, () => {
        if (window.__slice3d.ai.state !== 'dead') window.__slice3d.forceKill();
      });
    }
  }
  return out;
};

// 2) 切到长地图
await switchScene('long');
const longInfo = await safe(page, () => window.__slice3d.sceneInfo());
console.log('长地图 sceneInfo', JSON.stringify(longInfo));
console.log(
  '房间按新尺寸重建',
  longInfo && longInfo.room.w === 26 && longInfo.room.d === 84 && longInfo.fog[1] === 130 ? '✅' : '❌',
);
await page.screenshot({ path: '.qa/scene-long.png' });

// 3) 极限难度：应该出现 30m+ 的远掩体
await page.evaluate(() => localStorage.setItem('jg.slice3d.diff', 'extreme'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
const extremeRun = await collectSpawns(45);
console.log('极限难度刷新距离', JSON.stringify(extremeRun.distances));
console.log(
  '远距离交战成立',
  Math.max(...extremeRun.distances) >= 28 && extremeRun.distances.every((d) => d >= 12) ? '✅ 含 28m+ 远点' : '❌',
);
console.log('全部在视线外刷新', extremeRun.hidden.every(Boolean) ? '✅' : `❌ ${JSON.stringify(extremeRun.hidden)}`);
console.log('成功架枪次数', extremeRun.aiming, extremeRun.aiming > 0 ? '✅ 能拉出并就位' : '❌');
console.log('出现过的掩体数', extremeRun.covers.size, '· 出图定格', extremeRun.stalls, '· 环境重载', extremeRun.envReloads);

// 4) 简单难度：只应该用近掩体
await page.evaluate(() => localStorage.setItem('jg.slice3d.diff', 'easy'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
const easyRun = await collectSpawns(30);
console.log('简单难度刷新距离', JSON.stringify(easyRun.distances));
const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : 0;
};
console.log(
  '难度只调远近概率（不再砍掉刷新点）',
  easyRun.covers.size >= 5 && median(easyRun.distances) < median(extremeRun.distances)
    ? `✅ 简单档中位 ${median(easyRun.distances).toFixed(1)}m / 极限档中位 ${median(extremeRun.distances).toFixed(1)}m，简单档也用到 ${easyRun.covers.size} 个不同掩体`
    : `❌ 简单档 ${easyRun.covers.size} 个掩体，中位 ${median(easyRun.distances).toFixed(1)}m`,
);

console.log('UNHANDLED_REJECTIONS', JSON.stringify(await safe(page, () => window.__rejections ?? [])));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
