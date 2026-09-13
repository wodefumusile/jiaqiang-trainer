export interface DifficultyConfig {
  id: string;
  name: string;
  description: string;
  /** 敌人移动速度倍率 */
  speedMul: number;
  /** 头部（目标）尺寸倍率 */
  headMul: number;
  /** 出现间隔倍率（>1 更宽松，<1 更突然） */
  waitMul: number;
  /** 单次遭遇速度随机抖动比例（0..1，越大越难预判） */
  jitter: number;
  /** 头部上下晃动幅度（相对头部半径的比例） */
  bobAmp: number;
  /** 敌人停下后开火前的瞄准时间倍率（越小越难） */
  attackMul: number;
}

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    id: 'easy',
    name: '入门',
    description: '慢速 · 大头 · 出现前等待久',
    speedMul: 0.65,
    headMul: 1.15,
    waitMul: 1.8,
    jitter: 0,
    bobAmp: 0,
    attackMul: 1.4,
  },
  {
    id: 'normal',
    name: '普通',
    description: '标准速度与目标尺寸',
    speedMul: 1,
    headMul: 1,
    waitMul: 1,
    jitter: 0.08,
    bobAmp: 0,
    attackMul: 1,
  },
  {
    id: 'hard',
    name: '进阶',
    description: '更快 · 更小 · 出现更突然',
    speedMul: 1.35,
    headMul: 0.8,
    waitMul: 0.55,
    jitter: 0.18,
    bobAmp: 0.12,
    attackMul: 0.8,
  },
  {
    id: 'insane',
    name: '职业',
    description: '极限速度 · 极小目标',
    speedMul: 1.75,
    headMul: 0.62,
    waitMul: 0.28,
    jitter: 0.3,
    bobAmp: 0.22,
    attackMul: 0.65,
  },
  {
    id: 'master',
    name: '大师',
    description: '高速 · 微目标 · 变速 · 晃头',
    speedMul: 2.2,
    headMul: 0.5,
    waitMul: 0.16,
    jitter: 0.4,
    bobAmp: 0.34,
    attackMul: 0.5,
  },
  {
    id: 'extreme',
    name: '极限',
    description: '最高速 · 极微目标 · 强变速 · 强晃动',
    speedMul: 2.8,
    headMul: 0.4,
    waitMul: 0.1,
    jitter: 0.5,
    bobAmp: 0.48,
    attackMul: 0.4,
  },
];

export function difficultyById(id: string): DifficultyConfig {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
}
