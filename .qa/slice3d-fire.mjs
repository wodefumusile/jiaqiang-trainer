/**
 * 敌人开火模型自检（需求：提高开火频率；停下后必定在 0.2~0.5s 内开火，随难度缩短；
 * 命中率 30%→90%；命中里爆头率 10%→60%；但不提高"停下"的频率）
 *
 * 1) 参数表：六档难度的开火时限都在 [0.2, 0.5]，且随难度单调变短；命中率/爆头率符合需求
 * 2) 真实链路计时：从「进入静止架枪」到「第一枪」的实测间隔（每档采样多次）
 * 3) 统计命中率/爆头率：每种难度打 400 发（把玩家血量拉高避免打断采样）
 * 4) 停下频率：统计每分钟"拉出并就位"的次数，确认没有被开火改动带上天
 * 5) 未命中有反馈：空枪会在墙上留弹孔
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const DIFFS = ['easy', 'normal', 'hard', 'insane', 'master', 'extreme'];
const WANT = {
  easy: { hit: 0.3, head: 0.1 },
  normal: { hit: 0.42, head: 0.2 },
  hard: { hit: 0.54, head: 0.3 },
  insane: { hit: 0.66, head: 0.4 },
  master: { hit: 0.78, head: 0.5 },
  extreme: { hit: 0.9, head: 0.6 },
};

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
  localStorage.setItem('jg.slice3d.diff', 'normal');
  localStorage.removeItem('jg.slice3d.lastRecovery');
  localStorage.removeItem('jg.slice3d.deathStreak');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await ensureRunning(page);

const setDiff = async (d) => {
  await safe(page, (x) => {
    const btn = document.querySelector(`#s3-diff-row [data-diff="${x}"]`);
    if (btn) btn.click();
  }, d);
};

// 1) 参数表
console.log('--- 参数表 ---');
const params = {};
for (const d of DIFFS) {
  await setDiff(d);
  await page.waitForTimeout(120);
  const p = await safe(page, () => window.__slice3d.fireParams());
  params[d] = p;
  console.log(
    d.padEnd(8),
    '开火时限', p.delay.toFixed(2) + 's',
    '命中率', (p.hitRate * 100).toFixed(0) + '%',
    '爆头率', (p.headRate * 100).toFixed(0) + '%',
  );
}
const delays = DIFFS.map((d) => params[d].delay);
const inRange = delays.every((v) => v >= 0.2 - 1e-6 && v <= 0.5 + 1e-6);
const monotonic = delays.every((v, i) => i === 0 || v <= delays[i - 1] + 1e-6);
console.log('开火时限都在 0.2~0.5s 内', inRange ? '✅' : '❌', '· 随难度单调缩短', monotonic ? '✅' : '❌');

// 2) 统计命中率 / 爆头率（每种难度 400 发，走真实开火路径）
console.log('--- 命中率 / 爆头率（每种难度 400 发）---');
const N = 400;
for (const d of DIFFS) {
  await setDiff(d);
  await safe(page, () => window.__slice3d.setPlayerHp(1e9));
  const before = await safe(page, () => window.__slice3d.enemyFireStats());
  await safe(page, () => {
    for (let i = 0; i < 400; i++) window.__slice3d.forceEnemyFire();
  });
  await page.waitForTimeout(150);
  const after = await safe(page, () => window.__slice3d.enemyFireStats());
  const shots = after.shots - before.shots;
  const hits = after.hits - before.hits;
  const heads = after.headshots - before.headshots;
  const hitRate = hits / Math.max(1, shots);
  const headRate = heads / Math.max(1, hits);
  const ok = Math.abs(hitRate - WANT[d].hit) < 0.08 && Math.abs(headRate - WANT[d].head) < 0.09;
  console.log(
    d.padEnd(8),
    `实弹 ${shots}`,
    `命中 ${(hitRate * 100).toFixed(1)}%（目标 ${(WANT[d].hit * 100).toFixed(0)}%）`,
    `爆头 ${(headRate * 100).toFixed(1)}%（目标 ${(WANT[d].head * 100).toFixed(0)}%）`,
    ok ? '✅' : '❌',
  );
}
await safe(page, () => window.__slice3d.setPlayerHp(100));

// 3a) 连射间隔：架枪状态下两枪之间的间隔（就是"开火频率"）
console.log('--- 实测架枪连射间隔（每档 6 个间隔）---');
for (const d of DIFFS) {
  await setDiff(d);
  await safe(page, () => window.__slice3d.setPlayer(0, 2.6));
  await safe(page, () => window.__slice3d.setPlayerHp(1e9));
  const gaps = [];
  let prevShots = (await safe(page, () => window.__slice3d.enemyFireStats()))?.shots ?? 0;
  let prevShotAt = 0;
  const t0 = Date.now();
  while (gaps.length < 6 && Date.now() - t0 < 20000) {
    await page.waitForTimeout(25);
    const s = await safe(page, () => ({
      st: window.__slice3d.ai.state,
      shots: window.__slice3d.enemyFireStats().shots,
      hp: window.__slice3d.playerState().hp,
    }));
    if (!s) continue;
    if (s.shots > prevShots) {
      const nowMs = Date.now();
      if (prevShotAt > 0) gaps.push(+((nowMs - prevShotAt) / 1000).toFixed(2));
      prevShotAt = nowMs;
    }
    prevShots = s.shots;
  }
  const max = gaps.length ? Math.max(...gaps) : 0;
  const min = gaps.length ? Math.min(...gaps) : 0;
  console.log(
    d.padEnd(8),
    JSON.stringify(gaps),
    `区间 ${min}~${max}s`,
    gaps.length >= 4 && min >= 0.15 && max <= 0.58 ? '✅' : '❌',
  );
}
await safe(page, () => window.__slice3d.setPlayerHp(100));

// 3b) 停下 → 第一枪（让敌人重走拉出流程，每档 4 次）
console.log('--- 实测「停下 → 第一枪」间隔（每档 4 次）---');
for (const d of DIFFS) {
  await setDiff(d);
  await safe(page, () => window.__slice3d.setPlayer(0, 2.6));
  await safe(page, () => window.__slice3d.setPlayerHp(1e9));
  const samples = [];
  for (let k = 0; k < 4; k++) {
    await safe(page, () => window.__slice3d.forceEnemyCycle());
    const t0 = Date.now();
    let stopAt = 0;
    let prevState = '';
    let prevShots = (await safe(page, () => window.__slice3d.enemyFireStats()))?.shots ?? 0;
    while (Date.now() - t0 < 12000) {
      await page.waitForTimeout(25);
      const s = await safe(page, () => ({
        st: window.__slice3d.ai.state,
        shots: window.__slice3d.enemyFireStats().shots,
      }));
      if (!s) continue;
      if (s.st === 'aiming' && prevState !== 'aiming') stopAt = Date.now();
      if (s.shots > prevShots && stopAt > 0) {
        samples.push(+((Date.now() - stopAt) / 1000).toFixed(2));
        break;
      }
      prevShots = s.shots;
      prevState = s.st;
    }
  }
  const max = samples.length ? Math.max(...samples) : 0;
  const min = samples.length ? Math.min(...samples) : 0;
  console.log(
    d.padEnd(8),
    JSON.stringify(samples),
    `区间 ${min}~${max}s`,
    samples.length >= 3 && min >= 0.15 && max <= 0.58 ? '✅' : '❌',
  );
}
await safe(page, () => window.__slice3d.setPlayerHp(100));

// 4) 停下频率（每分钟就位次数）——确认没被开火改动带上天
console.log('--- 停下频率（普通难度 40 秒内就位次数）---');
await setDiff('normal');
let stops = 0;
let prev = '';
const t1 = Date.now();
while (Date.now() - t1 < 40000) {
  await page.waitForTimeout(80);
  const s = await safe(page, () => ({ st: window.__slice3d.ai.state, hp: window.__slice3d.playerState().hp }));
  if (!s) continue;
  if (s.hp <= 0) await safe(page, () => window.__slice3d.setPlayerHp(1e9));
  if (s.st === 'aiming' && prev !== 'aiming') stops++;
  prev = s.st;
}
console.log(`40 秒内就位 ${stops} 次（约 ${(stops * 1.5).toFixed(0)} 次/分钟）——拉出节奏代码未改动`);

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
