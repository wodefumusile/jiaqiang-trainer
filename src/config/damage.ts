/** 伤害模型：身体 4 枪致死（参考主流战术射击） */
export const DAMAGE = {
  /** 身体命中伤害 */
  body: 25,
  /** 头部命中伤害（秒杀） */
  head: 100,
  /** 目标血量 */
  maxHp: 100,
};

/** 打身体需要的枪数 */
export function bodyShotsToKill(): number {
  return Math.ceil(DAMAGE.maxHp / DAMAGE.body);
}

/** 单发伤害：爆头秒杀；拉枪模式任意命中即击杀 */
export function shotDamage(headshot: boolean, killRule: 'headshot' | 'any'): number {
  if (headshot) return DAMAGE.head;
  return killRule === 'any' ? DAMAGE.head : DAMAGE.body;
}
