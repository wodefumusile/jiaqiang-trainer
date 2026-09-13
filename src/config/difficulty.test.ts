import { describe, expect, it } from 'vitest';
import { DIFFICULTIES, difficultyById } from './difficulty';

describe('difficulty 难度档位', () => {
  it('六档齐全且顺序正确', () => {
    expect(DIFFICULTIES.map((d) => d.id)).toEqual([
      'easy',
      'normal',
      'hard',
      'insane',
      'master',
      'extreme',
    ]);
  });

  it('未知 id 回退普通难度', () => {
    expect(difficultyById('nope').id).toBe('normal');
  });

  it('难度越高：目标更快更小、敌人开火更快、抖动与晃头更强', () => {
    const easy = difficultyById('easy');
    const extreme = difficultyById('extreme');
    expect(extreme.speedMul).toBeGreaterThan(easy.speedMul);
    expect(extreme.headMul).toBeLessThan(easy.headMul);
    expect(extreme.waitMul).toBeLessThan(easy.waitMul);
    expect(extreme.jitter).toBeGreaterThan(easy.jitter);
    expect(extreme.bobAmp).toBeGreaterThan(easy.bobAmp);
    expect(extreme.attackMul).toBeLessThan(easy.attackMul);
  });
});
