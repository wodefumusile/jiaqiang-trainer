import type { GamePreset, SensitivityProfile } from '../types';
import { uid } from '../utils/id';

export const PRESET_MULTIPLIERS: Record<Exclude<GamePreset, 'custom'>, number> = {
  cs2: 0.022,
  valorant: 0.07,
};

export function multiplierForPreset(preset: GamePreset): number {
  return preset === 'custom' ? 0.022 : PRESET_MULTIPLIERS[preset];
}

export function degreesPerCount(p: SensitivityProfile): number {
  return p.sens * p.multiplier;
}

export function pxPerDegree(canvasWidth: number, fov: number): number {
  return canvasWidth / fov;
}

/** 移动 1 个鼠标计数对应的屏幕像素 */
export function pxPerCount(p: SensitivityProfile, canvasWidth: number): number {
  return degreesPerCount(p) * pxPerDegree(canvasWidth, p.fov);
}

export function cmPer360(p: SensitivityProfile): number {
  const countsPerCm = p.dpi / 2.54;
  const dps = degreesPerCount(p);
  return dps <= 0 || countsPerCm <= 0 ? 0 : 360 / (dps * countsPerCm);
}

export function createProfile(
  name: string,
  preset: GamePreset,
  sens: number,
  dpi: number,
  fov: number,
): SensitivityProfile {
  return {
    id: uid(),
    name,
    preset,
    sens,
    dpi,
    fov,
    multiplier: multiplierForPreset(preset),
  };
}

/** 实时微调：按比例缩放系数并夹紧 */
export function adjustMultiplier(p: SensitivityProfile, factor: number): SensitivityProfile {
  const multiplier = Math.min(10, Math.max(0.0005, p.multiplier * factor));
  return { ...p, multiplier };
}

/**
 * 灵敏度校准：记录转动 angleDeg 度消耗的鼠标计数 counts，
 * 得出每灵敏度单位的系数 multiplier = (angleDeg / counts) / sens。
 * 返回 0 表示输入无效。
 */
export function calibrateMultiplier(counts: number, angleDeg: number, sens: number): number {
  if (counts <= 0 || angleDeg <= 0 || sens <= 0) return 0;
  const degreesPerCount = angleDeg / counts;
  return degreesPerCount / sens;
}

export function defaultProfiles(): SensitivityProfile[] {
  return [
    createProfile('CS2 标准', 'cs2', 2.0, 800, 106),
    createProfile('Valorant 标准', 'valorant', 0.35, 800, 103),
    createProfile('自定义', 'custom', 1.0, 1600, 100),
  ];
}
