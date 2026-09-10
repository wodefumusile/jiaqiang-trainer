import { describe, expect, it } from 'vitest';
import { effectiveSpread, movementSpread, RIFLE, sampleBulletOffset, SPRAY, spreadRadius } from './spray';

describe('spray 弹道散布', () => {
  it('前两发完全精准', () => {
    expect(spreadRadius(1, 1600)).toBe(0);
    expect(spreadRadius(2, 1600)).toBe(0);
  });

  it('第三发起散布随连射递增并封顶', () => {
    expect(spreadRadius(3, 1600)).toBeCloseTo(1600 * SPRAY.stepPx);
    expect(spreadRadius(4, 1600)).toBeCloseTo(2 * 1600 * SPRAY.stepPx);
    // 封顶
    expect(spreadRadius(100, 1600)).toBeCloseTo(1600 * SPRAY.maxPx);
  });

  it('无散布时弹着点完全在准星上', () => {
    expect(sampleBulletOffset(0)).toEqual({ x: 0, y: 0 });
  });

  it('有散布时偏移非零且以上扬为主（y ≤ 0）', () => {
    for (let i = 0; i < 50; i++) {
      const off = sampleBulletOffset(80);
      expect(Math.hypot(off.x, off.y)).toBeGreaterThan(0);
      expect(off.y).toBeLessThanOrEqual(0);
    }
  });

  it('停火恢复时间存在', () => {
    expect(SPRAY.recoveryMs).toBeGreaterThan(0);
  });

  it('全自动步枪参数合理', () => {
    expect(RIFLE.magSize).toBe(25);
    expect(RIFLE.fireIntervalMs).toBeGreaterThanOrEqual(80);
    expect(RIFLE.fireIntervalMs).toBeLessThanOrEqual(130);
    expect(RIFLE.reloadMs).toBeGreaterThan(1500);
  });

  it('移动射击散布极大：即使前两发也不精准', () => {
    expect(effectiveSpread(1, 1600, true)).toBe(movementSpread(1600));
    expect(effectiveSpread(2, 1600, true)).toBe(movementSpread(1600));
    expect(effectiveSpread(1, 1600, false)).toBe(0);
    // 连射散布超过移动散布时取连射
    expect(effectiveSpread(20, 1600, true)).toBe(spreadRadius(20, 1600));
  });
});
