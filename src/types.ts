export type GamePreset = 'cs2' | 'valorant' | 'custom';
export type ModeId = 'positioning' | 'flick' | 'preaim' | 'holding' | 'tracking';
export type Phase = 'menu' | 'training' | 'results';
export type SceneKind = 'cross' | 'peek' | 'window-cross' | 'height-cross' | 'dual-cross' | 'cover-pop';

export interface SensitivityProfile {
  id: string;
  name: string;
  preset: GamePreset;
  /** 游戏内灵敏度 */
  sens: number;
  /** 鼠标 DPI */
  dpi: number;
  /** 水平 FOV（度） */
  fov: number;
  /** 每灵敏度单位对应的角度（度/计数），CS2=0.022，Valorant=0.07 */
  multiplier: number;
}

export interface CrosshairStyle {
  color: string;
  size: number;
  gap: number;
  thickness: number;
  dot: boolean;
}

export interface Opening {
  x: number;
  y0: number;
  y1: number;
  width: number;
}

/** 掩体：敌人可以从掩体某一侧随机拉出 */
export interface Cover {
  id: string;
  /** 掩体边缘 x（相对） */
  x: number;
  /** 敌人从掩体哪一侧出现 */
  edge: 'left' | 'right';
  /** 出现侧的可视裁剪区（相对） */
  clip: { x: number; width: number; y0: number; y1: number };
}

export interface SceneConfig {
  id: string;
  name: string;
  description: string;
  kind: SceneKind;
  /** 墙体几何（相对坐标 0..1） */
  wall: { left: number; right: number; top: number; bottom: number };
  /** 可视/穿行区域（绘制裁剪 + 出现判定） */
  openings: Opening[];
  /** 可能的爆头线（相对高度，敌人头部中心 y）；多值=随机选择 */
  headLines: number[];
  /** 可拉出掩体（拐角/预瞄场景使用）；缺省用开口边缘 */
  covers?: Cover[];
  enemy: {
    /** 移动速度 px/s */
    speed: number;
    /** 头部半径（相对画布宽） */
    headR: number;
    /** 身体宽度（相对画布宽） */
    bodyW: number;
    /** 身体高度（相对画布高） */
    bodyH: number;
    /** 出现前随机等待区间 ms */
    waitMin: number;
    waitMax: number;
  };
  /** 移动方向 */
  moveDir: 1 | -1;
  /** peek 行为：探出停止位（相对 x）与停留时长 ms */
  peek?: { stopX: number; holdMs: number };
  /** cover-pop 行为：探出间隔 ms（上/下切换） */
  cover?: { upMs: number; downMs: number };
  /** preaim/stationary 目标的可见时长 ms */
  visibleMs?: number;
}

export interface ShotRecord {
  /** 距训练开始 ms */
  t: number;
  hit: boolean;
  head: boolean;
  /** 射击瞬间目标中心（用于过冲/欠冲分析） */
  targetX: number;
  targetY: number;
  /** 射击点相对目标中心的水平偏差 */
  distX: number;
}

export interface EncounterRecord {
  targetId: number;
  appearAt: number;
  firstShotAt: number | null;
  firstShotHit: boolean;
  firstShotHead: boolean;
  shotsFired: number;
  killed: boolean;
  killAt: number | null;
  escaped: boolean;
  /** 拉枪：本目标与上一目标中心的距离 px */
  flickDistPx: number | null;
  /** 预瞄：出现瞬间准星到目标中心的距离 px */
  preaimErrPx: number | null;
  /** 架枪/定位：遭遇期间准星相对出现瞬间的最大位移 px */
  displacementPx: number | null;
  /** 跟枪：准星在目标头部上的累计停留时间 ms */
  trackMs: number | null;
  /** 跟枪：目标可被射击的累计时长 ms */
  activeDurMs: number | null;
  /** 敌人停下后是否成功开火（玩家被击杀） */
  attacked: boolean;
}

export interface ModeExtra {
  flickTimeMs: number;
  flickDistPx: number;
  preaimErrPx: number;
  displacementPx: number;
  trackPct: number;
}

export interface SessionSummary {
  id: string;
  modeId: ModeId;
  sceneId: string;
  sceneName: string;
  difficultyId: string;
  difficultyName: string;
  profileId: string;
  profileName: string;
  startedAt: number;
  durationMs: number;
  shots: number;
  /** 空枪（对空气/墙面开的枪） */
  wastedShots: number;
  hits: number;
  headshots: number;
  /** 0..1 */
  accuracy: number;
  encounters: number;
  kills: number;
  firstShotHits: number;
  /** 0..1 */
  firstShotRate: number;
  avgReactionMs: number;
  avgCorrectionsPerKill: number;
  overshoots: number;
  undershoots: number;
  maxStreak: number;
  deaths: number;
  modeExtra: ModeExtra;
}
