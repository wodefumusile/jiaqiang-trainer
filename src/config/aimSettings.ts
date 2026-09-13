/**
 * 主页菜单里的"灵敏度"和"准星"设置模型。
 *
 * 设计原则：
 *  1. 数值一律走这里做夹紧（clamp），UI 层不自己发明范围——避免出现
 *     "滑块能拖到灵敏度 0 或者准星粗细 999"这类把游戏搞坏的情况；
 *  2. 换算只复用 src/config/sensitivity.ts 里已经过单测的公式，
 *     不在 UI 里另写一套角度换算；
 *  3. 所有设置都能序列化成 JSON 存 localStorage，刷新后保持原样。
 */
import type { CrosshairStyle, GamePreset, SensitivityProfile } from '../types';
import { cmPer360, degreesPerCount, multiplierForPreset } from './sensitivity';

/* ---------------- 准星 ---------------- */

export const CROSSHAIR_COLORS = ['#7cfc9b', '#00ff6a', '#ffffff', '#ffd24a', '#ff5c5c', '#4dc3ff', '#ff7ad9'];

export const CROSSHAIR_LIMITS = {
  /** 准星每条线的长度（px） */
  size: [0, 26] as [number, number],
  /** 中心空隙（px） */
  gap: [0, 18] as [number, number],
  /** 线条粗细（px） */
  thickness: [1, 6] as [number, number],
};

export const DEFAULT_CROSSHAIR: CrosshairStyle = {
  color: CROSSHAIR_COLORS[0],
  size: 8,
  gap: 4,
  thickness: 2,
  dot: false,
  outline: true,
};

const clampNum = (v: unknown, [lo, hi]: [number, number], fallback: number): number => {
  const n = typeof v === 'number' && Number.isFinite(v) ? v : Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(hi, Math.max(lo, n));
};

/** 把任意（可能来自旧版本 localStorage 的）对象夹紧成一份合法准星设置 */
export function clampCrosshair(input: Partial<CrosshairStyle> | null | undefined): CrosshairStyle {
  const c = input ?? {};
  return {
    color: typeof c.color === 'string' && /^#[0-9a-f]{6}$/i.test(c.color) ? c.color : DEFAULT_CROSSHAIR.color,
    size: Math.round(clampNum(c.size, CROSSHAIR_LIMITS.size, DEFAULT_CROSSHAIR.size)),
    gap: Math.round(clampNum(c.gap, CROSSHAIR_LIMITS.gap, DEFAULT_CROSSHAIR.gap)),
    thickness: Math.round(clampNum(c.thickness, CROSSHAIR_LIMITS.thickness, DEFAULT_CROSSHAIR.thickness)),
    dot: c.dot === true,
    outline: c.outline !== false,
  };
}

/** 准星设置 → CSS 变量（游戏内准星和菜单里的预览共用同一套变量） */
export function crosshairVars(c: CrosshairStyle): Record<string, string> {
  return {
    '--ch-color': c.color,
    '--ch-len': `${c.size}px`,
    '--ch-gap': `${c.gap}px`,
    '--ch-thick': `${c.thickness}px`,
    '--ch-dot': c.dot ? `${Math.max(2, c.thickness)}px` : '0px',
    '--ch-outline': c.outline ? '1px' : '0px',
  };
}

/* ---------------- 灵敏度 ---------------- */

export const SENS_LIMITS = {
  sens: [0.05, 10] as [number, number],
  dpi: [100, 3200] as [number, number],
};

/** 默认：CS2 标准档（2.0 @ 800 DPI，约 26cm/360°，和真实 CS2 手感一致） */
export const DEFAULT_SENS: SensitivityProfile = {
  id: 'default',
  name: 'CS2 标准',
  preset: 'cs2',
  sens: 2,
  dpi: 800,
  fov: 103,
  multiplier: multiplierForPreset('cs2'),
};

export function clampSens(input: Partial<SensitivityProfile> | null | undefined): SensitivityProfile {
  const p = input ?? {};
  const preset: GamePreset = p.preset === 'valorant' ? 'valorant' : 'cs2';
  return {
    id: typeof p.id === 'string' && p.id ? p.id : DEFAULT_SENS.id,
    name: typeof p.name === 'string' && p.name ? p.name : DEFAULT_SENS.name,
    preset,
    sens: +clampNum(p.sens, SENS_LIMITS.sens, DEFAULT_SENS.sens).toFixed(2),
    dpi: Math.round(clampNum(p.dpi, SENS_LIMITS.dpi, DEFAULT_SENS.dpi)),
    fov: typeof p.fov === 'number' && p.fov > 0 ? p.fov : DEFAULT_SENS.fov,
    // 系数永远由预设推导，避免 localStorage 里存着脏系数把视角搞飞
    multiplier: multiplierForPreset(preset),
  };
}

/** 切换游戏预设（同时按该游戏的换算系数走） */
export function withPreset(p: SensitivityProfile, preset: 'cs2' | 'valorant'): SensitivityProfile {
  return { ...p, preset, multiplier: multiplierForPreset(preset) };
}

/** 每 1 个鼠标计数转多少度（游戏内鼠标转动就用这个值） */
export function sensDegreesPerCount(p: SensitivityProfile): number {
  return degreesPerCount(p);
}

/** 多少厘米转一圈（玩家最直观的判断标准） */
export function sensCmPer360(p: SensitivityProfile): number {
  return cmPer360(p);
}

/** 设置摘要文字（菜单里显示在换算那一行） */
export function sensSummary(p: SensitivityProfile): string {
  const cm = sensCmPer360(p);
  return `${cm.toFixed(1)} cm / 360° · ${sensDegreesPerCount(p).toFixed(4)} °/计数`;
}
