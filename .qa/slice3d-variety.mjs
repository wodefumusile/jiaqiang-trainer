/**
 * 刷新点多样性自检（针对"就那两个点，玩两局就腻"）：
 *  1) 长地图刷新点数量 = 固定 12 + 每局随机 5
 *  2) 每次重载，随机追加的掩体位置都不同（每局地图不完全一样）
 *  3) 实战跑一段时间，实际出现过多少个不同掩体（多样性指标）
 *  4) 难度只调远近概率，不再砍掉刷新点：简单档也会用到远点，极限档也会用近点
 *  5) 全程不出图定格
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
  localStorage.setItem('jg.slice3d.scene', 'long');
  localStorage.setItem('jg.slice3d.count', '999');
  localStorage.removeItem('jg.slice3d.lastRecovery');
  localStorage.removeItem('jg.slice3d.diff');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');

// 1) 数量
const info1 = await safe(page, () => window.__slice3d.sceneInfo());
console.log('刷新点', JSON.stringify({ 固定: info1.fixedSpawns, 随机: info1.procSpawns, 合计: info1.spawns }));
console.log('数量校验', info1.spawns === info1.fixedSpawns + info1.procSpawns && info1.procSpawns > 0 ? '✅' : '❌');

// 2) 两次进入，随机掩体位置应该不同
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
const info2 = await safe(page, () => window.__slice3d.sceneInfo());
const randomPart = (info) => info.spawnCoords.slice(info.fixedSpawns).flat().join(',');
const same = randomPart(info1) === randomPart(info2);
console.log('两次进入的随机掩体', same ? '❌ 完全相同' : '✅ 每局不同');
console.log('  第一次', randomPart(info1));
console.log('  第二次', randomPart(info2));

/** 跑一段时间，统计实际出现过的掩体与距离 */
const play = async (diff, seconds) => {
  await page.evaluate((d) => localStorage.setItem('jg.slice3d.diff', d), diff);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#s3-start');
  const entered = await ensureRunning(page);
  const covers = new Map();
  const distances = [];
  let stalls = 0;
  let lastRenders = await renders(page);
  let lastAdvance = Date.now();
  let lastSeq = -1;
  let lastKill = 0;
  const t0 = Date.now();
  while (Date.now() - t0 < seconds * 1000) {
    await page.waitForTimeout(120);
    const now = Date.now();
    const r = await renders(page);
    if (r >= 0 && r > lastRenders) {
      lastRenders = r;
      lastAdvance = now;
    } else if (now - lastAdvance > 400) stalls++;
    const s = await safe(page, () => ({ spawn: window.__slice3d.spawnInfo(), state: window.__slice3d.ai.state }));
    if (!s) continue;
    if (s.spawn?.seq !== lastSeq) {
      lastSeq = s.spawn.seq;
      covers.set(s.spawn.cover, (covers.get(s.spawn.cover) ?? 0) + 1);
      distances.push(s.spawn.distance);
    }
    if (now - lastKill > 2200 && s.state !== 'dead') {
      lastKill = now;
      await safe(page, () => {
        if (window.__slice3d.ai.state !== 'dead') window.__slice3d.forceKill();
      });
    }
  }
  return { entered, covers, distances, stalls };
};

const normal = await play('normal', 42);
const usedNormal = [...normal.covers.keys()];
console.log('普通档 42 秒内出现过的掩体', JSON.stringify([...normal.covers.entries()]));
console.log('多样性', `${usedNormal.length} 个不同掩体 / ${normal.distances.length} 次刷新`, usedNormal.length >= 7 ? '✅' : '❌ 太少');
console.log('其中随机位被用到', usedNormal.filter((k) => k.startsWith('随机位')).length, '个');
console.log('距离范围', Math.min(...normal.distances).toFixed(1), '~', Math.max(...normal.distances).toFixed(1), 'm');
console.log('简单档也会用到远点 / 极限档也会用近点，稍后由距离分布确认');

const easy = await play('easy', 30);
const hard = await play('extreme', 30);
console.log('简单档距离范围', Math.min(...easy.distances).toFixed(1), '~', Math.max(...easy.distances).toFixed(1));
console.log('极限档距离范围', Math.min(...hard.distances).toFixed(1), '~', Math.max(...hard.distances).toFixed(1));
console.log(
  '不再"砍点数"',
  Math.max(...easy.distances) >= 20 && Math.min(...hard.distances) <= 20 ? '✅ 两档都能见到远近点' : '❌',
);
console.log('出图定格次数', normal.stalls + easy.stalls + hard.stalls);
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
