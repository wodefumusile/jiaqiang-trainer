/**
 * 无畏契约式弹道模型：
 * - 前 2 发完全精准（弹着点 = 准星）
 * - 第 3 发起散布随连射递增（上限封顶）
 * - 停火超过 recoveryMs 后恢复精准（burst 重置）
 */
export const SPRAY = {
  /** 精准弹数 */
  perfectShots: 2,
  /** 每多发一枪的散布增量（相对画布宽） */
  stepPx: 0.013,
  /** 最大散布半径（相对画布宽） */
  maxPx: 0.055,
  /** 停火恢复时间 ms */
  recoveryMs: 500,
};

/** 全自动步枪参数 */
export const RIFLE = {
  /** 弹匣容量 */
  magSize: 25,
  /** 射速间隔 ms（约 583 RPM，参考无畏契约步枪） */
  fireIntervalMs: 103,
  /** 换弹时长 ms */
  reloadMs: 2500,
};

/** 当前 burst 第 n 发的散布半径（px）；前两发为 0 */
export function spreadRadius(burstCount: number, width: number): number {
  if (burstCount <= SPRAY.perfectShots) return 0;
  const step = width * SPRAY.stepPx;
  const max = width * SPRAY.maxPx;
  return Math.min(max, (burstCount - SPRAY.perfectShots) * step);
}

/** 移动射击时的散布（极大，即使前两发也不精准） */
export function movementSpread(width: number): number {
  return width * 0.05;
}

/** 综合散布：移动时取最大（移动 > 连射），站定时走正常连射散布 */
export function effectiveSpread(burstCount: number, width: number, moving: boolean): number {
  const base = spreadRadius(burstCount, width);
  return moving ? Math.max(base, movementSpread(width)) : base;
}

export interface BulletOffset {
  x: number;
  y: number;
}

/**
 * 在散布半径内采样弹着点偏移。
 * 弹道以上扬为主（真实后座先向上飘）：y 方向带向上偏置。
 */
export function sampleBulletOffset(radius: number, rng: () => number = Math.random): BulletOffset {
  if (radius <= 0) return { x: 0, y: 0 };
  const angle = rng() * Math.PI * 2;
  const r = radius * (0.4 + rng() * 0.6);
  return {
    x: Math.cos(angle) * r,
    y: -Math.abs(Math.sin(angle)) * r - radius * 0.35,
  };
}
