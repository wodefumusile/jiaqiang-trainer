import { describe, expect, it } from 'vitest';
import { DIFFICULTIES, difficultyById, effectiveEnemy } from './difficulty';
import { SCENES } from '../scenes/registry';

describe('difficulty 难度参数', () => {
  const scene = SCENES[0];

  it('普通难度保持场景原始参数', () => {
    const e = effectiveEnemy(scene, difficultyById('normal'));
    expect(e.speed).toBe(scene.enemy.speed);
    expect(e.headR).toBe(scene.enemy.headR);
    expect(e.waitMin).toBe(scene.enemy.waitMin);
    expect(e.waitMax).toBe(scene.enemy.waitMax);
  });

  it('职业难度更快、更小、更突然', () => {
    const e = effectiveEnemy(scene, difficultyById('insane'));
    expect(e.speed).toBeGreaterThan(scene.enemy.speed);
    expect(e.headR).toBeLessThan(scene.enemy.headR);
    expect(e.waitMax).toBeLessThan(scene.enemy.waitMax);
  });

  it('入门难度更慢、更大、更宽松', () => {
    const e = effectiveEnemy(scene, difficultyById('easy'));
    expect(e.speed).toBeLessThan(scene.enemy.speed);
    expect(e.headR).toBeGreaterThan(scene.enemy.headR);
    expect(e.waitMax).toBeGreaterThan(scene.enemy.waitMax);
  });

  it('四档难度齐全且未知 id 回退普通', () => {
    expect(DIFFICULTIES.map((d) => d.id)).toEqual([
      'easy',
      'normal',
      'hard',
      'insane',
      'master',
      'extreme',
    ]);
    expect(difficultyById('nope').id).toBe('normal');
  });

  it('高难度档位引入变速抖动与头部晃动', () => {
    const extreme = difficultyById('extreme');
    const normal = difficultyById('normal');
    expect(extreme.speedMul).toBeGreaterThan(normal.speedMul);
    expect(extreme.headMul).toBeLessThan(normal.headMul);
    expect(extreme.waitMul).toBeLessThan(normal.waitMul);
    expect(extreme.jitter).toBeGreaterThan(normal.jitter);
    expect(extreme.bobAmp).toBeGreaterThan(normal.bobAmp);
    const e = effectiveEnemy(SCENES[0], extreme);
    expect(e.jitter).toBeGreaterThan(0);
    expect(e.bobAmp).toBeGreaterThan(0);
    expect(e.attackMul).toBeLessThan(difficultyById('normal').attackMul);
  });
});
