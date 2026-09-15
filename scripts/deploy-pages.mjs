/**
 * 一键发布到 GitHub Pages（gh-pages 分支）
 *
 * 为什么用 gh-pages 分支而不是 GitHub Actions：
 *   本机的 token 只有 repo 权限、没有 workflow 权限，推不了 .github/workflows/*.yml；
 *   而 gh-pages 分支 + Pages（Deploy from a branch）不需要任何额外权限，最省事。
 *
 * 工作流程：构建 → 在临时工作树里清空 gh-pages → 放入 dist 内容 → 提交 → 推送 → 清理临时目录。
 * 用法：npm run deploy
 */
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, tmpdir, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repo = process.cwd();
const run = (cmd, cwd = repo, quiet = false) =>
  execSync(cmd, { cwd, stdio: quiet ? 'pipe' : 'inherit' }).toString();
const tryRun = (cmd, cwd = repo) => {
  try {
    run(cmd, cwd, true);
    return true;
  } catch {
    return false;
  }
};

/** 版本号直接从源码里读，避免提交信息和实际构建对不上 */
const version = /BUILD_STAMP = '([^']+)'/.exec(readFileSync(join(repo, 'src/three/slice.ts'), 'utf8'))?.[1] ?? 'unknown';

console.log('[1/5] 构建…');
run('npm run build');

console.log('[2/5] 准备 gh-pages 工作树…');
tryRun('git fetch origin gh-pages');
const tmp = mkdtempSync(join(tmpdir(), 'ghpages-'));
if (!tmp.startsWith(tmpdir())) throw new Error(`临时目录校验失败: ${tmp}`);
if (tryRun('git rev-parse --verify gh-pages')) {
  run(`git worktree add --force "${tmp}" gh-pages`);
} else if (tryRun('git rev-parse --verify origin/gh-pages')) {
  run(`git worktree add --force -b gh-pages "${tmp}" origin/gh-pages`);
} else {
  run(`git worktree add --orphan -b gh-pages "${tmp}"`);
}

console.log('[3/5] 用最新构建覆盖站点内容…');
// 清空工作树（.git 除外）——只删我们刚创建、且已校验在系统临时目录下的路径
for (const entry of readdirSync(tmp)) {
  if (entry === '.git') continue;
  rmSync(join(tmp, entry), { recursive: true, force: true });
}
cpSync(join(repo, 'dist'), tmp, { recursive: true });
// .nojekyll：告诉 GitHub Pages 不要走 Jekyll 处理（否则下划线开头的目录会被忽略）
writeFileSync(join(tmp, '.nojekyll'), '');

console.log('[4/5] 提交…');
run('git add -A', tmp);
run(`git commit -q -m "deploy: ${version} 构建产物（${new Date().toISOString().slice(0, 16).replace('T', ' ')}）"`, tmp);

console.log('[5/5] 推送 gh-pages…');
run('git push origin gh-pages', tmp);
run(`git worktree remove --force "${tmp}"`);

console.log(`\n发布完成。站点（约 1 分钟后生效）：https://<你的用户名>.github.io/jiaqiang-trainer/`);
console.log(`本次版本：${version}`);
