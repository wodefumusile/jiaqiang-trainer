/**
 * 长跑稳定性（真实游玩链路）：反复击杀 → 敌人不断从掩体后刷新 → 拉出 → 架枪。
 * 每 100ms 采一次"真实出图计数"，只要 >400ms 没有新图就记为一次定格。
 *
 * 这条链路正是之前"打一会儿画面就定格"的复现路径：
 * 每次刷新都会给敌人一条路径，而 walking 分支里的 return 曾经跳过整帧渲染。
 */
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.argv[2] ?? 'http://localhost:4173/';
const SECONDS = Number(process.argv[3] ?? 60);

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => {
  localStorage.setItem('jg.slice3d.count', '12'); // 12 个敌人，避免中途结算停掉
  localStorage.removeItem('jg.slice3d.lastRecovery');
  window.addEventListener('unhandledrejection', (e) => {
    (window.__rejections ??= []).push(String(e.reason));
  });
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(1500);

const snap = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    const p = d.perf();
    return { renders: p.renders, state: d.ai.state, path: d.ai.path.length, seq: d.spawnInfo().seq, recoveries: p.recoveries, loopError: p.loopError };
  });

const t0 = Date.now();
let prev = await snap();
let lastAdvanceAt = Date.now();
let stallStart = null;
let stallInfo = null;
const stalls = [];
let lastKillAt = 0;
let frames = 0;
let reentries = 0;
let reloads = 0;
page.on('framenavigated', (f) => {
  if (f === page.mainFrame()) reloads++;
});

/** 自动恢复重载后，会回到开始界面——重新进入，保证长跑不中断 */
const reenterIfNeeded = async () => {
  const startVisible = await page.evaluate(() => {
    const overlay = document.querySelector('#s3-overlay');
    return !!overlay && !overlay.classList.contains('hidden');
  });
  if (!startVisible) {
    // 既不在游戏里、也没回到开始界面（例如加载卡住/整页空白）→ 直接重载再来
    const stuckLoading = await page.evaluate(() => {
      const loading = document.querySelector('#s3-loading');
      return !!loading && !loading.classList.contains('hidden');
    });
    if (!stuckLoading) {
      await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(500);
    }
    const nowStart = await page.evaluate(() => {
      const overlay = document.querySelector('#s3-overlay');
      return !!overlay && !overlay.classList.contains('hidden');
    });
    if (!nowStart) return false;
  }
  await page.click('#s3-start').catch(() => {});
  await page.waitForTimeout(900);
  reentries++;
  return true;
};

while (Date.now() - t0 < SECONDS * 1000) {
  await page.waitForTimeout(100);
  const now = Date.now();
  const s = await snap();
  // 3 秒没有任何新图 + 回到了开始界面 → 视为自动恢复重载，重新进入
  if (s.renders === prev.renders && now - lastAdvanceAt > 3000) {
    if (await reenterIfNeeded()) {
      prev = await snap();
      lastAdvanceAt = Date.now();
      continue;
    }
  }
  if (s.renders > prev.renders) {
    frames += s.renders - prev.renders;
    lastAdvanceAt = now;
  }
  if (s.renders === prev.renders) {
    if (stallStart === null) {
      stallStart = lastAdvanceAt;
      stallInfo = prev;
    }
  } else {
    if (stallStart !== null && now - stallStart > 400) {
      stalls.push({ ms: now - stallStart, state: stallInfo.state, path: stallInfo.path });
    }
    stallStart = null;
    stallInfo = null;
  }
  // 每 1.2 秒过一个敌人，逼出"刷新 → 拉出（走路径）"这段逻辑
  if (now - lastKillAt > 1200) {
    lastKillAt = now;
    await page.evaluate(() => {
      const d = window.__slice3d;
      if (d.ai.state !== 'dead') d.forceKill();
    });
  }
  prev = s;
}

const elapsed = (Date.now() - t0) / 1000;
const last = await snap();
console.log('跑满秒数', elapsed.toFixed(1));
console.log('刷新次数（含换掩体）', last.seq);
console.log('真实出图帧数', frames, `→ ${(frames / elapsed).toFixed(1)} fps`);
console.log('定格次数（>400ms 无新图）', stalls.length);
if (stalls.length) console.log('定格明细', JSON.stringify(stalls.slice(0, 10)));
console.log('自动恢复重载', reloads, '次 · 重新进入', reentries, '次');
console.log('结束时状态', JSON.stringify(last));
console.log(
  '结束界面',
  JSON.stringify(
    await page.evaluate(() => ({
      overlay: document.querySelector('#s3-overlay')?.className,
      loading: document.querySelector('#s3-loading')?.className,
      pct: document.querySelector('#s3-loadpct')?.textContent,
      rejections: window.__rejections ?? [],
    })),
  ),
);
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
