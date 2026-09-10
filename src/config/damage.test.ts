import { describe, expect, it } from 'vitest';
import { bodyShotsToKill, DAMAGE, shotDamage } from './damage';

describe('damage 伤害模型', () => {
  it('打身体四枪致死', () => {
    expect(bodyShotsToKill()).toBe(4);
    expect(DAMAGE.body * 4).toBeGreaterThanOrEqual(DAMAGE.maxHp);
    expect(DAMAGE.body * 3).toBeLessThan(DAMAGE.maxHp);
  });

  it('爆头秒杀', () => {
    expect(shotDamage(true, 'headshot')).toBe(DAMAGE.maxHp);
    expect(shotDamage(true, 'any')).toBe(DAMAGE.maxHp);
  });

  it('拉枪模式任意命中即击杀', () => {
    expect(shotDamage(false, 'any')).toBe(DAMAGE.maxHp);
  });

  it('常规模式身体命中为 25 伤害', () => {
    expect(shotDamage(false, 'headshot')).toBe(25);
  });
});
