/**
 * 需求⑦ 战术动作自检（难度默认调到"极限"，可用第二个参数覆盖）
 *
 * 采样：真实出图计数（定格检测）、敌人位置（瞬移检测）、
 *       战术计数（假动作/大身位横拉/再拉/re-peek/变向/蹲起）、
 *       本局身位档位（应来自离散身位表）
 *
 * 用法：node .qa/slice3d-tactics.mjs http://localhost:4173/ extreme 40
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, renders, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const DIFF = process.argv[3] ?? 'extreme';
const SECONDS = Number(process.argv[4] ?? 40);

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript((diff) => {
  localStorage.setItem('jg.slice3d.count', '8');
  localStorage.setItem('jg.slice3d.diff', diff);
  localStorage.removeItem('jg.slice3d.lastRecovery');
  window.__rejections = [];
  window.addEventListener('unhandledrejection', (e) => window.__rejections.push(String(e.reason)));
}, DIFF);
await page.goto(BASE, { waitUntil: 'networkidle' });

const entered = await ensureRunning(page);
console.log('ENTERED', entered);

const peekOffsets = new Set();
let stalls = 0;
let maxJump = 0;
let lastRenders = await renders(page);
let lastAdvance = Date.now();
let lastPos = null;
let lastSeq = null;
let lastSampleAt = Date.now();
let lastKill = 0;
let envReloads = 0;
let aimSince = null;
const t0 = Date.now();
let final = null;

while (Date.now() - t0 < SECONDS * 1000) {
  await page.waitForTimeout(120);
  const now = Date.now();
  const r = await renders(page);
  // 软件渲染环境偶发丢上下文 → 应用自动重载（-1 表示页面正在重载）
  if (r < 0) {
    envReloads++;
    await ensureRunning(page);
    lastRenders = await renders(page);
    lastAdvance = Date.now();
    continue;
  }
  // 3 秒没有新图：可能是重载后停在开始界面 → 重新进入；真卡住则 ensureRunning 会失败
  if (now - lastAdvance > 3000) {
    const ok = await ensureRunning(page, 12);
    lastRenders = await renders(page);
    lastAdvance = Date.now();
    if (!ok) continue;
  }
  if (r > lastRenders) {
    lastRenders = r;
    lastAdvance = now;
  } else if (now - lastAdvance > 400) {
    stalls++;
  }
  const s = await safe(page, () => {
    const d = window.__slice3d;
    return {
      state: d.ai.state,
      info: d.enemyInfo(),
      spawn: d.spawnInfo(),
    };
  });
  if (!s) continue;
  final = s;
  if (s.spawn?.peekOffset) peekOffsets.add(s.spawn.peekOffset);
  // 换刷新（seq 变化）是"新的一个敌人"，位置跳变属于正常；只有同一次刷新内的跳变才算瞬移
  const newSpawn = s.spawn?.seq !== lastSeq;
  if (newSpawn) lastSeq = s.spawn?.seq;
  if (lastPos && !newSpawn) {
    const jump = Math.hypot(s.info.x - lastPos.x, s.info.z - lastPos.z);
    const dtSec = Math.max(0.05, (now - lastSampleAt) / 1000);
    const speed = jump / dtSec;
    // 敌人的最高速度约 3 m/s（假动作冲刺 5 m/s），超过 8 m/s 才可能是瞬移
    if (speed > maxJump && jump < 6) maxJump = speed;
  }
  lastSampleAt = now;
  lastPos = { x: s.info.x, z: s.info.z };
  // 记录进入"架枪"的时刻：多让他架 1.5 秒，才能看到横移变向/急停/蹲起
  if (s.state === 'aiming') {
    if (aimSince === null) aimSince = now;
  } else if (s.state !== 'dead') {
    aimSince = null;
  }
  // 过一个人头，逼出下一次刷新（假动作 → 横拉 → 架枪）
  // 只在"已经架好枪"之后才过人头，否则会把还没做完的假动作掐掉，测不到战术动作
  const readyToKill = s.state === 'aiming' && aimSince !== null && now - aimSince > 1500;
  const stuckLong = now - lastKill > 9000;
  if (readyToKill || stuckLong) {
    lastKill = now;
    aimSince = null;
    await safe(page, () => {
      const d = window.__slice3d;
      if (d.ai.state !== 'dead') d.forceKill();
    });
  }
  // 打满本局会弹成绩面板 → 点"再来一局"继续
  const showedResult = await safe(page, () => {
    const o = document.querySelector('#s3-result');
    return !!o && !o.classList.contains('hidden');
  });
  if (showedResult) await page.click('#s3-again').catch(() => {});
  // 每隔一会儿对敌人身边打一枪（擦弹 → 触发 re-peek）
  if (s.state === 'aiming' && Math.random() < 0.25) {
    await safe(page, () => {
      const d = window.__slice3d;
      const g = d.enemy.group;
      const V = d.enemy.head.position.constructor;
      const v = new V(0.55, 1.45, 0); // 故意偏一点：擦弹而不是命中
      g.localToWorld(v);
      d.aimAt(v.x, v.y, v.z);
    });
    await page.mouse.down();
    await page.waitForTimeout(40);
    await page.mouse.up();
  }
}

const c = final?.spawn?.counters ?? {};
const jumpLimit = 8; // m/s：超过这个速度才可能是"瞬移换位"
console.log('难度', DIFF);
console.log('出图定格次数（>400ms）', stalls);
console.log('环境自动重载/重进次数', envReloads);
console.log('敌人最大位移速度(m/s)', maxJump.toFixed(2), maxJump > jumpLimit ? '❌ 疑似瞬移' : '✅ 无瞬移');
console.log('身位档位集合', JSON.stringify([...peekOffsets].sort((a, b) => a - b)));
console.log('战术计数', JSON.stringify(c));
console.log('结束时状态', JSON.stringify(final?.state));
console.log('UNHANDLED_REJECTIONS', JSON.stringify(await safe(page, () => window.__rejections ?? [])));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
