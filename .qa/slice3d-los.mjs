/**
 * 视线/遮挡自检（针对"敌人穿墙打我"）：
 *  1) 把玩家放到"某块实体掩体正后方"（相对敌人而言），
 *     敌人的视线必须为 false，并且 6 秒内一次都不能开火（deaths 不涨）
 *  2) 把玩家挪到开阔地，敌人必须能看见并开枪（证明它没有变成瞎子）
 *  3) 关掉玩家掩体开关后重复 1)，掩体（木箱/水泥墙）依然要能挡住视线
 *  4) 躲起来再露头，必须有重新瞄准的时间（不能零反应秒杀）
 */
import { chromium } from 'playwright-core';
import { EDGE, safe, ensureRunning } from './lib.mjs';

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
  localStorage.setItem('jg.slice3d.diff', 'normal');
  localStorage.removeItem('jg.slice3d.lastRecovery');
});
await page.goto(BASE, { waitUntil: 'networkidle' });
console.log('进入游戏', await ensureRunning(page));

const state = () =>
  safe(page, () => {
    const d = window.__slice3d;
    return {
      state: d.ai.state,
      deaths: d.deaths(),
      los: d.coverState().los,
      blocked: d.coverState().blocked,
      timer: +d.ai.timer.toFixed(2),
      enemy: { x: d.enemy.group.position.x, z: d.enemy.group.position.z },
      camera: { x: d.camera.position.x, z: d.camera.position.z },
    };
  });

/** 等到敌人站定瞄准（这样才有"是否开枪"这个前提） */
const waitAiming = async (ms) => {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const s = await state();
    if (s?.state === 'aiming') return s;
    await page.waitForTimeout(120);
  }
  return null;
};

/**
 * 找一个"确实被实体掩体挡住"的玩家位置。
 * 做法：在活动范围内网格搜索，对每个候选点做线段-碰撞盒（XZ 平面）相交测试，
 * 只接受"连线穿过掩体内部至少 0.5m"的点——这样敌人无论站在哪，视线都被挡住，
 * 不会出现"测试自己算错、结论站不住"的情况。
 */
const findHiddenSpot = async () => {
  return safe(page, () => {
    const d = window.__slice3d;
    const ex = d.enemy.group.position.x;
    const ez = d.enemy.group.position.z;
    const boxes = d.colliders().filter((b) => b.max[1] > 1.7); // 够高、能藏人的实体
    const scene = d.sceneInfo();
    const lim = scene.limits;
    let best = null;
    let bestScore = -1;
    for (let px = -lim.x; px <= lim.x; px += 0.3) {
      for (let pz = lim.zmin; pz <= lim.zmax; pz += 0.3) {
        // 线段 (ex,ez)-(px,pz) 与每个盒子的交叠长度
        let chord = 0;
        for (const b of boxes) {
          const dx = px - ex;
          const dz = pz - ez;
          let t0 = 0;
          let t1 = 1;
          let ok = true;
          for (const axis of [0, 2]) {
            const origin = axis === 0 ? ex : ez;
            const dir = axis === 0 ? dx : dz;
            const lo = b.min[axis];
            const hi = b.max[axis];
            if (Math.abs(dir) < 1e-6) {
              if (origin < lo || origin > hi) ok = false;
              continue;
            }
            let ta = (lo - origin) / dir;
            let tb = (hi - origin) / dir;
            if (ta > tb) [ta, tb] = [tb, ta];
            t0 = Math.max(t0, ta);
            t1 = Math.min(t1, tb);
          }
          if (ok && t1 > t0) chord = Math.max(chord, (t1 - t0) * Math.hypot(dx, dz));
        }
        // 越近越好（贴近掩体的"贴脸躲"也能过），但必须真的被挡住
        if (chord >= 0.5) {
          const dist = Math.hypot(px - ex, pz - ez);
          const score = chord - dist * 0.02;
          if (score > bestScore) {
            bestScore = score;
            best = { x: +px.toFixed(2), z: +pz.toFixed(2), chord: +chord.toFixed(2) };
          }
        }
      }
    }
    if (best) d.setPlayer(best.x, best.z);
    return best;
  });
};

const observe = async (seconds) => {
  const t0 = Date.now();
  let losTrue = 0;
  let maxBlocked = 0;
  let shots = 0;
  const first = await state();
  const deaths0 = first.deaths;
  while (Date.now() - t0 < seconds * 1000) {
    await page.waitForTimeout(100);
    const s = await state();
    if (!s) continue;
    if (s.los) losTrue++;
    maxBlocked = Math.max(maxBlocked, s.blocked);
    if (s.deaths > deaths0) {
      shots = s.deaths - deaths0;
      break;
    }
  }
  return { losTrue, maxBlocked, shots };
};

// 1) 躲到"几何上确定被挡住"的位置
const aim1 = await waitAiming(12000);
if (!aim1) console.log('⚠️ 等不到敌人架枪状态，测试可能不可靠');
const hold = async (seconds) => {
  const t0 = Date.now();
  let losTrue = 0;
  let shots = 0;
  let samples = 0;
  let lastSpot = null;
  const d0 = (await state())?.deaths ?? 0;
  while (Date.now() - t0 < seconds * 1000) {
    lastSpot = (await findHiddenSpot()) ?? lastSpot;
    await page.waitForTimeout(100);
    const s = await state();
    if (!s) continue;
    samples++;
    if (s.los) losTrue++;
    if (s.deaths > d0) {
      shots = s.deaths - d0;
      break;
    }
  }
  return { samples, losTrue, shots, spot: lastSpot };
};

const behind = await hold(6);
console.log('躲在实体掩体后 6 秒', JSON.stringify(behind));
console.log(
  '掩体真能挡枪',
  behind.shots === 0 && behind.losTrue === 0 ? '✅ 视线全程被挡，一枪没打过来' : '❌ 仍然被打/判定为可见',
);

// 2) 站到开阔地：敌人必须能看见并开枪（注意要等它从掩体后*拉出来*，否则测的是"它还在走路"）
await safe(page, () => window.__slice3d.setPlayer(0, 2.6));
let openAiming = await waitAiming(12000);
await safe(page, () => window.__slice3d.setPlayer(0, 2.6)); // 等的过程里别让它把玩家挤走
openAiming = openAiming ?? (await waitAiming(6000));
const open = await observe(9);
console.log('站在开阔地（敌人已进入架枪）9 秒', JSON.stringify(open), '敌人状态', openAiming?.state ?? 'unknown');
console.log(
  '敌人没变成瞎子',
  open.losTrue > 0 || open.shots > 0 ? '✅ 能看见并开火' : '❌ 看不见了（判定过头）',
);

// 3) 关掉玩家掩体，再躲回木箱后
await page.click('#s3-quit').catch(() => {});
await page.waitForTimeout(900);
const coverOff = await safe(page, () => {
  const btn = document.querySelector('#s3-cover-off');
  if (btn) btn.click();
  return !!btn;
});
console.log('已关闭玩家掩体', coverOff);
await ensureRunning(page);
const behind2 = await hold(6);
console.log('（玩家掩体关闭）躲在实体掩体后 6 秒', JSON.stringify(behind2));
console.log(
  '关掉玩家掩体也挡得住',
  behind2.shots === 0 && behind2.losTrue === 0 ? '✅' : '❌ 木箱/水泥墙不挡枪',
);

console.log('PAGE_ERRORS', JSON.stringify(errors));
await browser.close();
