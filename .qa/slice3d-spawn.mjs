// 需求① 验证：刷新是否总在视线外 + 距离≥4m + 难度战术差异
import { chromium } from 'playwright-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args: ['--no-sandbox', '--use-gl=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:4173/?view=3d', { waitUntil: 'networkidle' });
await page.waitForSelector('#s3-start');
await page.click('#s3-start');
await page.waitForTimeout(300);

const snap = () =>
  page.evaluate(() => {
    const d = window.__slice3d;
    return { ...d.spawnInfo(), state: d.ai.state };
  });
const key = (code, down) =>
  page.evaluate(([c, d]) => document.dispatchEvent(new KeyboardEvent(d ? 'keydown' : 'keyup', { code: c })), [code, down]);
const setDiff = (id) => page.evaluate((d) => window.__slice3d.setDifficulty(d), id);

// 蹲下躲掩体，避免被打断，专测刷新与战术
await key('ControlLeft', true);

for (const diff of ['normal']) {
  await setDiff(diff);
  const spawns = [];
  let prevSeq = -1;
  for (let i = 0; i < 200; i++) {
    const s = await snap();
    // 刷新序号变化 = 新一波
    if (s.seq !== prevSeq) {
      spawns.push({
        cover: s.cover,
        visible: s.visible,
        distance: s.distance,
        fallback: s.fallback,
        cameraY: s.cameraY,
      });
      prevSeq = s.seq;
    }
    // 只要不是藏在掩体后/已死，就爆头快杀推进下一波
    if (s.state === 'aiming' || s.state === 'walking' || s.state === 'feinting') {
      await page.evaluate(() => {
        const d = window.__slice3d;
        const v = new d.enemy.head.position.constructor(0, 1.63, 0);
        d.enemy.group.localToWorld(v);
        d.aimAt(v.x, v.y, v.z);
      });
      await page.waitForTimeout(90);
      await page.mouse.down();
      await page.waitForTimeout(35);
      await page.mouse.up();
    }
    await page.waitForTimeout(110);
  }
  const final = await snap();
  console.log(
    `DIFF_${diff.toUpperCase()}`,
    JSON.stringify({
      spawns: spawns.length,
      anyVisibleAtSpawn: spawns.some((s) => s.visible),
      detail: spawns,
      minDistance: Math.min(...spawns.map((s) => s.distance ?? 99)).toFixed(2),
      distinctCovers: [...new Set(spawns.map((s) => s.cover))].length,
      feints: final.counters.feints,
      coverChanges: final.counters.coverChanges,
      strafeSeconds: final.strafeSeconds,
    }),
  );
}
console.log('SPAWN_SAMPLES', JSON.stringify((await snap()).cover));
await browser.close();
