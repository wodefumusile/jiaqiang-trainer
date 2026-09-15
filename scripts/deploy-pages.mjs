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
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const repo = process.cwd();
const run = (cmd, cwd = repo, quiet = false) => {
  // 注意：stdio 为 inherit 时 execSync 返回 null，不能直接 .toString()
  const out = execSync(cmd, { cwd, stdio: quiet ? 'pipe' : 'inherit' });
  return out ? out.toString() : '';
};
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
// 先清理上次失败残留的临时工作树（只清系统临时目录下 ghpages-* 的，绝不碰别的路径）
const tempRoot = tmpdir().replace(/\\/g, '/').toLowerCase();
for (const line of run('git worktree list --porcelain').split('\n')) {
  if (!line.startsWith('worktree ')) continue;
  const p = line.slice('worktree '.length).trim().replace(/\\/g, '/');
  if (p.toLowerCase().startsWith(tempRoot) && p.toLowerCase().includes('ghpages-')) {
    run(`git worktree remove --force "${p}"`);
  }
}
const tmp = mkdtempSync(join(tmpdir(), 'ghpages-'));
if (!tmp.startsWith(tmpdir())) throw new Error(`临时目录校验失败: ${tmp}`);
try {
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
  // 注意必须用 quiet=true 才会把输出"捕获成字符串"；否则 stdio 继承、返回 null，
  // 会被误判成"没有变化"而跳过发布（这个坑真实踩过一次，线上没更新）
  const changed = run('git status --porcelain', tmp, true).trim();
  if (changed === '') {
    // 构建产物与线上完全一致（例如只改了文档）→ 没有可提交的内容，正常结束
    console.log('  构建产物与线上一致，无需发布');
  } else {
    console.log(`  共 ${changed.split('\n').length} 个文件有变化`);
    run(`git commit -q -m "deploy: ${version} 构建产物（${new Date().toISOString().slice(0, 16).replace('T', ' ')}）"`, tmp);
    console.log('[5/5] 推送 gh-pages…');
    run('git push origin gh-pages', tmp);
  }
} finally {
  // 无论成功失败都要把临时工作树清掉，否则下次 git 会抱怨残留
  tryRun(`git worktree remove --force "${tmp}"`);
}

/** 从 origin 地址推算出 Pages 网址，避免写死用户名 */
const remote = run('git remote get-url origin', repo, true).trim();
const m = /github\.com[/:]([^/]+)\/([^/.]+?)(\.git)?$/.exec(remote);
const siteUrl = m ? `https://${m[1]}.github.io/${m[2]}/` : '（未能从 origin 推断）';

console.log(`\n发布完成。站点（约 1 分钟后生效）：${siteUrl}`);
console.log(`本次版本：${version}`);
