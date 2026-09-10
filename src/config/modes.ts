import type { ModeId } from '../types';

export interface ModeConfig {
  id: ModeId;
  name: string;
  description: string;
  /** 击杀规则：爆头击杀 or 任意部位命中击杀 */
  killRule: 'headshot' | 'any';
  /** 行为模式：场景行为 / 两端交替 / 固定点位出现 / 变速跟枪 */
  behavior: 'scene' | 'flick' | 'stationary' | 'tracking';
  /** 是否使用场景画面 */
  usesScene: boolean;
}

export const MODES: ModeConfig[] = [
  {
    id: 'positioning',
    name: '定位训练',
    description: '场景目标随机出现。第一发爆头 = 一次定位，身体命中需补枪 = 二次定位。',
    killRule: 'headshot',
    behavior: 'scene',
    usesScene: true,
  },
  {
    id: 'flick',
    name: '拉枪训练',
    description: '目标在屏幕两端交替出现，任意部位命中即击杀，练大范围甩枪速度。',
    killRule: 'any',
    behavior: 'flick',
    usesScene: false,
  },
  {
    id: 'preaim',
    name: '预瞄训练',
    description: '敌人从已知点位出现。准星应已预瞄在此，衡量预瞄偏差与反应。',
    killRule: 'headshot',
    behavior: 'stationary',
    usesScene: true,
  },
  {
    id: 'holding',
    name: '架枪训练',
    description: '架住点位等敌人出现，用最小位移第一时间击杀，衡量反应与准度。',
    killRule: 'headshot',
    behavior: 'scene',
    usesScene: true,
  },
  {
    id: 'tracking',
    name: '跟枪训练',
    description: '目标变速横移，准星需持续咬住头部。按枪口停留时间计分，练平滑跟枪。',
    killRule: 'headshot',
    behavior: 'tracking',
    usesScene: true,
  },
];

export function modeById(id: ModeId): ModeConfig {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
