import { describe, expect, it } from 'vitest';
import {
  CROSSHAIR_LIMITS,
  DEFAULT_CROSSHAIR,
  DEFAULT_SENS,
  clampCrosshair,
  clampSens,
  crosshairVars,
  sensCmPer360,
  sensDegreesPerCount,
  withPreset,
} from './aimSettings';

describe('准星设置', () => {
  it('越界/脏数据会被夹紧成合法值', () => {
    const c = clampCrosshair({ color: 'red', size: 999, gap: -5, thickness: 0, dot: 'yes' as unknown as boolean });
    expect(c.color).toBe(DEFAULT_CROSSHAIR.color);
    expect(c.size).toBe(CROSSHAIR_LIMITS.size[1]);
    expect(c.gap).toBe(0);
    expect(c.thickness).toBe(CROSSHAIR_LIMITS.thickness[0]);
    expect(c.dot).toBe(false);
  });

  it('缺省输入得到默认准星（带描边）', () => {
    expect(clampCrosshair(null)).toEqual(DEFAULT_CROSSHAIR);
  });

  it('CSS 变量与开关一致：关掉点/描边后尺寸为 0', () => {
    const vars = crosshairVars({ ...DEFAULT_CROSSHAIR, dot: false, outline: false, size: 12, gap: 3, thickness: 4 });
    expect(vars['--ch-len']).toBe('12px');
    expect(vars['--ch-gap']).toBe('3px');
    expect(vars['--ch-thick']).toBe('4px');
    expect(vars['--ch-dot']).toBe('0px');
    expect(vars['--ch-outline']).toBe('0px');
    expect(vars['--ch-color']).toBe(DEFAULT_CROSSHAIR.color);
  });

  it('开启中心点时，中心点不会比线条还细', () => {
    const vars = crosshairVars({ ...DEFAULT_CROSSHAIR, thickness: 3, dot: true });
    expect(vars['--ch-dot']).toBe('3px');
  });
});

describe('灵敏度设置', () => {
  it('灵敏度/DPI 会被夹进合法区间，系数只由预设决定', () => {
    const s = clampSens({ preset: 'valorant', sens: 999, dpi: 1, multiplier: 12345 });
    expect(s.sens).toBe(10);
    expect(s.dpi).toBe(100);
    expect(s.multiplier).toBeCloseTo(0.07, 6); // Valorant 系数，而不是脏数据 12345
  });

  it('默认档约等于真实 CS2 手感（800DPI/2.0 → 约 26cm 转一圈）', () => {
    const cm = sensCmPer360(DEFAULT_SENS);
    expect(cm).toBeGreaterThan(24);
    expect(cm).toBeLessThan(28);
  });

  it('切换预设后角度换算跟着变（Valorant 每计数转得更多）', () => {
    const cs2 = sensDegreesPerCount(DEFAULT_SENS);
    const val = sensDegreesPerCount(withPreset(DEFAULT_SENS, 'valorant'));
    expect(val).toBeGreaterThan(cs2);
  });
});
