/**
 * 公网部署冒烟测试：直接开真实的无头浏览器访问 GitHub Pages 上的站点，
 * 确认"线上真的能玩"（不只是 HTTP 200）。
 *
 * 用法：node .qa/deploy-smoke.mjs [url] [期望版本]
 *   node .qa/deploy-smoke.mjs https://wodefumusile.github.io/jiaqiang-trainer/ v3d-1.5
 *
 * 检查项：页面载入 → 主页四单元 → 场景卡 → 进游戏（自动全屏）→ 持续出图 → 版本号 → 请求失败
 */
import { chromium } from 'playwright-core';
import { safe, renders, ensureRunning } from './lib.mjs';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const URL = process.argv[2] ?? 'https://wodefumusile.github.io/jiaqiang-trainer/';
const WANT_VERSION = process.argv[3] ?? '';
const PROXY = process.env.DEPLOY_SMOKE_PROXY ?? 'http://127.0.0.1:7892';

const args = ['--no-sandbox', '--use-gl=swiftshader'];
if (PROXY) args.push(`--proxy-server=${PROXY}`);
const browser = await chromium.launch({ executablePath: EDGE, headless: true, args });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
const failed = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('requestfailed', (r) => failed.push(`${r.url()} :: ${r.failure()?.errorText ?? ''}`));

await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForSelector('#s3-start', { timeout: 30000 });

const title = await page.title();
const units = await page.evaluate(() =>
  [...document.querySelectorAll('.s3-sec-head')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
);
const scenes = await page.evaluate(() => [...document.querySelectorAll('#s3-scene-row .s3-scene b')].map((b) => b.textContent));
console.log('标题', JSON.stringify(title));
console.log('四单元', JSON.stringify(units));
console.log('场景卡', JSON.stringify(scenes));

// 进游戏（点开始 → 自动全屏）。用统一的 ensureRunning：软件渲染环境偶发丢上下文会
// 自动重载并停在开始界面，这里会自动重进，避免把"环境重载"误判成"线上有问题"。
const entered = await ensureRunning(page);
await page.waitForTimeout(1200);
const info = await page.evaluate(() => {
  const d = window.__slice3d;
  const p = d.perf();
  return {
    renders: p.renders,
    fps: p.fps,
    gpu: p.gpu,
    scene: d.sceneInfo().name,
    version: document.querySelector('.s3-ver')?.textContent ?? '',
    fullscreen: !!document.fullscreenElement,
    hp: d.playerState().hp,
    // 新功能是否真的在线上包里（真血量/阵亡流程 + 概率开火模型）
    hasDeathFlow: typeof d.playerState === 'function' && typeof d.hurtPlayer === 'function',
    hasFireModel: typeof d.enemyFireStats === 'function' && typeof d.fireParams === 'function',
    hitRate: d.fireParams().hitRate,
  };
});
await page.waitForTimeout(1500);
const after = await renders(page);

console.log('进入游戏', entered, '运行状态', JSON.stringify({ ...info, rendersAfter: after }));
const checks = [
  ['四单元齐全', ['场景', '难度', '灵敏度', '准星'].every((w) => units.some((u) => u.includes(w)))],
  ['两张场景', scenes.length >= 2],
  ['持续出图', after > info.renders],
  ['自动全屏', info.fullscreen],
  ['死亡流程已上线', info.hasDeathFlow],
  ['概率开火模型已上线', info.hasFireModel],
  ['无请求失败', failed.length === 0],
  ['无脚本报错', errors.length === 0],
];
if (WANT_VERSION) checks.push([`版本 = ${WANT_VERSION}`, info.version === WANT_VERSION]);
for (const [name, ok] of checks) console.log(ok ? '✅' : '❌', name);
if (failed.length) console.log('请求失败明细', JSON.stringify(failed.slice(0, 5)));
if (errors.length) console.log('报错明细', JSON.stringify(errors.slice(0, 5)));

await browser.close();
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
