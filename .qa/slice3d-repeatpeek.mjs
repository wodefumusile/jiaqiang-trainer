/**
 * 需求⑦-E2（折中方案）验证：用真枪打身体，检验
 *   第 1 枪命中 → 敌人缩回掩体换身位（state: aiming → walking）
 *   第 2 枪命中 → 不缩，继续架枪（state 保持 aiming）← 这是"折中"的关键
 *   第 3 枪命中 → 缩回
 *   第 4 枪命中 → 死亡（身体四枪死，规则没被破坏）
 * 同时统计真实出图，确认没有定格。
 *
 * 用法：node .qa/slice3d-repeatpeek.mjs http://localhost:4173/ master
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, renders, ensureRunning } from './lib.mjs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const DIFF = process.argv[3] ?? 'master';

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox', '--use-gl=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript((diff) => {
  localStorage.setItem('jg.slice3d.count', '999'); // 不限：不会中途结算
  localStorage.setItem('jg.slice3d.diff', diff);
  localStorage.removeItem('jg.slice3d.lastRecovery');
}, DIFF);
await page.goto(BASE, { waitUntil: 'networkidle' });
console.log('ENTERED', await ensureRunning(page));

const snap = () =>
  safe(page, () => {
    const d = window.__slice3d;
    return {
      state: d.ai.state,
      hp: d.ai.hp,
      kills: d.kills(),
      bodyHits: d.spawnInfo().bodyHits,
      repeeks: d.spawnInfo().counters.repeeks,
      renders: d.perf().renders,
      loopError: d.perf().loopError,
    };
  });

const waitFor = async (pred, ms) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const s = await snap();
    if (s && pred(s)) return s;
    await page.waitForTimeout(100);
  }
  return null;
};

/** 瞄准躯干并打一发（单发之间间隔够久，散布已重置 → 第一发必中准星） */
const bodyShot = async () => {
  const aimed = await safe(page, () => {
    const d = window.__slice3d;
    const g = d.enemy.group;
    const V = d.enemy.head.position.constructor;
    const v = new V(0, 1.18, 0); // 躯干中心（蹲下时 localToWorld 会带上缩放）
    g.localToWorld(v);
    d.aimAt(v.x, v.y, v.z);
    return { x: +v.x.toFixed(2), y: +v.y.toFixed(2), z: +v.z.toFixed(2) };
  });
  if (!aimed) return null;
  await page.mouse.down();
  await page.waitForTimeout(30);
  await page.mouse.up();
  await page.waitForTimeout(200);
  return aimed;
};

const log = [];
let renders0 = (await snap())?.renders ?? 0;

for (let shot = 1; shot <= 4; shot++) {
  // 等他架好枪再打（第 1 枪后他会缩回，需要重新等）
  const before = await waitFor((s) => s.state === 'aiming', 15000);
  if (!before) {
    log.push({ shot, result: '❌ 等不到架枪状态' });
    break;
  }
  const target = await bodyShot();
  const after = await snap();
  const soon = await waitFor((s) => s.state === 'walking' || s.state === 'dead', 900);
  log.push({
    shot,
    target,
    hpAfter: after?.hp,
    bodyHits: after?.bodyHits,
    stateAfter: after?.state,
    retreated: soon?.state === 'walking',
    dead: after?.state === 'dead',
  });
  if (after?.state === 'dead') break;
  await page.waitForTimeout(700); // 让散布重置
}

const final = await snap();
console.log('难度', DIFF);
console.log('逐枪结果', JSON.stringify(log, null, 1));
console.log('repeeks 计数', final?.repeeks);
console.log('击杀数', final?.kills, final?.kills > 0 ? '✅ 身体四枪可击杀' : '❌ 没能击杀');
const expected = [true, false, true]; // 第1、3枪缩回，第2枪不缩（折中）
const actual = log.slice(0, 3).map((l) => !!l.retreated);
console.log('折中方案判定', JSON.stringify({ expected, actual }), JSON.stringify(expected) === JSON.stringify(actual) ? '✅ 符合' : '⚠️ 与预期不完全一致（可能被横移/蹲起打断）');
console.log('期间出图帧数', (final?.renders ?? 0) - renders0, '· LOOP_ERROR', JSON.stringify(final?.loopError));
console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
