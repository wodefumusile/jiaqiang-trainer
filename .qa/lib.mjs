/**
 * 自检脚本公共工具。
 * 背景：本机自动化只能用 SwiftShader 软件渲染，它会偶发丢失 WebGL 上下文，
 * 应用内置的自动恢复会重载页面 → 脚本的 evaluate 会被打断。
 * 所以所有脚本都必须：容错读取 + 能在重载后重新进入游戏。
 */
export const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

/** 容错版 page.evaluate：页面正在重载时返回 null，而不是抛异常 */
export const safe = async (page, fn, arg) => {
  try {
    return await page.evaluate(fn, arg);
  } catch {
    return null;
  }
};

export const renders = async (page) => (await safe(page, () => window.__slice3d?.perf().renders ?? -1)) ?? -1;

/** 回到开始界面就点进入；已在游戏中则返回 */
export const clickStartIfNeeded = async (page) => {
  const visible = await safe(page, () => {
    const o = document.querySelector('#s3-overlay');
    return !!o && !o.classList.contains('hidden');
  });
  if (!visible) return false;
  await page.click('#s3-start').catch(() => {});
  await page.waitForTimeout(600);
  return true;
};

/** 等到真实出图（游戏确实在跑） */
export const ensureRunning = async (page, tries = 45) => {
  for (let i = 0; i < tries; i++) {
    await clickStartIfNeeded(page);
    const a = await renders(page);
    await page.waitForTimeout(400);
    const b = await renders(page);
    if (a >= 0 && b > a + 6) return true;
  }
  return false;
};
