// 自动化 QA：无头 Edge 加载应用，验证菜单/模式/场景/热键/结果页/图表。
// 需要先启动预览服务：npm run preview -- --port 4173
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:4173';
const outDir = path.join(process.cwd(), '.qa');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });

const errors = [];
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`console: ${m.text()}`);
});

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('.menu');
await page.screenshot({ path: path.join(outDir, 'menu.png') });

const menuInfo = await page.evaluate(() => ({
  modeCards: document.querySelectorAll('[data-mode]').length,
  sceneCards: document.querySelectorAll('[data-scene]').length,
  difficultyCards: document.querySelectorAll('.difficulty-card').length,
  profileCards: document.querySelectorAll('.profile-card').length,
  startText: document.querySelector('#start-btn')?.textContent?.trim(),
}));
console.log('MENU', JSON.stringify(menuInfo));

// 切到拉枪模式：场景应置灰、开始按钮显示竞技场
await page.click('[data-mode="flick"]');
await page.waitForTimeout(200);
const flickMenu = await page.evaluate(() => ({
  startText: document.querySelector('#start-btn')?.textContent?.trim(),
  sceneDimmed: document.querySelectorAll('[data-scene].card-dim').length,
}));
console.log('FLICK_MENU', JSON.stringify(flickMenu));

// 进入拉枪训练
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
const flickOverlayTitle = await page.evaluate(
  () => document.querySelector('#start-overlay h2')?.textContent,
);
console.log('FLICK_OVERLAY_TITLE', JSON.stringify(flickOverlayTitle));
await page.click('#lock-btn');
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `training-flick-${i}.png`) });
}
await page.screenshot({ path: path.join(outDir, 'training-flick.png') });
const flickHud = await page.evaluate(() => ({
  mode: document.querySelector('#hud-mode')?.textContent,
  scene: document.querySelector('#hud-scene')?.textContent,
  stat1: document.querySelector('#stat1-label')?.textContent,
}));
console.log('FLICK_HUD', JSON.stringify(flickHud));

// Tab 切到预瞄训练（会重建训练页）
await page.keyboard.press('Tab');
await page.waitForTimeout(400);
const preaimOverlayTitle = await page.evaluate(
  () => document.querySelector('#start-overlay h2')?.textContent,
);
console.log('PREAIM_OVERLAY_TITLE', JSON.stringify(preaimOverlayTitle));
await page.click('#lock-btn');
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(outDir, 'training-preaim.png') });

// Q 切场景（预瞄默认窄门 → 拐角 peek）
await page.keyboard.press('KeyQ');
await page.waitForTimeout(400);
const sceneSwitched = await page.evaluate(() => ({
  overlayTitle: document.querySelector('#start-overlay h2')?.textContent,
}));
await page.click('#lock-btn');
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(outDir, `training-corner-${i}.png`) });
}
await page.screenshot({ path: path.join(outDir, 'training-corner.png') });
const cornerHud = await page.evaluate(() => ({
  mode: document.querySelector('#hud-mode')?.textContent,
  scene: document.querySelector('#hud-scene')?.textContent,
  diff: document.querySelector('#hud-diff')?.textContent,
}));
console.log('CORNER_HUD', JSON.stringify(cornerHud));

// F2 切换难度
await page.keyboard.press('F2');
await page.waitForTimeout(300);
const diffHud = await page.evaluate(() => ({
  diff: document.querySelector('#hud-diff')?.textContent,
  toast: [...document.querySelectorAll('.toast')].at(-1)?.textContent,
}));
console.log('DIFF_HOTKEY', JSON.stringify(diffHud));

// 结束训练 → 结果页
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results', { timeout: 5000 });
await page.screenshot({ path: path.join(outDir, 'results.png') });
const results = await page.evaluate(() => ({
  title: document.querySelector('.results h1')?.textContent,
  statCards: document.querySelectorAll('.stat').length,
  charts: document.querySelectorAll('.chart-card canvas').length,
  tableRows: document.querySelectorAll('tbody tr').length,
  tableHeaders: [...document.querySelectorAll('thead th')].map((el) => el.textContent),
}));
console.log('RESULTS', JSON.stringify(results));

// 灵敏度热键回归
await page.click('#back-btn');
await page.waitForSelector('.menu');
await page.click('[data-mode="positioning"]');
await page.click('#start-btn');
await page.click('#lock-btn');
await page.waitForTimeout(800);
await page.keyboard.press('2');
await page.waitForTimeout(300);
const digitReg = await page.evaluate(() => ({
  profile: document.querySelector('#hud-profile')?.textContent,
}));
console.log('DIGIT2_REGRESSION', JSON.stringify(digitReg));

// 场景巡检：定位模式下依次进入六个场景截图
const sceneIds = ['narrow-door', 'corner-peek', 'window-hold', 'height-diff', 'dual-door', 'cover-sweep'];
for (const sceneId of sceneIds) {
  // 结束当前训练 → 结果页 → 返回菜单
  await page.evaluate(() => document.querySelector('#end-btn').click());
  await page.waitForSelector('.results');
  await page.click('#back-btn');
  await page.waitForSelector('.menu');
  await page.click(`[data-scene="${sceneId}"]`);
  await page.waitForTimeout(200);
  await page.click('#start-btn');
  await page.waitForSelector('#train-canvas');
  await page.click('#lock-btn');
  await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(outDir, `scene-${sceneId}.png`) });
}
console.log('SCENE_SWEEP_DONE', JSON.stringify(sceneIds));

// 结束掩体横移训练 → 返回菜单，选窄门 + 定位，连拍验证纵深出场
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
await page.click('#back-btn');
await page.waitForSelector('.menu');
await page.click('[data-scene="narrow-door"]');
// 极限难度：等待时间极短，便于密集连拍抓到纵深出场全过程
await page.click('[data-difficulty="extreme"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(outDir, `training-depth-${i}.png`) });
}

// 跟枪模式验证
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
await page.click('#back-btn');
await page.waitForSelector('.menu');
await page.click('[data-mode="tracking"]');
await page.click('#start-btn');
await page.click('#lock-btn');
await page.waitForTimeout(2000);
await page.screenshot({ path: path.join(outDir, 'training-tracking.png') });
const trackingHud = await page.evaluate(() => ({
  mode: document.querySelector('#hud-mode')?.textContent,
  stat1: document.querySelector('#stat1-label')?.textContent,
}));
console.log('TRACKING_HUD', JSON.stringify(trackingHud));

// 攻击行为验证：拐角 peek + 入门难度，不射击，等待敌人停下后开火
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
await page.click('#back-btn');
await page.waitForSelector('.menu');
await page.click('[data-scene="corner-peek"]');
await page.click('[data-difficulty="easy"]');
await page.click('#start-btn');
await page.waitForSelector('#train-canvas');
await page.click('#lock-btn');
await page.waitForTimeout(8000);
await page.screenshot({ path: path.join(outDir, 'training-attack.png') });
const attackHud = await page.evaluate(() => ({
  mode: document.querySelector('#hud-mode')?.textContent,
  scene: document.querySelector('#hud-scene')?.textContent,
}));
console.log('ATTACK_HUD', JSON.stringify(attackHud));
await page.evaluate(() => document.querySelector('#end-btn').click());
await page.waitForSelector('.results');
await page.screenshot({ path: path.join(outDir, 'results-attack.png') });
const attackResults = await page.evaluate(() => ({
  deaths: [
    ...document.querySelectorAll('.stat'),
  ]
    .find((el) => el.querySelector('span')?.textContent === '阵亡')
    ?.querySelector('strong')?.textContent,
  statCards: document.querySelectorAll('.stat').length,
  allStats: [...document.querySelectorAll('.stat')].map((el) => el.textContent?.trim()),
}));
console.log('ATTACK_RESULTS', JSON.stringify(attackResults));

console.log('ERRORS', JSON.stringify(errors));
await browser.close();
