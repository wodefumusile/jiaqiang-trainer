import { describe, expect, it } from 'vitest';
import { adjustMultiplier, calibrateMultiplier, cmPer360, createProfile, degreesPerCount, pxPerCount } from './sensitivity';

describe('sensitivity 换算', () => {
  it('CS2 档案：度/计数 = sens × 0.022', () => {
    const p = createProfile('t', 'cs2', 2.0, 800, 106);
    expect(degreesPerCount(p)).toBeCloseTo(0.044);
  });

  it('Valorant 档案使用 0.07 系数', () => {
    const p = createProfile('t', 'valorant', 0.35, 800, 103);
    expect(degreesPerCount(p)).toBeCloseTo(0.35 * 0.07);
  });

  it('px/计数 随画布宽度线性变化', () => {
    const p = createProfile('t', 'cs2', 2.0, 800, 106);
    expect(pxPerCount(p, 1920)).toBeCloseTo(0.044 * (1920 / 106));
    expect(pxPerCount(p, 960)).toBeCloseTo(0.044 * (960 / 106));
  });

  it('cm/360 正确换算', () => {
    const p = createProfile('t', 'cs2', 2.0, 800, 106);
    expect(cmPer360(p)).toBeCloseTo((360 * 2.54) / (0.044 * 800));
  });

  it('实时微调按比例缩放并夹紧', () => {
    const p = createProfile('t', 'cs2', 2.0, 800, 106);
    expect(adjustMultiplier(p, 1.01).multiplier).toBeCloseTo(0.022 * 1.01, 6);
    expect(adjustMultiplier(p, 0.99).multiplier).toBeCloseTo(0.022 * 0.99, 6);
    const tiny = createProfile('t', 'custom', 1, 800, 100);
    expect(adjustMultiplier({ ...tiny, multiplier: 0.0001 }, 0.5).multiplier).toBe(0.0005);
  });

  it('实测校准：由转动计数与角度反推系数', () => {
    // 180° 用了 1000 计数，sens=2 → 每计数 0.18° → 系数 0.09
    expect(calibrateMultiplier(1000, 180, 2)).toBeCloseTo(0.09);
    // 无效输入返回 0
    expect(calibrateMultiplier(0, 180, 2)).toBe(0);
    expect(calibrateMultiplier(1000, 0, 2)).toBe(0);
    expect(calibrateMultiplier(1000, 180, 0)).toBe(0);
  });
});
