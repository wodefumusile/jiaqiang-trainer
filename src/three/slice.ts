/**
 * 3D 垂直切片（branch: codex/3d-rebuild）
 *
 * 目标：用免费开源的 Three.js（项目本地依赖，无外部素材）验证 3D 路线的手感与观感。
 * 全部模型都是**程序化建模**（代码里的几何体 + 层级装配），因此不依赖任何美术资源文件，
 * 几何参数集中在本文件顶部的 CONFIG 里，后续可以直接替换为 Blender 导出的 glTF。
 *
 * 覆盖内容：
 *  - 3D 房间场景：地面/天花板/砖墙（真实开洞的门框）/木箱掩体/矮墙 + 暖光 + 阴影
 *  - 程序化步枪：机匣/护木/弹匣/枪托/握把/瞄具/枪口，挂载在相机上，含后坐力与摆动
 *  - 程序化敌人：头/躯干/双臂/双腿分层装配，行走与拉出掩体动画，受击闪红与倒地
 *  - 射击：射线命中（头=秒杀，身体=25 伤害，4 枪致死），前两发精准 + 连射扩散
 *  - 反馈：枪口火光、弹壳/火花、墙面弹孔、命中/击杀提示（复用现有音效与统计管线）
 */
import * as THREE from 'three';
import { RIFLE, effectiveSpread, sampleBulletOffset, shouldResetBurst } from '../config/spray';
import { DAMAGE, shotDamage } from '../config/damage';
import { sfx } from '../engine/sfx';
import { DIFFICULTIES } from '../config/difficulty';
import { summarizeSession } from '../stats/metrics';
import { pushSession } from '../state/appStore';
import {
  CROSSHAIR_COLORS,
  clampCrosshair,
  clampSens,
  crosshairVars,
  sensDegreesPerCount,
  sensSummary,
  withPreset,
} from '../config/aimSettings';
import type { CrosshairStyle, EncounterRecord, SensitivityProfile, ShotRecord } from '../types';

/** 版本标识：HUD 会显示它——用于一眼判断"浏览器里跑的是不是最新代码" */
const BUILD_STAMP = 'v3d-1.7';

/** 可调参数（后续换 glTF 模型时只改这里） */
const CONFIG = {
  /** 站姿眼高（米） */
  eyeHeight: 1.62,
  /** 下蹲眼高（米） */
  crouchHeight: 1.05,
  /** 移动速度与灵敏度换算（复用 2D 版的 px/计数 → 3D 角度） */
  moveSpeed: 3.4,
  /**
   * 敌人移动速度（米/秒）。
   * 修正视线判定后（敌人不能再"隔着掩体看见你"），它必须真的走出来才可能有枪线，
   * 原来 1.9m/s 会让拉出过程拖到 3 秒以上，显得又蠢又慢。
   * 3.0m/s 接近真人横向拉枪的速度（CS2 步枪移动约 4m/s，假动作冲刺更快）。
   */
  enemySpeed: 3.0,
  /** 刷新约束：离玩家最小距离（米）与判定用眼高 */
  spawn: { minDistance: 4, headHeight: 1.6 },
};

/* ===================== 场景表（主页"场景"单元的数据源） =====================
 * 一张场景 = 房间尺寸 + 门洞 + 玩家出生点/活动范围 + 掩体（=敌人刷新点）
 *            + 可见道具 + 雾 + 灯位 + 配色。
 * 所有几何体都在 buildRoom() 里按这张表生成，不再写死——加场景只需要往 SCENES 里加一条。
 */

/** 可见道具：kind=sandbag 只做装饰（不挡子弹），其余都是实体掩体（挡人挡弹） */
interface SceneProp {
  x: number;
  z: number;
  w: number;
  h: number;
  d: number;
  kind: 'crate' | 'barrier' | 'sandbag';
}

/** 敌人刷新点：tier 0 最近、3 最远；低难度只用近处，保证循序渐进 */
interface SceneSpawn {
  id: string;
  x: number;
  z: number;
  tier: 0 | 1 | 2 | 3;
}

interface SceneDef {
  id: string;
  name: string;
  desc: string;
  /** 交战距离文案（主页场景卡上显示） */
  range: string;
  room: { w: number; d: number; h: number };
  /** 后墙上的门洞：敌人从这里拉出 */
  door: { w: number; h: number; z: number };
  /** 玩家出生点与可移动范围 */
  player: { x: number; z: number; limitX: number; limitZmin: number; limitZmax: number };
  /** 玩家掩体（半高墙，蹲下可完全躲住） */
  playerCover: { x: number; z: number; w: number; h: number; d: number };
  spawns: SceneSpawn[];
  props: SceneProp[];
  fog: { near: number; far: number };
  lamps: { x: number; y: number; z: number }[];
  colors: { floor: number; wall: number; ceil: number; prop: number };
  /**
   * 每局随机追加的掩体（=额外刷新点）——防"玩家记完固定点位就腻"。
   * minDist/maxDist：相对玩家的距离带；keepDoor：门洞正面留出的通道宽度；
   * minGap：与已有掩体的最小间距。缺省表示这个场景不做随机追加。
   */
  proc?: { count: number; minDist: number; maxDist: number; keepDoor: number; minGap: number };
}

const SCENES: SceneDef[] = [
  {
    id: 'room3d',
    name: '3D 训练房间',
    desc: '14×26m 室内｜砖墙 · 木箱 · 沙袋 · 门洞',
    range: '交战 5–11m',
    room: { w: 14, d: 26, h: 3.2 },
    door: { w: 1.4, h: 2.3, z: -6 },
    player: { x: 0, z: 2.6, limitX: 4.2, limitZmin: -3.2, limitZmax: 2.9 },
    playerCover: { x: 0.6, z: 0.9, w: 3.2, h: 1.3, d: 0.5 },
  spawns: [
    { id: '前左箱后', x: -3.8, z: -2.2, tier: 0 },
    { id: '前右箱后', x: 3.8, z: -1.8, tier: 0 },
    { id: '门后左', x: -1.8, z: -7.6, tier: 1 },
    { id: '门后右', x: 1.8, z: -7.6, tier: 1 },
    // 注意：这两个点原来摆得太靠侧墙（离墙不到 1m），敌人会被"墙 + 掩体"夹住出不来。
    // 刷新点必须留出至少一个身位的横拉空间 —— 这条经验同样适用于以后新增的点。
    { id: '左中矮墙后', x: -4.4, z: -4.4, tier: 1 },
    { id: '右中矮墙后', x: 4.4, z: -4.0, tier: 1 },
  ],
  props: [
    { x: -1.9, z: -3.4, w: 1.2, h: 1.1, d: 1.2, kind: 'crate' },
    { x: 2.2, z: -2.4, w: 3.2, h: 0.95, d: 0.4, kind: 'barrier' },
    { x: -3.8, z: -2.2, w: 1.9, h: 1.95, d: 1.5, kind: 'crate' },
    { x: 3.8, z: -1.8, w: 1.9, h: 1.95, d: 1.5, kind: 'crate' },
    { x: -4.4, z: -4.4, w: 1.7, h: 1.95, d: 1.4, kind: 'barrier' },
    { x: 4.4, z: -4.0, w: 1.7, h: 1.95, d: 1.4, kind: 'crate' },
    { x: -5.4, z: -1.2, w: 2.0, h: 0.7, d: 1.0, kind: 'sandbag' },
  ],
    fog: { near: 8, far: 34 },
    lamps: [{ x: 6.1, y: 2.5, z: -1.5 }],
    colors: { floor: 0x3b3730, wall: 0x9d8f79, ceil: 0x2a1e15, prop: 0x6b4a2c },
  },
  {
    id: 'long',
    name: '长地图 · 远距离交战',
    desc: '26×84m 走廊｜四段纵深掩体 + 远端门洞',
    range: '交战 14–42m（随难度拉远）',
    room: { w: 26, d: 84, h: 4.2 },
    door: { w: 2.2, h: 2.6, z: -34 },
    player: { x: 0, z: 6, limitX: 8.5, limitZmin: -2, limitZmax: 9 },
    playerCover: { x: 0, z: 4.3, w: 4.2, h: 1.15, d: 0.5 },
    spawns: [
      { id: '近箱左', x: -7.5, z: -8, tier: 0 },
      { id: '近箱右', x: 7.5, z: -9.5, tier: 0 },
      { id: '中墙左', x: -9.5, z: -15, tier: 1 },
      { id: '中墙右', x: 9.5, z: -17, tier: 1 },
      { id: '远箱左', x: -6.5, z: -23, tier: 2 },
      { id: '远箱右', x: 6.5, z: -25, tier: 2 },
      { id: '门后左', x: -2.4, z: -35.4, tier: 3 },
      { id: '门后右', x: 2.4, z: -35.4, tier: 3 },
      { id: '近中矮墙后', x: -2.6, z: -10.5, tier: 0 },
      { id: '中箱左二', x: -4.6, z: -18.5, tier: 1 },
      { id: '远中箱后', x: 1.8, z: -27, tier: 2 },
      { id: '远侧墙后', x: -10.5, z: -28, tier: 2 },
    ],
    props: [
      // 近段：大木箱（14~16m）
      { x: -7.5, z: -8, w: 2.1, h: 2.0, d: 1.7, kind: 'crate' },
      { x: 7.5, z: -9.5, w: 2.1, h: 2.0, d: 1.7, kind: 'crate' },
      // 中段：水泥矮墙（23~25m，横拉才是主要身位）
      { x: -9.5, z: -15, w: 3.6, h: 1.3, d: 0.55, kind: 'barrier' },
      { x: 9.5, z: -17, w: 3.6, h: 1.3, d: 0.55, kind: 'barrier' },
      // 远段：箱堆（30~32m）
      { x: -6.5, z: -23, w: 2.3, h: 1.9, d: 1.7, kind: 'crate' },
      { x: 6.5, z: -25, w: 2.3, h: 1.9, d: 1.7, kind: 'crate' },
      // 中段走廊里的散落掩体：给玩家一点遮挡，也让枪线不单调
      { x: -3.2, z: -12, w: 1.6, h: 1.15, d: 1.6, kind: 'crate' },
      { x: 3.6, z: -19, w: 1.6, h: 1.15, d: 1.6, kind: 'crate' },
      // 门洞两侧（远端）
      { x: -4.4, z: -32.6, w: 2.0, h: 1.8, d: 1.5, kind: 'crate' },
      { x: 4.4, z: -32.6, w: 2.0, h: 1.8, d: 1.5, kind: 'crate' },
      // 额外的固定掩体（配合上面新增的刷新点）
      { x: -2.6, z: -10.5, w: 3.0, h: 1.9, d: 0.5, kind: 'barrier' },
      { x: -4.6, z: -18.5, w: 1.9, h: 1.95, d: 1.5, kind: 'crate' },
      { x: 1.8, z: -27, w: 2.0, h: 1.9, d: 1.6, kind: 'crate' },
      { x: -10.5, z: -28, w: 2.2, h: 2.0, d: 1.6, kind: 'crate' },
      // 玩家侧沙袋装饰
      { x: -6.2, z: 3.4, w: 2.2, h: 0.75, d: 1.0, kind: 'sandbag' },
      { x: 6.2, z: 3.4, w: 2.2, h: 0.75, d: 1.0, kind: 'sandbag' },
    ],
    fog: { near: 30, far: 130 },
    // 每局随机追加 5 个掩体位置：固定点位背下来之后，随机点位继续制造"没见过"的角度
    proc: { count: 5, minDist: 13, maxDist: 31, keepDoor: 4.5, minGap: 3.2 },
    lamps: [
      { x: 11.6, y: 3.5, z: -4 },
      { x: -11.6, y: 3.5, z: -16 },
      { x: 11.6, y: 3.5, z: -28 },
    ],
    colors: { floor: 0x343330, wall: 0x7f7869, ceil: 0x241d16, prop: 0x5b4530 },
  },
];

const DEFAULT_SCENE_ID = 'room3d';
const sceneById = (id: string | null): SceneDef => SCENES.find((s) => s.id === id) ?? SCENES[0];

/**
 * 敌人一枪对玩家造成的伤害。
 * 100 = 一枪毙命；40 = 三枪才死（贴近步枪的身体伤害：100 → 60 → 20 → 0）。
 * 想调难度改这一个数就够了。
 */
const ENEMY_SHOT_DAMAGE = 40;

/** 敌人爆头对玩家的伤害（直接毙命；命中/爆头概率见 TACTICS 的 hitRate / headRate） */
const ENEMY_HEADSHOT_DAMAGE = 100;

/** 死亡动画：倒地用时（毫秒） */
const DEATH_FALL_MS = 1200;
/** 从阵亡到弹出「你死了」的总时长（毫秒）——需求要求 3 秒左右 */
const DEATH_TEXT_MS = 2800;

/** 连续阵亡次数存在这里（跨局、跨刷新保留；打满目标完成一局才清零） */
const STREAK_KEY = 'jg.slice3d.deathStreak';
/** 连续死几次开始嘲讽 */
const TAUNT_AT = 3;

/* ---- 受击 / 阵亡的表现反馈参数（纯表现，不参与任何伤害与命中判定） ---- */
/** 受击红屏：冲到峰值用时（毫秒） */
const BLOOD_ATTACK_MS = 110;
/** 受击红屏：从峰值回落到 0 用时（毫秒） */
const BLOOD_DECAY_MS = 460;
/** 阵亡红屏最终深度（保持到玩家点击返回） */
const DEATH_RED_MAX = 0.9;
/** 相机震动：身体受击 / 爆头 / 阵亡 的幅度（米）与时长（毫秒） */
const SHAKE_HIT = { amp: 0.035, rot: 0.012, ms: 300 };
const SHAKE_HEAD = { amp: 0.06, rot: 0.022, ms: 450 };
const SHAKE_DEATH = { amp: 0.09, rot: 0.03, ms: 1400 };

/**
 * 难度 → 各距离档位的**权重**（不是开关）。
 *
 * 【重要修正】原来这里是"低难度只允许近点"，结果简单档只剩 2 个刷新点，
 * 玩家打两局就腻。现在的规则是：**所有刷新点都可能出现**，难度只调整概率分布——
 * 简单偏向近点（先练稳），极限偏向远点（练长距离预瞄），但永远存在"这次从哪出来"的悬念。
 */
const TIER_WEIGHT_BY_DIFF: Record<string, [number, number, number, number]> = {
  easy: [6, 3, 1, 0.5],
  normal: [4, 4, 2, 1],
  hard: [3, 4, 3, 1.5],
  insane: [2, 3, 4, 2.5],
  master: [1.5, 2.5, 4, 3.5],
  extreme: [1, 2, 4, 5],
};

/** 当前难度下某个距离档位的抽样权重 */
const tierWeight = (diff: string, tier: number): number =>
  (TIER_WEIGHT_BY_DIFF[diff] ?? TIER_WEIGHT_BY_DIFF.normal)[tier] ?? 1;

/**
 * 材质工厂：弱显卡上 MeshStandardMaterial（PBR）太贵，
 * 低/中画质统一用 MeshLambertMaterial（纯漫反射，几乎同样的观感但便宜很多）。
 * 只在建场景时决定一次——运行时切材质会触发着色器重编译造成卡顿。
 */
let useStandardMaterials = true;
/**
 * 无光照材质模式（最低画质开启）：MeshBasicMaterial 不需要光照计算，
 * 着色器最简单，能显著降低驱动层出问题（挂起/上下文丢失）的概率。
 */
let unlitMaterials = false;
function makeMat(params: {
  color: number;
  roughness?: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
}): THREE.Material {
  if (unlitMaterials) {
    return new THREE.MeshBasicMaterial({ color: params.color });
  }
  if (useStandardMaterials) {
    return new THREE.MeshStandardMaterial({
      color: params.color,
      roughness: params.roughness ?? 0.8,
      metalness: params.metalness ?? 0.05,
      emissive: params.emissive ?? 0x000000,
      emissiveIntensity: params.emissiveIntensity ?? 1,
    });
  }
  return new THREE.MeshLambertMaterial({
    color: params.color,
    emissive: params.emissive ?? 0x000000,
  });
}

/**
 * 难度 → 战术动作表（需求① / 需求⑦：敌人的基本行动模式要像 FPS 高手）
 *
 * peekSet    ：本次拉出的**身位**候选（米）。0.5 / 1.0 / 1.6 / 2.4 ≈
 *              半个身位 / 一个身位 / 一个半身位 / 一大段身位。
 *              低难度只敢小身位，高难度才会大身位横拉（wide swing）。
 * crouch     ：拉到位置后直接蹲着架枪的概率
 * feint      ：假动作 jiggle peek（探一下 → 缩回 → 再真正拉出）
 * feintDouble：双段假动作（探-缩-探-缩-再拉），最高难度专属
 * strafeShoot：架枪时横向移动射击（高手对枪不会站着给你打）
 * strafePause：横移中随机插急停的概率（counter-strafe 节奏）
 * crouchSpam ：对枪过程中蹲起的权重（头位忽高忽低，爆头预瞄失效）
 * repeatPeek ：被子弹擦过 / 被打中后缩回掩体换身位再拉（re-peek）
 * wideBias   ：拉出时直接选最大身位的概率（越大越爱大身位横拉）
 * paceHold   ："长架"节奏概率（先架稳再动，不急着出手）
 * paceRush   ："秒拉"节奏概率（peek 完立刻开枪，抢你的反应）
 * lead       ：枪线提前量（秒）——预瞄玩家横向移动的提前点
 * fireDelay  ：停下后**必定开火**的时限（秒）。需求：不低于 0.2、不超过 0.5，难度越高越短。
 * hitRate    ：开火命中玩家的概率（需求：0.30 → 0.90）
 * headRate   ：命中里打头的比例（需求：0.10 → 0.60）
 * coverChange：中途换掩体｜jitter：移动速度随机抖动比例
 */
const TACTICS: Record<
  string,
  {
    peekSet: number[];
    crouch: number;
    feint: boolean;
    feintDouble: boolean;
    strafeShoot: boolean;
    strafePause: number;
    crouchSpam: number;
    repeatPeek: boolean;
    wideBias: number;
    paceHold: number;
    paceRush: number;
    lead: number;
    fireDelay: number;
    hitRate: number;
    headRate: number;
    coverChange: boolean;
    jitter: number;
  }
> = {
  easy: {
    peekSet: [0.5, 1.0], crouch: 0.15, feint: false, feintDouble: false, strafeShoot: false,
    strafePause: 0, crouchSpam: 0, repeatPeek: false, wideBias: 0, paceHold: 0, paceRush: 0,
    lead: 0.04, fireDelay: 0.5, hitRate: 0.3, headRate: 0.1, coverChange: false, jitter: 0,
  },
  normal: {
    peekSet: [0.5, 1.0], crouch: 0.25, feint: false, feintDouble: false, strafeShoot: false,
    strafePause: 0, crouchSpam: 0.05, repeatPeek: false, wideBias: 0.1, paceHold: 0.15, paceRush: 0,
    lead: 0.05, fireDelay: 0.44, hitRate: 0.42, headRate: 0.2, coverChange: false, jitter: 0.1,
  },
  hard: {
    peekSet: [0.5, 1.0, 1.6], crouch: 0.4, feint: true, feintDouble: false, strafeShoot: false,
    strafePause: 0.1, crouchSpam: 0.15, repeatPeek: true, wideBias: 0.2, paceHold: 0.25, paceRush: 0.2,
    lead: 0.08, fireDelay: 0.38, hitRate: 0.54, headRate: 0.3, coverChange: false, jitter: 0.2,
  },
  insane: {
    peekSet: [0.5, 1.0, 1.6, 2.4], crouch: 0.45, feint: true, feintDouble: false, strafeShoot: false,
    strafePause: 0.2, crouchSpam: 0.25, repeatPeek: true, wideBias: 0.3, paceHold: 0.3, paceRush: 0.25,
    lead: 0.1, fireDelay: 0.32, hitRate: 0.66, headRate: 0.4, coverChange: true, jitter: 0.3,
  },
  master: {
    peekSet: [0.5, 1.0, 1.6, 2.4], crouch: 0.5, feint: true, feintDouble: false, strafeShoot: true,
    strafePause: 0.35, crouchSpam: 0.4, repeatPeek: true, wideBias: 0.45, paceHold: 0.35, paceRush: 0.3,
    lead: 0.12, fireDelay: 0.26, hitRate: 0.78, headRate: 0.5, coverChange: true, jitter: 0.45,
  },
  extreme: {
    peekSet: [1.0, 1.6, 2.4], crouch: 0.55, feint: true, feintDouble: true, strafeShoot: true,
    strafePause: 0.5, crouchSpam: 0.55, repeatPeek: true, wideBias: 0.6, paceHold: 0.4, paceRush: 0.35,
    lead: 0.14, fireDelay: 0.2, hitRate: 0.9, headRate: 0.6, coverChange: true, jitter: 0.65,
  },
};

interface SliceHooks {
  onExit: () => void;
}

/**
 * 主页"难度"单元里的一句话战术说明。
 * 注意：这是**3D 版真实行为**的描述（对应 TACTICS 表），不是 2D 时代的速度倍率文案——
 * 玩家看一眼就知道这一档的敌人会做什么。
 */
const DIFF_MENU_DESC: Record<string, string> = {
  easy: '小身位｜命中 30% · 爆头 10%',
  normal: '小身位 · 偶尔蹲｜命中 42% · 爆头 20%',
  hard: '假动作 · 急停｜命中 54% · 爆头 30%',
  insane: '大身位 · 换掩体 · 蹲起｜命中 66% · 爆头 40%',
  master: '横移对枪 · 预瞄提前量｜命中 78% · 爆头 50%',
  extreme: '双段假动作 · 大身位横拉｜命中 90% · 爆头 60%',
};

/**
 * 准星 DOM 结构：4 条线 + 1 个中心点。
 * 游戏内准星和主页预览共用同一份结构与同一套 CSS 变量，
 * 所以"预览看到的"就是"进游戏打到的"，不会两套皮。
 */
const CROSSHAIR_HTML = `
                  <i class="ch-line ch-t"></i>
                  <i class="ch-line ch-b"></i>
                  <i class="ch-line ch-l"></i>
                  <i class="ch-line ch-r"></i>
                  <i class="ch-dot"></i>`;


/** 程序化步枪：返回一个朝向 -Z 的枪组（坐标系：-Z 为枪口方向、+Y 为上） */
function buildRifle(): THREE.Group {
  const gun = new THREE.Group();
  const matMetal = new THREE.MeshStandardMaterial({ color: 0x3a424c, metalness: 0.85, roughness: 0.42 });
  const matPoly = new THREE.MeshStandardMaterial({ color: 0x22262b, metalness: 0.3, roughness: 0.75 });
  const matWood = makeMat({ color: 0x6b4a2c, roughness: 0.85 });
  const matRed = new THREE.MeshStandardMaterial({ color: 0xb8352a, metalness: 0.2, roughness: 0.7 });
  const add = (
    parent: THREE.Object3D,
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
  ): THREE.Mesh => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    parent.add(m);
    return m;
  };

  // 机匣
  add(gun, new THREE.BoxGeometry(0.1, 0.14, 0.46), matPoly, 0, 0, -0.2);
  // 顶部导轨
  add(gun, new THREE.BoxGeometry(0.06, 0.03, 0.5), matPoly, 0, 0.09, -0.22);
  // 拉机柄（换弹动画会拉动它）
  const charging = add(gun, new THREE.BoxGeometry(0.07, 0.02, 0.06), matMetal, 0.06, 0.06, -0.06);
  charging.name = 'charging';
  // 护木
  add(gun, new THREE.BoxGeometry(0.09, 0.1, 0.44), matWood, 0, -0.01, -0.66);
  // 枪管
  const barrel = add(gun, new THREE.CylinderGeometry(0.022, 0.022, 0.62, 12), matMetal, 0, 0.01, -1.18);
  barrel.rotation.x = Math.PI / 2;
  // 枪口装置
  const muzzle = add(gun, new THREE.CylinderGeometry(0.035, 0.035, 0.1, 12), matMetal, 0, 0.01, -1.52);
  muzzle.rotation.x = Math.PI / 2;
  // 弹匣（前倾）
  const mag = add(gun, new THREE.BoxGeometry(0.07, 0.26, 0.12), matPoly, 0, -0.2, -0.18);
  mag.rotation.x = -0.22;
  mag.name = 'mag';
  // 握把
  const grip = add(gun, new THREE.BoxGeometry(0.06, 0.18, 0.09), matPoly, 0, -0.17, 0.02);
  grip.rotation.x = 0.28;
  // 枪托
  add(gun, new THREE.BoxGeometry(0.08, 0.12, 0.34), matPoly, 0, -0.01, 0.16);
  // 腮托
  add(gun, new THREE.BoxGeometry(0.07, 0.05, 0.22), matPoly, 0, 0.07, 0.14);
  // 红点瞄具 + 镜片
  add(gun, new THREE.BoxGeometry(0.07, 0.07, 0.12), matPoly, 0, 0.15, -0.2);
  const lens = add(gun, new THREE.CircleGeometry(0.024, 16), new THREE.MeshBasicMaterial({ color: 0x2a6f8f }), 0, 0.15, -0.262);
  lens.rotation.y = Math.PI;
  // 红色点缀（呼应参考素材）
  add(gun, new THREE.BoxGeometry(0.02, 0.06, 0.03), matRed, 0.055, 0.02, -0.1);

  // 双手：用圆角柱体近似手套握持
  const glove = makeMat({ color: 0x3c4436, roughness: 0.9 });
  const skin = makeMat({ color: 0xd9a066, roughness: 0.8 });
  const handFront = add(gun, new THREE.BoxGeometry(0.09, 0.09, 0.14), glove, 0, -0.06, -0.62);
  handFront.rotation.z = 0.12;
  add(gun, new THREE.BoxGeometry(0.07, 0.05, 0.1), skin, 0, 0.0, -0.62);
  const handBack = add(gun, new THREE.BoxGeometry(0.09, 0.11, 0.12), glove, 0, -0.1, 0.0);
  handBack.rotation.z = -0.1;

  gun.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) o.castShadow = false;
  });
  return gun;
}

/** 程序化敌人：返回分组与动画所需部件引用 */
function buildEnemy(): {
  group: THREE.Group;
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  head: THREE.Mesh;
  torso: THREE.Mesh;
  materials: THREE.Material[];
} {
  const group = new THREE.Group();
  const clothes = makeMat({ color: 0x39434f, roughness: 0.78 });
  const vest = makeMat({ color: 0x232a33, roughness: 0.7 });
  const pants = makeMat({ color: 0x2b3037, roughness: 0.85 });
  const skinMat = makeMat({ color: 0xd7a271, roughness: 0.75 });
  const hair = makeMat({ color: 0x2b2118, roughness: 0.9 });
  const red = makeMat({ color: 0xc0392b, roughness: 0.7 });

  // 躯干 + 战术背心
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.58, 0.26), clothes);
  torso.position.y = 1.18;
  group.add(torso);
  const vestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.3), vest);
  vestMesh.position.y = 1.22;
  group.add(vestMesh);
  // 红色臂章（贴在上臂）
  const band = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.06), red);
  band.position.set(-0.26, 1.3, 0);
  group.add(band);

  // 头 + 头发
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.135, 20, 16), skinMat);
  head.position.y = 1.63;
  group.add(head);
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.142, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), hair);
  hairMesh.position.y = 1.645;
  group.add(hairMesh);

  // 四肢（用胶囊体近似，便于摆动）
  const legGeo = new THREE.CapsuleGeometry(0.085, 0.62, 4, 10);
  const leftLeg = new THREE.Mesh(legGeo, pants);
  leftLeg.position.set(-0.12, 0.48, 0);
  group.add(leftLeg);
  const rightLeg = new THREE.Mesh(legGeo, pants);
  rightLeg.position.set(0.12, 0.48, 0);
  group.add(rightLeg);

  const armGeo = new THREE.CapsuleGeometry(0.07, 0.5, 4, 10);
  const leftArm = new THREE.Mesh(armGeo, clothes);
  leftArm.position.set(-0.29, 1.16, -0.06);
  group.add(leftArm);
  const rightArm = new THREE.Mesh(armGeo, clothes);
  rightArm.position.set(0.29, 1.16, -0.06);
  group.add(rightArm);

  // 手中的简易武器（提高剪影辨识度）
  const gunMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.5), makeMat({ color: 0x15191d, roughness: 0.6 }));
  gunMesh.position.set(0.16, 1.12, -0.34);
  group.add(gunMesh);

  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.receiveShadow = true;
      // 只有大部件投影（头发/手臂/枪不投影）：减少阴影深度着色器数量与批次，
      // 避免敌人首次出现时为每个材质编译深度着色器造成"卡一下"
      m.castShadow = false;
    }
  });
  torso.castShadow = true;
  head.castShadow = true;
  leftLeg.castShadow = true;
  rightLeg.castShadow = true;

  // 命中判定分区：整具身体都可命中（头/头发=爆头，其余=身体）
  group.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    m.userData.isEnemy = true;
    m.userData.zone = 'body';
  });
  head.userData.zone = 'head';
  hairMesh.userData.zone = 'head';

  return {
    group,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    head,
    torso,
    materials: [clothes, vest, pants, skinMat, hair, red],
  };
}

/**
 * 按场景表建造房间：地面、天花板、四面墙（后墙带门洞）、掩体道具、灯。
 * 返回的 walls 同时是**碰撞体**（挡人）、**子弹目标**（挡弹/留弹孔）和**遮挡物**（判视线）。
 */
function buildRoom(def: SceneDef): { root: THREE.Group; walls: THREE.Mesh[] } {
  const root = new THREE.Group();
  const walls: THREE.Mesh[] = [];
  const brick = makeMat({ color: def.colors.wall, roughness: 0.92 });
  const floorMat = makeMat({ color: def.colors.floor, roughness: 0.95 });
  const ceilMat = makeMat({ color: def.colors.ceil, roughness: 0.9 });
  const propMat = makeMat({ color: def.colors.prop, roughness: 0.86 });
  const sandMat = makeMat({ color: 0x6b6146, roughness: 0.95 });
  const R = def.room;

  // 地面 + 天花板
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(R.w, R.d), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  root.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(R.w, R.d), ceilMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = R.h;
  root.add(ceil);

  const wall = (w: number, h: number, d: number, x: number, y: number, z: number): THREE.Mesh => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brick);
    m.position.set(x, y, z);
    m.castShadow = false;
    m.receiveShadow = true;
    root.add(m);
    walls.push(m);
    return m;
  };

  const halfW = R.w / 2;
  // 两侧长墙
  wall(0.3, R.h, R.d, -halfW, R.h / 2, 0);
  wall(0.3, R.h, R.d, halfW, R.h / 2, 0);
  // 后墙（含门洞）：左段 + 右段 + 门楣
  const doorHalf = def.door.w / 2;
  const backZ = def.door.z - 0.6;
  const leftW = halfW - doorHalf;
  wall(leftW, R.h, 0.3, -halfW + leftW / 2, R.h / 2, backZ);
  wall(leftW, R.h, 0.3, halfW - leftW / 2, R.h / 2, backZ);
  wall(def.door.w, R.h - def.door.h, 0.3, 0, def.door.h + (R.h - def.door.h) / 2, backZ);
  // 前墙（玩家背后，避免穿帮）
  wall(R.w, R.h, 0.3, 0, R.h / 2, R.d / 2);

  // 掩体 / 道具：沙袋是纯装饰（不挡子弹），其余都是实体（挡人 + 挡弹 + 挡视线）
  for (const p of def.props) {
    if (p.kind === 'sandbag') {
      // 沙袋堆：三个球体叠出来的观感，便宜且好看
      for (let i = 0; i < 3; i++) {
        const bag = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 8), sandMat);
        bag.scale.set(1.25, 0.72, 0.85);
        bag.position.set(p.x - 0.7 + i * 0.7, 0.22 + (p.h - 0.4) * 0.5, p.z);
        bag.castShadow = true;
        bag.receiveShadow = true;
        root.add(bag);
      }
      continue;
    }
    const m = new THREE.Mesh(new THREE.BoxGeometry(p.w, p.h, p.d), propMat);
    m.position.set(p.x, p.h / 2, p.z);
    m.castShadow = true;
    m.receiveShadow = true;
    m.userData.isCover = true;
    root.add(m);
    walls.push(m);
  }

  // 灯：自发光方块 + 暖色点光（点光数量在建场景时定死，运行时不改 → 不会触发着色器重编译）
  const lampBodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2724, emissive: 0xffd9a0, emissiveIntensity: 0.6 });
  for (const l of def.lamps) {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.26), lampBodyMat);
    body.position.set(l.x, l.y, l.z);
    root.add(body);
    const lamp = new THREE.PointLight(0xffd2a0, 5.5, 18, 2);
    lamp.position.set(l.x, l.y - 0.1, l.z);
    root.add(lamp);
  }

  return { root, walls };
}

/** 入口：把 3D 切片挂到指定容器 */
export function mountThreeSlice(container: HTMLElement, hooks: SliceHooks): () => void {
  /**
   * 当前场景：主页"场景"单元选择的结果，存 localStorage。
   * 必须在拼 HTML **之前**就确定——场景卡片上的"当前"标记要按它渲染。
   */
  let storedScene: string | null = null;
  try {
    storedScene = localStorage.getItem('jg.slice3d.scene');
  } catch {
    storedScene = null;
  }
  const SCENE = sceneById(storedScene);
  container.innerHTML = `
    <div class="slice3d">
      <canvas id="c3d"></canvas>
      <div class="s3-hud s3-left">
        <div class="s3-title" id="s3-scene-title">${SCENE.name}</div>
        <div class="s3-line" id="s3-scene-range">${SCENE.range}</div>
        <div class="s3-line">版本 ${BUILD_STAMP}</div>
        <div class="s3-line">鼠标转视角 · WASD 移动 · Ctrl 下蹲</div>
        <div class="s3-line">按住左键连发 · R 换弹 · Esc 退出</div>
        <div class="s3-line">F 全屏切换 · C 掩体 · P 画质</div>
        <div class="s3-line s3-perf" id="s3-perf">--</div>
      </div>
      <div class="s3-hud s3-right">
        <div class="s3-line">击杀 <b id="s3-kills">0</b></div>
        <div class="s3-line">命中率 <b id="s3-acc">--</b></div>
        <div class="s3-line">血量 <b id="s3-hp">100</b></div>
      </div>
      <div class="s3-ammo"><span id="s3-ammo">25</span> / 25</div>
      <div class="s3-crosshair" id="s3-cross">${CROSSHAIR_HTML}</div>
      <div class="s3-dmg" id="s3-dmg"></div>
      <div class="s3-banner" id="s3-banner"></div>
      <div class="s3-lock-hint hidden" id="s3-lock-hint">点击画面以捕获鼠标（否则无法转视角）</div>
      <!-- 受击/阵亡的渐变红屏：透明度由 JS 每帧驱动（纯 DOM，不占 GPU） -->
      <div class="s3-blood" id="s3-blood"></div>
      <!-- 阵亡界面：先播死亡动画，约 3 秒后弹出大字，点击任意处回开始界面 -->
      <div class="s3-dead hidden" id="s3-dead">
        <div class="s3-dead-text" id="s3-dead-text">你死了</div>
        <div class="s3-dead-streak" id="s3-dead-streak"></div>
        <div class="s3-dead-hint">点击任意处返回开始界面</div>
      </div>
      <div class="s3-overlay" id="s3-overlay">
        <div class="s3-card s3-menu-card">
          <div class="s3-menu-head">
            <div>
              <h2>架枪训练器</h2>
              <p class="s3-menu-sub">鼠标转视角 · WASD 移动 · Ctrl 下蹲 · 左键连发 · R 换弹 · Esc 退出</p>
            </div>
            <div class="s3-ver">${BUILD_STAMP}</div>
          </div>

          <div class="s3-menu">
            <!-- 单元 1：场景 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>1</b>场景</div>
              <div class="s3-scene-list" id="s3-scene-row">
                ${SCENES.map(
                  (s) => `<button class="s3-scene${s.id === SCENE.id ? ' is-on' : ''}" data-scene="${s.id}" type="button">
                  <i class="s3-scene-thumb s3-thumb-${s.id}" aria-hidden="true"></i>
                  <span class="s3-scene-txt">
                    <b>${s.name}</b>
                    <em>${s.desc}<br>${s.range}</em>
                  </span>
                  ${s.id === SCENE.id ? '<span class="s3-scene-tag">当前</span>' : ''}
                </button>`,
                ).join('')}
              </div>
              <p class="s3-hint">切换场景会自动重载一次（房间要按新尺寸重建）。</p>
              <div class="s3-field-row">
                <div class="s3-field">
                  <label>玩家掩体</label>
                  <div class="s3-pills">
                    <button class="s3-pill" id="s3-cover-on" type="button">有掩体</button>
                    <button class="s3-pill" id="s3-cover-off" type="button">空旷场地</button>
                  </div>
                </div>
                <div class="s3-field">
                  <label>战斗画面</label>
                  <div class="s3-pills" id="s3-fs-row">
                    <button class="s3-pill" data-fs="auto" type="button">自动全屏</button>
                    <button class="s3-pill" data-fs="window" type="button">窗口内</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- 单元 2：难度 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>2</b>难度</div>
              <div class="s3-diff-grid" id="s3-diff-row">
                ${DIFFICULTIES.map(
                  (d) => `<button class="s3-diff" data-diff="${d.id}" type="button">
                    <b>${d.name}</b><em>${DIFF_MENU_DESC[d.id] ?? d.description}</em>
                  </button>`,
                ).join('')}
              </div>
              <div class="s3-field">
                <label>本局敌人数量</label>
                <div class="s3-pills" id="s3-count-row">
                  <button class="s3-pill" data-count="5" type="button">5</button>
                  <button class="s3-pill" data-count="10" type="button">10</button>
                  <button class="s3-pill" data-count="20" type="button">20</button>
                  <button class="s3-pill" data-count="999" type="button">不限</button>
                </div>
              </div>
            </section>

            <!-- 单元 3：灵敏度及其相关 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>3</b>灵敏度及其相关</div>
              <div class="s3-field">
                <label>游戏预设</label>
                <div class="s3-pills" id="s3-preset-row">
                  <button class="s3-pill" data-preset="cs2" type="button">CS2</button>
                  <button class="s3-pill" data-preset="valorant" type="button">Valorant</button>
                </div>
              </div>
              <div class="s3-field">
                <label>游戏内灵敏度 <span class="s3-num" id="s3-sens-val">2.00</span></label>
                <input class="s3-range" type="range" id="s3-sens" min="0.05" max="10" step="0.01" value="2" />
              </div>
              <div class="s3-field s3-field-inline">
                <label>鼠标 DPI</label>
                <input class="s3-input" type="number" id="s3-dpi" min="100" max="3200" step="50" value="800" />
              </div>
              <div class="s3-readout" id="s3-sens-out">--</div>
              <p class="s3-hint">
                已自动请求原始输入（raw input）；若系统不支持，请关掉 Windows 的「提高指针精确度」，
                否则快速甩枪时的位移会被系统放大。
              </p>
            </section>

            <!-- 单元 4：准星设置 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>4</b>准星设置</div>
              <div class="s3-ch-wrap">
                <div class="s3-ch-preview">
                  <div class="s3-crosshair">${CROSSHAIR_HTML}</div>
                  <span class="s3-ch-preview-tip">预览</span>
                </div>
                <div class="s3-ch-controls">
                  <div class="s3-field">
                    <label>颜色</label>
                    <div class="s3-swatches" id="s3-ch-colors">
                      ${CROSSHAIR_COLORS.map(
                        (c) => `<button class="s3-swatch" data-color="${c}" style="--sw:${c}" type="button"></button>`,
                      ).join('')}
                    </div>
                  </div>
                  <div class="s3-ch-sliders">
                    <div class="s3-field">
                      <label>长度 <span class="s3-num" id="s3-ch-size-val">8</span></label>
                      <input class="s3-range" type="range" id="s3-ch-size" min="0" max="26" step="1" value="8" />
                    </div>
                    <div class="s3-field">
                      <label>间隙 <span class="s3-num" id="s3-ch-gap-val">4</span></label>
                      <input class="s3-range" type="range" id="s3-ch-gap" min="0" max="18" step="1" value="4" />
                    </div>
                    <div class="s3-field">
                      <label>粗细 <span class="s3-num" id="s3-ch-thick-val">2</span></label>
                      <input class="s3-range" type="range" id="s3-ch-thick" min="1" max="6" step="1" value="2" />
                    </div>
                  </div>
                  <div class="s3-field">
                    <label>附加</label>
                    <div class="s3-pills">
                      <button class="s3-pill" id="s3-ch-dot" type="button">中心点</button>
                      <button class="s3-pill" id="s3-ch-outline" type="button">描边</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="s3-menu-foot">
            <button class="btn-primary btn-lg" id="s3-start" disabled>初始化中…</button>
            <div class="s3-foot-tools">
              <button class="btn-ghost btn-sm" id="s3-fullscreen" type="button">全屏（F）</button>
              <button class="btn-ghost btn-sm" id="s3-bench" type="button">性能自检</button>
              <button class="btn-ghost btn-sm" id="s3-quit" type="button">退出</button>
            </div>
            <div class="s3-bench-out" id="s3-bench-out"></div>
            <div class="s3-lastlog" id="s3-lastlog"></div>
          </div>
        </div>
      </div>
      <div class="overlay hidden" id="s3-loading">
        <div class="s3-card">
          <h2>正在准备训练</h2>
          <p id="s3-load-step">初始化…</p>
          <div class="s3-progress"><i id="s3-progress-fill"></i></div>
          <p class="s3-line" id="s3-load-pct">0%</p>
        </div>
      </div>
      <div class="overlay hidden" id="s3-result">
        <div class="s3-card">
          <h2>训练成绩</h2>
          <div class="s3-score" id="s3-score"></div>
          <div class="row">
            <button class="btn-primary" id="s3-again">再来一局</button>
            <button class="btn-ghost" id="s3-back">返回设置</button>
          </div>
        </div>
      </div>
    </div>
  `;
  const canvas = container.querySelector<HTMLCanvasElement>('#c3d')!;
  const overlay = container.querySelector<HTMLElement>('#s3-overlay')!;
  const ammoEl = container.querySelector<HTMLElement>('#s3-ammo')!;
  const killsEl = container.querySelector<HTMLElement>('#s3-kills')!;
  const accEl = container.querySelector<HTMLElement>('#s3-acc')!;
  const hpEl = container.querySelector<HTMLElement>('#s3-hp')!;
  const bannerEl = container.querySelector<HTMLElement>('#s3-banner')!;
  const dmgLayer = container.querySelector<HTMLElement>('#s3-dmg')!;
  // 用 id 精确定位游戏内准星（主页预览里也有一个 .s3-crosshair，不能靠 class 抓）
  const crosshairEl = container.querySelector<HTMLElement>('#s3-cross')!;
  const coverOnBtn = container.querySelector<HTMLButtonElement>('#s3-cover-on')!;
  const coverOffBtn = container.querySelector<HTMLButtonElement>('#s3-cover-off')!;
  const diffRow = container.querySelector<HTMLElement>('#s3-diff-row')!;
  const fullscreenBtn = container.querySelector<HTMLButtonElement>('#s3-fullscreen')!;
  const perfEl = container.querySelector<HTMLElement>('#s3-perf')!;
  const loadingOverlay = container.querySelector<HTMLElement>('#s3-loading')!;
  const loadStepEl = container.querySelector<HTMLElement>('#s3-load-step')!;
  const loadPctEl = container.querySelector<HTMLElement>('#s3-load-pct')!;
  const progressFill = container.querySelector<HTMLElement>('#s3-progress-fill')!;
  const resultOverlay = container.querySelector<HTMLElement>('#s3-result')!;
  const scoreEl = container.querySelector<HTMLElement>('#s3-score')!;
  const againBtn = container.querySelector<HTMLButtonElement>('#s3-again')!;
  const backBtn = container.querySelector<HTMLButtonElement>('#s3-back')!;
  // 注意：这里必须用 id 精确定位——用 :last-of-type 之类的结构选择器一旦失配，
  // 会在挂载阶段抛异常导致整个应用起不来（曾经的真实 Bug）
  const countRow = container.querySelector<HTMLElement>('#s3-count-row');
  const benchBtn = container.querySelector<HTMLButtonElement>('#s3-bench')!;
  const benchOut = container.querySelector<HTMLElement>('#s3-bench-out')!;
  const lastLogEl = container.querySelector<HTMLElement>('#s3-lastlog')!;
  const lockHintEl = container.querySelector<HTMLElement>('#s3-lock-hint')!;
  const deathEl = container.querySelector<HTMLElement>('#s3-dead')!;
  const deathTextEl = container.querySelector<HTMLElement>('#s3-dead-text')!;
  const deathStreakEl = container.querySelector<HTMLElement>('#s3-dead-streak')!;
  const bloodEl = container.querySelector<HTMLElement>('#s3-blood')!;
  /**
   * 关键：场景构建需要几百毫秒，如果用户在构建完成前点"点击进入"，这一下会被丢掉
   * （表现就是"点了没反应 / 卡住动不了"，时好时坏）。这里在最开头就记下点击意图，
   * 并在按钮上显示"初始化中…"，构建完成后立即开始。
   */
  const startBtn = container.querySelector<HTMLButtonElement>('#s3-start')!;
  let startRequested = false;
  startBtn.disabled = true;
  startBtn.textContent = '初始化中…';
  startBtn.addEventListener('click', () => {
    startRequested = true;
  });
  /** 敌人池是否已加载（决定"点击进入"是走加载流程还是直接开始） */
  let sessionReady = false;
  // 事件日志：先占位再实现——因为在场景构建阶段（resetEnemy 初始化）就会调用 logEvent，
  // 若直接用 const/let 在后面声明会触发 TDZ 异常，导致挂载中断（这是踩过的坑）
  let eventLog: string[] = [];
  let logEvent: (msg: string) => void = () => {};
  /**
   * 请求鼠标指针锁定（必须在用户手势内同步调用）。
   * 关键：**失败只提示、绝不抛异常**——一旦抛出会打断 start() 流程，
   * 加载不执行、鼠标锁不上，表现就是"点击进入后动不了"（真实踩过的坑）。
   */
  /** 当前环境是否不支持"原始输入"（raw input）——不支持就退回普通指针锁定 */
  let rawInputUnsupported = false;
  const tryLock = (): void => {
    /**
     * 统一封装指针锁定请求：**同步异常和 Promise 拒绝全部吞掉**。
     * 原因：连续点击时浏览器会抛 "Pointer lock pending"，如果不 catch，
     * 控制台会刷一堆未处理的 Promise 拒绝（看着像 bug，实际只是重试）。
     */
    const req = (opts?: { unadjustedMovement?: boolean }): Promise<void> | undefined => {
      try {
        const p = (canvas.requestPointerLock as (o?: { unadjustedMovement?: boolean }) => unknown)(opts) as
          | Promise<void>
          | undefined;
        if (p && typeof p.catch === 'function') p.catch(() => undefined);
        return p;
      } catch {
        return undefined; // 点击画面会重试
      }
    };
    // 环境不支持 raw input 时记住，之后一律走普通锁定（避免每次都要多失败一轮）
    if (rawInputUnsupported) {
      req();
      return;
    }
    // 关键（手感/安全）：请求"原始输入" unadjustedMovement。
    // 不开它的话，浏览器给我们的 movementX 是**经过系统鼠标加速处理**的位移，
    // 于是"度/计数"的换算在快速甩枪时会被放大 —— 表现就是视角突然不受控地甩出去。
    const p = req({ unadjustedMovement: true });
    if (p) {
      p.catch(() => {
        // 某些驱动/系统不支持 raw input：退回普通锁定
        rawInputUnsupported = true;
        req();
      });
    }
  };

  /** 本局敌人数量（玩家开局前可选），999 = 不限 */
  let sessionTarget = Number(localStorage.getItem('jg.slice3d.count') ?? '10') || 10;
  const refreshCountButtons = (): void => {
    container.querySelectorAll<HTMLButtonElement>('[data-count]').forEach((b) => {
      b.classList.toggle('is-on', Number(b.dataset.count) === sessionTarget);
    });
  };
  refreshCountButtons();
  countRow?.querySelectorAll<HTMLButtonElement>('[data-count]').forEach((b) => {
    b.addEventListener('click', () => {
      sessionTarget = Number(b.dataset.count) ?? 10;
      localStorage.setItem('jg.slice3d.count', String(sessionTarget));
      refreshCountButtons();
    });
  });

  /* ---------------- 画质档位（性能开关） ----------------
   * 高：像素比 ≤1.5 + 阴影 1024
   * 中：像素比 ≤1.25 + 阴影 512
   * 低：像素比 1 + 关阴影 + 关一盏点光（帧率优先）
   * 自动：进入后采样 3 秒，平均帧率 <45 自动降到"低" */
  type QualityLevel = 'high' | 'medium' | 'low';
  // 默认"中"：无阴影 + Lambert 材质 + 像素预算，保证弱显卡也能跑起来
  const storedQuality = localStorage.getItem('jg.slice3d.quality');
  let qualityLevel: QualityLevel =
    storedQuality === 'high' || storedQuality === 'medium' || storedQuality === 'low' ? storedQuality : 'medium';
  /** 最大渲染像素数：不随屏幕变大而爆炸（弱显卡的关键保护） */
  const PIXEL_BUDGET: Record<QualityLevel, number> = { high: 2_100_000, medium: 1_000_000, low: 520_000 };
  // 材质档位在建场景前决定：只有高画质用 PBR(Standard)，其余用 Lambert
  useStandardMaterials = qualityLevel === 'high';
  // 最低画质直接用无光照材质（着色器最简单）——给驱动减压，减少挂起概率
  unlitMaterials = qualityLevel === 'low';
  /** 首次进入（没有存过画质）时启用自动降档 */
  let autoQuality = storedQuality === null;

  /* ---------------- 难度（需求①：影响战术丰富度） ---------------- */
  const DIFF_KEY = 'jg.slice3d.diff';
  let sliceDiff = localStorage.getItem(DIFF_KEY) ?? 'normal';
  const tactics = () =>
    TACTICS[sliceDiff] ?? TACTICS.normal;
  const refreshDiffButtons = (): void => {
    diffRow.querySelectorAll<HTMLButtonElement>('[data-diff]').forEach((b) => {
      b.classList.toggle('is-on', b.dataset.diff === sliceDiff);
    });
  };
  refreshDiffButtons();
  diffRow.querySelectorAll<HTMLButtonElement>('[data-diff]').forEach((b) => {
    b.addEventListener('click', () => {
      sliceDiff = b.dataset.diff ?? 'normal';
      localStorage.setItem(DIFF_KEY, sliceDiff);
      refreshDiffButtons();
      showBanner(`难度：${DIFFICULTIES.find((d) => d.id === sliceDiff)?.name ?? sliceDiff}`);
    });
  });

  /* ---------------- 主页单元③④：灵敏度 / 准星设置（真实生效 + 刷新后保持） ----------------
   * 这两块不是"摆设面板"：
   *   - 灵敏度直接决定鼠标转视角的角度换算（onMouseMove 读的就是 sensProfile）
   *   - 准星设置写进容器上的 CSS 变量，游戏内准星和主页预览共用同一套变量
   */
  const SENS_KEY = 'jg.slice3d.sens';
  const CH_KEY = 'jg.slice3d.crosshair';
  const readStore = <T,>(key: string): T | null => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  };
  const writeStore = (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // 存储被禁用也不影响本次设置生效
    }
  };
  /** 当前灵敏度档：脏数据/越界值一律被 clampSens 夹回合法区间 */
  let sensProfile: SensitivityProfile = clampSens(readStore<Partial<SensitivityProfile>>(SENS_KEY));
  let crosshair: CrosshairStyle = clampCrosshair(readStore<Partial<CrosshairStyle>>(CH_KEY));

  const sensRangeEl = container.querySelector<HTMLInputElement>('#s3-sens')!;
  const sensValEl = container.querySelector<HTMLElement>('#s3-sens-val')!;
  const dpiEl = container.querySelector<HTMLInputElement>('#s3-dpi')!;
  const sensOutEl = container.querySelector<HTMLElement>('#s3-sens-out')!;
  const presetRow = container.querySelector<HTMLElement>('#s3-preset-row')!;
  const chColorsEl = container.querySelector<HTMLElement>('#s3-ch-colors')!;
  const chSizeEl = container.querySelector<HTMLInputElement>('#s3-ch-size')!;
  const chGapEl = container.querySelector<HTMLInputElement>('#s3-ch-gap')!;
  const chThickEl = container.querySelector<HTMLInputElement>('#s3-ch-thick')!;
  const chSizeVal = container.querySelector<HTMLElement>('#s3-ch-size-val')!;
  const chGapVal = container.querySelector<HTMLElement>('#s3-ch-gap-val')!;
  const chThickVal = container.querySelector<HTMLElement>('#s3-ch-thick-val')!;
  const chDotBtn = container.querySelector<HTMLButtonElement>('#s3-ch-dot')!;
  const chOutlineBtn = container.querySelector<HTMLButtonElement>('#s3-ch-outline')!;

  /** 准星设置 → 容器 CSS 变量（游戏内准星 + 主页预览同时生效） */
  const applyCrosshair = (): void => {
    const vars = crosshairVars(crosshair);
    for (const [k, v] of Object.entries(vars)) container.style.setProperty(k, v);
  };
  const refreshSensUI = (): void => {
    sensRangeEl.value = String(sensProfile.sens);
    sensValEl.textContent = sensProfile.sens.toFixed(2);
    dpiEl.value = String(sensProfile.dpi);
    presetRow
      .querySelectorAll<HTMLButtonElement>('[data-preset]')
      .forEach((b) => b.classList.toggle('is-on', b.dataset.preset === sensProfile.preset));
    sensOutEl.textContent = `换算：${sensSummary(sensProfile)}`;
  };
  const refreshChUI = (): void => {
    chSizeEl.value = String(crosshair.size);
    chGapEl.value = String(crosshair.gap);
    chThickEl.value = String(crosshair.thickness);
    chSizeVal.textContent = String(crosshair.size);
    chGapVal.textContent = String(crosshair.gap);
    chThickVal.textContent = String(crosshair.thickness);
    chDotBtn.classList.toggle('is-on', crosshair.dot);
    chOutlineBtn.classList.toggle('is-on', crosshair.outline);
    chColorsEl
      .querySelectorAll<HTMLButtonElement>('.s3-swatch')
      .forEach((b) => b.classList.toggle('is-on', (b.dataset.color ?? '').toLowerCase() === crosshair.color.toLowerCase()));
    applyCrosshair();
  };

  presetRow.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((b) => {
    b.addEventListener('click', () => {
      sensProfile = withPreset(sensProfile, b.dataset.preset === 'valorant' ? 'valorant' : 'cs2');
      writeStore(SENS_KEY, sensProfile);
      refreshSensUI();
    });
  });
  sensRangeEl.addEventListener('input', () => {
    sensProfile = clampSens({ ...sensProfile, sens: Number(sensRangeEl.value) });
    writeStore(SENS_KEY, sensProfile);
    refreshSensUI();
  });
  dpiEl.addEventListener('change', () => {
    sensProfile = clampSens({ ...sensProfile, dpi: Number(dpiEl.value) });
    writeStore(SENS_KEY, sensProfile);
    refreshSensUI();
  });
  chColorsEl.querySelectorAll<HTMLButtonElement>('.s3-swatch').forEach((b) => {
    b.addEventListener('click', () => {
      crosshair = clampCrosshair({ ...crosshair, color: b.dataset.color });
      writeStore(CH_KEY, crosshair);
      refreshChUI();
    });
  });
  chSizeEl.addEventListener('input', () => {
    crosshair = clampCrosshair({ ...crosshair, size: Number(chSizeEl.value) });
    writeStore(CH_KEY, crosshair);
    refreshChUI();
  });
  chGapEl.addEventListener('input', () => {
    crosshair = clampCrosshair({ ...crosshair, gap: Number(chGapEl.value) });
    writeStore(CH_KEY, crosshair);
    refreshChUI();
  });
  chThickEl.addEventListener('input', () => {
    crosshair = clampCrosshair({ ...crosshair, thickness: Number(chThickEl.value) });
    writeStore(CH_KEY, crosshair);
    refreshChUI();
  });
  chDotBtn.addEventListener('click', () => {
    crosshair = clampCrosshair({ ...crosshair, dot: !crosshair.dot });
    writeStore(CH_KEY, crosshair);
    refreshChUI();
  });
  chOutlineBtn.addEventListener('click', () => {
    crosshair = clampCrosshair({ ...crosshair, outline: !crosshair.outline });
    writeStore(CH_KEY, crosshair);
    refreshChUI();
  });
  // 场景单元：切换场景要按新尺寸重建整个房间，所以保存后重载一次（最稳、不会留下半旧状态）
  container.querySelectorAll<HTMLButtonElement>('#s3-scene-row [data-scene]').forEach((b) => {
    b.addEventListener('click', () => {
      const id = b.dataset.scene ?? DEFAULT_SCENE_ID;
      if (id === SCENE.id) {
        showBanner(`场景：${SCENE.name}`);
        return;
      }
      try {
        localStorage.setItem('jg.slice3d.scene', id);
      } catch {
        // 存不进去也不影响本意：下面直接重载也会读不到，最差是留在原场景
      }
      const next = sceneById(id);
      showBanner(`场景切换到「${next.name}」，正在重建…`);
      window.setTimeout(() => window.location.reload(), 550);
    });
  });
  refreshSensUI();
  refreshChUI();

  /* ---------------- 战斗画面：窗口内 / 进入战斗自动全屏 ---------------- */
  const FS_KEY = 'jg.slice3d.autofullscreen';
  /** 默认开启：进战斗就占满整个屏幕（演练时的视野越大越接近真实对枪） */
  let autoFullscreen = true;
  try {
    autoFullscreen = localStorage.getItem(FS_KEY) !== 'window';
  } catch {
    autoFullscreen = true;
  }
  const fsRow = container.querySelector<HTMLElement>('#s3-fs-row')!;
  const refreshFsUI = (): void => {
    fsRow
      .querySelectorAll<HTMLButtonElement>('[data-fs]')
      .forEach((b) => b.classList.toggle('is-on', (b.dataset.fs === 'auto') === autoFullscreen));
  };
  fsRow.querySelectorAll<HTMLButtonElement>('[data-fs]').forEach((b) => {
    b.addEventListener('click', () => {
      autoFullscreen = b.dataset.fs === 'auto';
      try {
        localStorage.setItem(FS_KEY, autoFullscreen ? 'auto' : 'window');
      } catch {
        // 存不进去也只影响下次进入，本次照常生效
      }
      refreshFsUI();
      showBanner(autoFullscreen ? '战斗画面：进入时自动全屏' : '战斗画面：只在窗口内');
    });
  });
  refreshFsUI();

  /* ---------------- Three.js 初始化 ---------------- */
  // 抗锯齿（MSAA）在弱显卡/软件渲染路径上非常贵：只有高画质才开
  // powerPreference 请求独显（双显卡笔记本默认可能用核显，这是"配置很好却卡"的常见元凶）
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: qualityLevel === 'high',
  });
  // —— 真实渲染器诊断：浏览器到底用的是显卡，还是 CPU 软件光栅化 ——
  // （核显/软件渲染是"配置很好却卡"的头号元凶，HUD 会把它显出来）
  const glCtx = renderer.getContext();
  const dbgInfo = glCtx.getExtension('WEBGL_debug_renderer_info');
  const gpuName = String(
    dbgInfo ? glCtx.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL) : glCtx.getParameter(glCtx.RENDERER),
  );
  const gpuIsSoftware = /swiftshader|software|basic render|llvmpipe|microsoft basic/i.test(gpuName);

  // 性能关键点①：像素比。高 DPI 屏上 2× 像素比 = 4 倍像素填充，是"卡"的头号原因
  renderer.setPixelRatio(1);
  // 阴影在初始化时一次决定：运行中切换会触发全材质着色器重编译（表现为"画面卡住"）
  renderer.shadowMap.enabled = qualityLevel === 'high';
  // 性能关键点②：PCFSoft 是最贵的阴影过滤，改成 PCF
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0f12);
  // 长地图的雾必须推远，否则 30m 外的敌人会直接糊掉——这是"远距离交战"的前提
  scene.fog = new THREE.Fog(0x0d0f12, SCENE.fog.near, SCENE.fog.far);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.05, 200);
  camera.position.set(SCENE.player.x, CONFIG.eyeHeight, SCENE.player.z);
  camera.rotation.order = 'YXZ';

  // 光照：环境 + 半球 + 右侧暖色主光（带阴影）+ 门口点光
  scene.add(new THREE.AmbientLight(0x8a8578, 0.35));
  scene.add(new THREE.HemisphereLight(0xffe0b0, 0x1a1d22, 0.45));
  const sun = new THREE.DirectionalLight(0xffd2a0, 1.15);
  sun.position.set(7.5, 5.5, 3.5);
  sun.castShadow = qualityLevel === 'high';
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 40;
  sun.shadow.camera.left = -12;
  sun.shadow.camera.right = 12;
  sun.shadow.camera.top = 10;
  sun.shadow.camera.bottom = -6;
  scene.add(sun);
  const doorLight = new THREE.PointLight(0xffc98a, 6, 14, 2);
  doorLight.position.set(0, 2.4, SCENE.door.z - 0.4);
  scene.add(doorLight);

  const room = buildRoom(SCENE);
  scene.add(room.root);

  /* ---------------- 实体碰撞（掩体/墙体：挡人 + 挡子弹） ----------------
   * 从场景真实网格计算 AABB，玩家与敌人都用同一套碰撞盒做 XZ 平面推挤，
   * 子弹则在 room.walls 上做射线（掩体是实体，打上去留弹孔）。 */
  let colliders: THREE.Box3[] = [];
  const rebuildColliders = (): void => {
    colliders = room.walls.map((m) => new THREE.Box3().setFromObject(m));
  };
  /**
   * 实际可用的敌人刷新点 = 场景固定点 + 每局随机追加点。
   * 随机点在 buildRoom 之后生成（见 addProceduralCovers），所以这里只放固定点。
   */
  const spawnPoints: SceneSpawn[] = [...SCENE.spawns];
  /** 把圆柱体（半径 radius）推出所有碰撞盒；返回累计推出向量（供"沿面滑动"使用） */
  const resolveXZ = (pos: THREE.Vector3, radius: number): THREE.Vector3 => {
    const pushAccum = new THREE.Vector3();
    for (const box of colliders) {
      // 只考虑与身体高度重叠的碰撞盒：
      // 否则门楣（2.3~3.2m 高）会把门洞"封死"，敌人被卡在门口出不来
      if (box.min.y > CONFIG.eyeHeight + 0.15 || box.max.y < 0.05) continue;
      const cx = Math.max(box.min.x, Math.min(pos.x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(pos.z, box.max.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 > radius * radius) continue;
      if (d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const k = (radius - d) / d;
        pos.x += dx * k;
        pos.z += dz * k;
        pushAccum.x += dx * k;
        pushAccum.z += dz * k;
      } else {
        // 圆心已在盒内：沿最小穿透轴推出
        const toMinX = pos.x - box.min.x;
        const toMaxX = box.max.x - pos.x;
        const toMinZ = pos.z - box.min.z;
        const toMaxZ = box.max.z - pos.z;
        const minPen = Math.min(toMinX, toMaxX, toMinZ, toMaxZ);
        if (minPen === toMinX) {
          pushAccum.x -= box.min.x - radius - pos.x;
          pos.x = box.min.x - radius;
        } else if (minPen === toMaxX) {
          pushAccum.x += box.max.x + radius - pos.x;
          pos.x = box.max.x + radius;
        } else if (minPen === toMinZ) {
          pushAccum.z -= box.min.z - radius - pos.z;
          pos.z = box.min.z - radius;
        } else {
          pushAccum.z += box.max.z + radius - pos.z;
          pos.z = box.max.z + radius;
        }
      }
    }
    return pushAccum;
  };
  /** 找到离给定点最近的掩体碰撞盒（用于把刷新点放到掩体背面外侧） */
  const nearestCollider = (x: number, z: number): THREE.Box3 | null => {
    let best: THREE.Box3 | null = null;
    let bestD = 4;
    for (const b of colliders) {
      const c = b.getCenter(new THREE.Vector3());
      const d = Math.hypot(c.x - x, c.z - z);
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    }
    return best;
  };
  /** 把点沿"远离玩家"方向外推，直到离开掩体碰撞盒并留出一个身位半径 */
  const pushBehindCover = (x: number, z: number, radius: number): THREE.Vector3 => {
    const box = nearestCollider(x, z);
    const p = new THREE.Vector3(x, 0, z);
    if (!box) return p;
    const away = new THREE.Vector3(x - camera.position.x, 0, z - camera.position.z);
    if (away.lengthSq() < 1e-4) away.set(0, 0, 1);
    away.normalize();
    for (let i = 0; i < 60; i++) {
      const inside =
        p.x > box.min.x - radius &&
        p.x < box.max.x + radius &&
        p.z > box.min.z - radius &&
        p.z < box.max.z + radius;
      if (!inside) break;
      p.addScaledVector(away, 0.08);
    }
    return p;
  };

  /* ---------------- 玩家掩体（可开关） ---------------- */
  const COVER_KEY = 'jg.slice3d.cover';
  const coverState = { on: (localStorage.getItem(COVER_KEY) ?? 'on') !== 'off' };
  let playerCoverMeshes: THREE.Mesh[] = [];

  /** 生成 / 移除玩家侧掩体（半高墙，蹲下可完全藏住） */
  const applyCoverSetting = (): void => {
    // 先清理旧掩体
    for (const m of playerCoverMeshes) {
      scene.remove(m);
      const idx = room.walls.indexOf(m);
      if (idx >= 0) room.walls.splice(idx, 1);
    }
    playerCoverMeshes = [];

    if (coverState.on) {
      const c = SCENE.playerCover;
      const mat = makeMat({ color: 0x8a8172, roughness: 0.92 });
      const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(c.w, c.h, c.d), mat);
      wallMesh.position.set(c.x, c.h / 2, c.z);
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      wallMesh.userData.isPlayerCover = true;
      scene.add(wallMesh);
      playerCoverMeshes.push(wallMesh);
      room.walls.push(wallMesh); // 加入射线目标：玩家子弹会打在掩体上留弹孔
    }
    coverOnBtn.classList.toggle('is-on', coverState.on);
    coverOffBtn.classList.toggle('is-on', !coverState.on);
    localStorage.setItem(COVER_KEY, coverState.on ? 'on' : 'off');
    rebuildColliders(); // 掩体是实体：增删后同步碰撞盒
  };
  applyCoverSetting();

  /**
   * 敌人视线判定（**修 bug**：原来这里只检查"玩家自己那块半高墙"，
   * 导致玩家躲到木箱/水泥墙/侧墙后面照样被打——主观感受就是"穿墙打我"。
   * 而且玩家掩体开关一旦关掉，这里直接 return true，等于全图无遮挡）。
   *
   * 现在改成：对**所有实体**（墙体 + 所有掩体 + 玩家掩体）做遮挡判定，
   * 并且射线起点用敌人**真实的头部高度**（站立约 1.57m / 蹲下约 1.34m），
   * 避免出现"它自己明明被掩体挡着、却能一枪打过来"的穿墙观感。
   */
  const losRay = new THREE.Raycaster();
  const enemyHasLineOfSight = (): boolean => {
    const g = enemy.group;
    const eyeY = g.position.y + 1.63 * g.scale.y;
    const from = _v1.set(g.position.x, eyeY, g.position.z);
    const dir = _v2.copy(camera.position).sub(from);
    const dist = dir.length();
    losRay.set(from, dir.normalize());
    losRay.far = dist;
    return losRay.intersectObjects(room.walls, false).length === 0;
  };

  // 复用的临时向量：避免每帧 new 出一堆 Vector3（减少 GC 抖动/卡顿）
  const _v1 = new THREE.Vector3();
  const _v2 = new THREE.Vector3();
  const _v3 = new THREE.Vector3();
  const _v4 = new THREE.Vector3();

  /* ---------------- 敌人移动模型（更正版） ----------------
   * 目标不是"走向玩家"，而是**把枪线挪到玩家身上**：
   *   · 以掩体为支点做横向侧步，找到"能看到玩家"的位置
   *   · 全程身体与枪口朝玩家（不是朝移动方向）
   *   · 撞到实体沿面滑动，卡住则换下一个候选枪线位 */
  const enemyLineClear = (x: number, z: number): boolean => {
    // 与 enemyHasLineOfSight 用同一套判定与同一高度（敌人真实头部高度）
    const g = enemy.group;
    const from = _v1.set(x, g.position.y + 1.63 * g.scale.y, z);
    const dir = _v2.copy(camera.position).sub(from);
    const dd = dir.length();
    losRay.set(from, dir.normalize());
    losRay.far = dd;
    return losRay.intersectObjects(room.walls, false).length === 0;
  };
  const facePlayer = (): void => {
    const g = enemy.group;
    // 需求⑦-F：预瞄带提前量——枪线指向"玩家接下来会在的位置"，而不是他此刻站的地方。
    // 你横向移动时最明显（枪口总是稍微提前压着你），停下来的瞬间他就回到你身上。
    const t = tactics();
    const lead = playerVel.lengthSq() > 0.16 ? t.lead : 0;
    const dx = camera.position.x + playerVel.x * lead - g.position.x;
    const dz = camera.position.z + playerVel.z * lead - g.position.z;
    if (Math.hypot(dx, dz) < 0.05) return;
    g.rotation.y = Math.atan2(dx, dz) + Math.PI;
  };
  /** 走向某点：带碰撞滑动；返回是否已到达。全程朝玩家 + 走路动画 */
  const moveEnemyTo = (target: THREE.Vector3, speed: number, dt: number): boolean => {
    const g = enemy.group;
    const dir = _v1.set(target.x - g.position.x, 0, target.z - g.position.z);
    const dist = dir.length();
    if (dist < 0.15) return true;
    dir.normalize();
    g.position.addScaledVector(dir, speed * dt);
    const push = resolveXZ(g.position, 0.4);
    if (push.lengthSq() > 1e-6) {
      const n = _v2.copy(push).normalize();
      const tang = _v3.copy(dir).sub(_v4.copy(n).multiplyScalar(dir.dot(n)));
      if (tang.lengthSq() > 1e-6) g.position.addScaledVector(tang.normalize(), speed * dt * 0.85);
    }
    facePlayer();
    enemyAI.walkPhase += dt * 7;
    const swing = Math.sin(enemyAI.walkPhase) * 0.5;
    enemy.leftLeg.rotation.x = swing;
    enemy.rightLeg.rotation.x = -swing;
    enemy.leftArm.rotation.x = -swing * 0.5;
    enemy.rightArm.rotation.x = swing * 0.5;
    if (!enemyAI.crouch && g.scale.y < 1) {
      g.scale.y = Math.min(1, g.scale.y + dt * 2.2);
      g.position.y = -0.06 * (1 - g.scale.y) / 0.14;
    }
    return false;
  };
  /** 找"枪线位"：沿掩体两侧横移取样，挑能看见玩家且横移最短的点 */
  const findFiringSpot = (): THREE.Vector3 => {
    const g = enemy.group;
    const box = nearestCollider(g.position.x, g.position.z);
    const base = box ? box.getCenter(new THREE.Vector3()) : g.position.clone();
    const halfX = box ? (box.max.x - box.min.x) / 2 : 0.6;
    const candidates: THREE.Vector3[] = [];
    for (const sx of [-1, 1]) {
      for (const d of [0.7, 1.2, 1.8]) {
        candidates.push(new THREE.Vector3(base.x + sx * (halfX + d), 0, g.position.z));
      }
    }
    // 允许向玩家方向少量探出（≤1m），但绝不贴身
    const toward = new THREE.Vector3(
      camera.position.x - g.position.x,
      0,
      camera.position.z - g.position.z,
    ).normalize();
    candidates.push(g.position.clone().addScaledVector(toward, 1.0));
    const usable = candidates.filter(
      (c) =>
        enemyLineClear(c.x, c.z) &&
        resolveXZ(c.clone(), 0.42).lengthSq() < 1e-6 &&
        !enemyAI.badSpots.some((b) => b.distanceTo(c) < 0.7),
    );
    const pool = usable.length > 0 ? usable : candidates;
    pool.sort((a, b) => a.distanceTo(g.position) - b.distanceTo(g.position));
    return pool[0];
  };

  /* -------- 需求①：刷新必须在玩家视线之外（被掩体挡住）且离玩家足够远 -------- */
  const spawnRay = new THREE.Raycaster();
  /**
   * 玩家能否看到该点（需求①核心：**必须是掩体/墙实体挡住**才允许刷新）
   * 只用遮挡判定：从玩家眼睛（真实相机高度，蹲下更低）向该点打多条射线，
   * 只要有任意一条不被挡，就说明玩家能直接看到 → 该点不能用来刷新。
   */
  const isVisibleFromPlayer = (pos: THREE.Vector3): boolean => {
    const target = new THREE.Vector3(pos.x, CONFIG.spawn.headHeight, pos.z);
    const eye = camera.position.clone();
    const samples = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.35, 0, 0),
      new THREE.Vector3(-0.35, 0, 0),
      new THREE.Vector3(0, 0.2, 0),
    ];
    for (const off of samples) {
      const from = eye.clone().add(off);
      const d = target.clone().sub(from);
      const dd = d.length();
      spawnRay.set(from, d.normalize());
      spawnRay.far = dd;
      if (spawnRay.intersectObjects(room.walls, false).length === 0) return true;
    }
    return false;
  };
  /**
   * 挑选合法刷新点：视线外 + 距离 ≥ 4 米 + 难度允许的距离档位；
   * 都不满足时退化为"背墙后的门后点"（墙通高，任何站姿都挡得住）。
   * 档位过滤是"长地图"的关键：低难度只从近掩体拉出，高难度才用 30m+ 的远掩体。
   */
  const pickSpawnPoint = (): { x: number; z: number; id: string; fallback: boolean } => {
    const px = camera.position.x;
    const pz = camera.position.z;
    const valid = spawnPoints.filter((c) => {
      // 硬性规则：只在玩家**正面**刷新（至少 1.5m 在前方），杜绝"从背后冒出来"
      if (c.z > pz - 1.5) return false;
      if (Math.hypot(c.x - px, c.z - pz) < CONFIG.spawn.minDistance) return false;
      return !isVisibleFromPlayer(new THREE.Vector3(c.x, 0, c.z));
    });
    // 兜底：若没有任何点通过严格遮挡测试，就固定用"背墙后的门后点"——
    // 墙是通高的，任何站姿/蹲姿都挡得住，绝不会刷在玩家眼前
    const behindWall = spawnPoints.filter((c) => c.z <= SCENE.door.z);
    // 三级兜底，任何情况下都不能让 pool 为空（会直接崩在 pick.x 上）
    const pool = valid.length > 0 ? valid : behindWall.length > 0 ? behindWall : spawnPoints;
    // 难度决定"远近概率分布"，不决定"有哪些点"——所有点都有机会出现
    const weights = pool.map((c) => tierWeight(sliceDiff, c.tier));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let pick = pool[pool.length - 1];
    for (let i = 0; i < pool.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        pick = pool[i];
        break;
      }
    }
    return { ...pick, fallback: valid.length === 0 };
  };

  /**
   * 每局随机追加掩体（=额外刷新点）。
   *
   * 为什么要做：固定刷新点背下来之后，玩家只剩"我记住那两个角度"的机械反应，
   * 练不出"随时处理新角度"的能力，也容易腻。每次进入随机撒几个新掩体，
   * 位置仍然受严格约束，保证不会出现"敌人卡死/凭空出现/挡死枪线"：
   *   · 在走廊宽度内、离侧墙 ≥3.6m（敌人要能横拉出身位）
   *   · 离已有掩体 ≥minGap（互相挡枪线会卡住 AI）
   *   · 不堵门洞正面通道
   *   · 站在掩体后必须被完全遮挡（复用 isVisibleFromPlayer 做射线验证，不合格就撤掉）
   *   · 掩体高度 ≥1.9m（站立敌人也能完全藏住）
   */
  const addProceduralCovers = (): number => {
    const proc = SCENE.proc;
    if (!proc || proc.count <= 0) return 0;
    const halfW = SCENE.room.w / 2;
    const zNear = SCENE.player.z - proc.minDist;
    const zFar = SCENE.player.z - proc.maxDist;
    if (zNear <= zFar) return 0;
    const procMat = makeMat({ color: SCENE.colors.prop, roughness: 0.86 });
    const placed = SCENE.props.map((p) => ({ x: p.x, z: p.z }));
    let added = 0;
    for (let attempt = 0; attempt < proc.count * 40 && added < proc.count; attempt++) {
      const z = zFar + Math.random() * (zNear - zFar);
      const xLimit = halfW - 3.6;
      const x = -xLimit + Math.random() * xLimit * 2;
      if (Math.abs(x) < proc.keepDoor && z < SCENE.door.z + 14) continue; // 门洞通道
      if (placed.some((p) => Math.hypot(p.x - x, p.z - z) < proc.minGap)) continue;

      const w = 1.8 + Math.random() * 0.7;
      const h = 1.9 + Math.random() * 0.25;
      const d = 1.3 + Math.random() * 0.5;
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), procMat);
      m.position.set(x, h / 2, z);
      m.castShadow = true;
      m.receiveShadow = true;
      m.userData.isCover = true;
      room.root.add(m);
      room.walls.push(m);
      rebuildColliders();
      // 射线验证：这块掩体必须真的挡住玩家视线，否则说明它挡不住人，撤掉
      if (isVisibleFromPlayer(new THREE.Vector3(x, 0, z))) {
        room.root.remove(m);
        const idx = room.walls.indexOf(m);
        if (idx >= 0) room.walls.splice(idx, 1);
        rebuildColliders();
        continue;
      }
      const dist = Math.hypot(x - SCENE.player.x, z - SCENE.player.z);
      const tier: 0 | 1 | 2 | 3 = dist < 18 ? 0 : dist < 25 ? 1 : dist < 32 ? 2 : 3;
      spawnPoints.push({ id: `随机位${added + 1}`, x, z, tier });
      placed.push({ x, z });
      added++;
    }
    return added;
  };
  const procAdded = addProceduralCovers();
  // 场景卡上补"刷新点数量"（随机追加是每局变的，只能生成后写进去）
  const activeSceneEm = container.querySelector<HTMLElement>(
    `#s3-scene-row [data-scene="${SCENE.id}"] .s3-scene-txt em`,
  );
  if (activeSceneEm) {
    activeSceneEm.innerHTML = `${SCENE.desc}<br>${SCENE.range}　·　刷新点 ${SCENE.spawns.length} 固定${procAdded > 0 ? ` + ${procAdded} 随机` : ''}`;
  }

  // 第一人称步枪：挂到相机上（-Z 为枪口方向），做右下角偏移
  const rifle = buildRifle();
  rifle.position.set(0.16, -0.17, -0.34);
  rifle.rotation.set(0, 0.04, 0);
  camera.add(rifle);
  scene.add(camera);

  // 换弹动画要单独驱动的部件（记录基准变换，动画只做偏移）
  const magPart = rifle.getObjectByName('mag') as THREE.Mesh;
  const chargingPart = rifle.getObjectByName('charging') as THREE.Mesh;
  const magBase = magPart.position.clone();
  const magBaseRotX = magPart.rotation.x;
  const chargingBase = chargingPart.position.clone();

  // 枪口火光
  const flash = new THREE.PointLight(0xffd27a, 0, 6, 2);
  flash.position.set(0, 0.01, -1.58);
  rifle.add(flash);
  const flashMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.09, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0 }),
  );
  flashMesh.position.set(0, 0.01, -1.58);
  rifle.add(flashMesh);

  /* ---------------- 敌人 ---------------- */
  // 敌人实例池：开局前就把 N 个敌人建好并预热（避免运行中新建对象/现场编译着色器）
  let enemy = buildEnemy();
  scene.add(enemy.group);
  const enemyPool: ReturnType<typeof buildEnemy>[] = [enemy];
  let enemyPoolIndex = 0;

  /** 受击闪红：Standard 与 Lambert 材质都支持 emissive，这里统一安全处理 */
  const flashEnemyMats = (hex: number): void => {
    for (const m of enemy.materials) {
      const emissive = (m as THREE.MeshStandardMaterial).emissive;
      if (emissive) emissive.setHex(hex);
    }
  };

  type EnemyState = 'hidden' | 'feinting' | 'walking' | 'aiming' | 'dead';
  const enemyAI = {
    state: 'hidden' as EnemyState,
    hp: DAMAGE.maxHp,
    timer: 0,
    peekTargetX: 0,
    peekPos: new THREE.Vector3(0, 0, 0),
    coverName: '',
    crouch: false,
    aimPose: 0,
    blocked: 0,
    speedJitter: 1,
    strafeShoot: false,
    strafeDir: 1,
    strafeSeconds: 0,
    /** 本次拉出的身位（米）——从难度表 peekSet 里按档位抽，不是连续随机 */
    peekOffset: 1.0,
    /** 下一次横移变向的倒计时（高手对枪不会匀速直线走） */
    strafeNextChange: 0.4,
    /** 横移中急停的剩余时间（counter-strafe 节奏） */
    strafePauseT: 0,
    /** 急停里等了多久（等太久就不等了，保证一定会开枪） */
    strafeWaitT: 0,
    /** 蹲起：这一蹲还要蹲多久 */
    crouchHold: 0,
    /** 出手节奏系数：<1 秒拉 / 1 正常 / >1 长架 */
    paceFactor: 1,
    /** 本局在这个敌人身上打中的次数（E2 折中：第 1、3 枪后缩回） */
    bodyHits: 0,
    /** 同一个身位挨了几次（第三次起强制换大身位横拉） */
    sameOffsetHits: 0,
    canChangeCover: false,
    feintPlan: false,
    feintPhase: 0,
    feintPos: new THREE.Vector3(),
    /** 双段假动作第二次探出的位置（极限难度） */
    feintPos2: new THREE.Vector3(),
    coverPos: new THREE.Vector3(),
    waypoint: null as THREE.Vector3 | null,
    path: [] as THREE.Vector3[],
    firingSpot: null as THREE.Vector3 | null,
    badSpots: [] as THREE.Vector3[],
    stallT: 0,
    /** 跟随路径点时的"无进展计时"（防止敌人被掩体挡住后永远卡在走路状态） */
    pathStallT: 0,
    counters: { feints: 0, coverChanges: 0, repeeks: 0, strafeReversals: 0, crouchToggles: 0, wideSwings: 0 },
    dieProgress: 0,
    walkPhase: 0,
  };
  /**
   * 需求⑦-A：抽一个"身位"。
   * 高手拉枪不是随便挑个距离，而是半个 / 一个 / 一个半 / 一大段身位这种离散档位；
   * wide=true（假动作之后那一下真正的横拉）时明显偏向最大身位。
   */
  const pickPeekOffset = (wide = false): number => {
    const t = tactics();
    const set = t.peekSet;
    if (!set || set.length === 0) return 1.0;
    if (wide && Math.random() < Math.max(t.wideBias, 0.5)) return set[set.length - 1];
    return set[Math.floor(Math.random() * set.length)];
  };
  /**
   * 需求⑦-E：玩家这一枪"擦到/打中"敌人的信号——由 shoot() 累加，AI 下一帧消费。
   * 高手不会原地重复同一个身位等你打第四枪，而是缩回掩体换个角度再来（re-peek）。
   */
  let pendingThreat = 0;
  /** 复用向量：命中判定里算"子弹离身体多近"，避免每次开枪新建对象 */
  const threatPoint = new THREE.Vector3();
  /** 最近一次刷新的合法性（供自动化验证读取） */
  let lastSpawn = {
    seq: 0,
    visible: true,
    distance: 0,
    cover: '',
    difficulty: 'normal',
    fallback: false,
    cameraY: 0,
    x: 0,
    z: 0,
  };

  /** 让敌人从门后出现在门内（隐藏 → 走出门洞） */
  const resetEnemy = (): void => {
    // 从预热好的池里轮换取下一个敌人（运行时不再新建对象）
    if (enemyPool.length > 1) {
      enemyPoolIndex = (enemyPoolIndex + 1) % enemyPool.length;
      enemy = enemyPool[enemyPoolIndex];
      for (const e of enemyPool) if (e !== enemy) e.group.visible = false;
    }
    const t = tactics();
    // 需求①：只在视线之外、且离玩家 ≥4 米的位置刷新
    const cover = pickSpawnPoint();
    // 需求⑦-A：身位按档位抽（半个 / 一个 / 一个半 / 一大段）
    const offset = pickPeekOffset(Math.random() < t.wideBias);
    const side = Math.random() < 0.5 ? -1 : 1;
    enemyAI.state = 'hidden';
    enemyAI.hp = DAMAGE.maxHp;
    enemyAI.timer = 0.6 + Math.random() * 1.6; // 出现前的随机等待
    enemyAI.coverName = cover.id;
    logEvent(`敌人刷新：${cover.id}（难度 ${sliceDiff}）`);
    enemyAI.crouch = Math.random() < t.crouch;
    enemyAI.speedJitter = 1 + (Math.random() * 2 - 1) * t.jitter;
    enemyAI.strafeShoot = t.strafeShoot;
    enemyAI.canChangeCover = t.coverChange;
    enemyAI.strafeSeconds = 0;
    enemyAI.peekOffset = offset;
    enemyAI.strafeNextChange = 0.25 + Math.random() * 0.45;
    enemyAI.strafePauseT = 0;
    enemyAI.strafeWaitT = 0;
    enemyAI.crouchHold = 0;
    enemyAI.bodyHits = 0;
    enemyAI.sameOffsetHits = 0;
    // 需求⑦-G：出手节奏（秒拉 / 正常 / 长架），避免玩家摸到固定节拍
    const paceRoll = Math.random();
    enemyAI.paceFactor = paceRoll < t.paceRush ? 0.62 : paceRoll < t.paceRush + t.paceHold ? 1.45 : 1;
    pendingThreat = 0;
    // 需求⑦-B：困难起先做假动作（小身位探一下再缩回），才真正拉出；
    // 极限难度是"双段假动作"，每次都做
    enemyAI.feintPlan = t.feint && (t.feintDouble || Math.random() < 0.65);
    enemyAI.feintPhase = 0;
    enemyAI.aimPose = 0;
    enemyAI.blocked = 0;
    // 需求①：把刷新点放到"掩体背面外侧"（基于真实碰撞盒外推，保证站在掩体后且不穿模）
    const behind = pushBehindCover(cover.x, cover.z, 0.42);
    const spawnX = behind.x;
    const spawnZ = behind.z;
    // 从掩体后拉出：横向一个身位 + 朝玩家方向走出一段
    enemyAI.coverPos.set(spawnX, 0, spawnZ);
    // 拉出方向：永远朝玩家一侧（避免从掩体后往更远处跑）
    const toward = Math.sign(camera.position.z - spawnZ) || 1;
    enemyAI.peekTargetX = cover.x + side * offset;
    enemyAI.peekPos.set(enemyAI.peekTargetX, 0, cover.z + toward * (0.9 + Math.random() * 0.8));
    enemyAI.feintPos.set(cover.x + side * 0.35, 0, cover.z + toward * 0.35);
    // 双段假动作的第二个探出点：更深一点，两次探出的"身位"明显不同
    enemyAI.feintPos2.set(cover.x + side * 0.6, 0, cover.z + toward * 0.72);
    // 门后刷新：先穿过门洞再拉出（否则会穿墙）
    // 路径规划（关键修复：不能直线穿掩体，否则会被碰撞卡死）
    //  - 门后刷新：先走到门洞中线，再出门口拉出
    //  - 其他掩体：先横移到掩体侧面边缘，再从侧面走出来（也正好是"横拉出掩体"的观感）
    const path: THREE.Vector3[] = [];
    if (cover.z <= SCENE.door.z) {
      // 门后刷新：先走到门洞中线（z = 门洞平面），再出门口拉出
      path.push(new THREE.Vector3(0, 0, SCENE.door.z));
    } else {
      const box = nearestCollider(spawnX, spawnZ);
      if (box) {
        const c = box.getCenter(new THREE.Vector3());
        const halfX = (box.max.x - box.min.x) / 2;
        const edgeSign = Math.sign(enemyAI.peekTargetX - c.x) || 1;
        const edgeX = c.x + edgeSign * (halfX + 0.55);
        path.push(new THREE.Vector3(edgeX, 0, c.z)); // 侧移到掩体边缘
        path.push(new THREE.Vector3(edgeX, 0, enemyAI.peekPos.z)); // 从边缘侧步出来
      }
    }
    enemyAI.path = path;
    enemyAI.firingSpot = null;
    enemyAI.badSpots = [];
    enemyAI.stallT = 0;
    enemyAI.pathStallT = 0;
    enemyAI.dieProgress = 0;
    enemy.group.visible = true;
    enemy.group.position.set(spawnX, 0, spawnZ);
    // 保险：刷新瞬间先"蹲在掩体后"（头部降到约 1.4m，被掩体完全挡住），拉出时才起身
    enemy.group.scale.set(1, 0.86, 1);
    enemy.group.position.y = -0.06;
    lastSpawn = {
      seq: lastSpawn.seq + 1,
      visible: isVisibleFromPlayer(new THREE.Vector3(spawnX, 0, spawnZ)),
      distance: +Math.hypot(spawnX - camera.position.x, spawnZ - camera.position.z).toFixed(2),
      cover: cover.id,
      difficulty: sliceDiff,
      fallback: cover.fallback,
      cameraY: +camera.position.y.toFixed(2),
      x: +spawnX.toFixed(2),
      z: +spawnZ.toFixed(2),
    };
    enemy.group.rotation.set(0, 0, 0);
    enemy.leftArm.rotation.set(0, 0, 0);
    enemy.rightArm.rotation.set(0, 0, 0);
    enemy.leftLeg.rotation.set(0, 0, 0);
    enemy.rightLeg.rotation.set(0, 0, 0);
    flashEnemyMats(0x000000);
  };
  resetEnemy();

  // 调试挂点（便于自动化测试读取运行时状态与瞄准某点）
  const debugAim = (x: number, y: number, z: number): void => {
    const dx = x - camera.position.x;
    const dy = y - camera.position.y;
    const dz = z - camera.position.z;
    yaw = Math.atan2(-dx, -dz);
    pitch = Math.atan2(dy, Math.hypot(dx, dz));
  };
  (window as unknown as { __slice3d?: unknown }).__slice3d = {
    // 注意：敌人是从对象池里轮换的（resetEnemy 会重新赋值 enemy），
    // 这里必须用 getter 取"当前这一个"，否则自检脚本读到的是过期对象
    // （曾经导致自检数据看着正常、实际测的是不动的那个敌人）。
    get enemy() {
      return enemy;
    },
    camera,
    scene,
    ai: enemyAI,
    aimAt: debugAim,
    getBurst: () => burst,
    /** 只读：当前视角角度（自检用来看"灵敏度到底有没有生效"） */
    look: () => ({ yaw: +yaw.toFixed(4), pitch: +pitch.toFixed(4) }),
    /** 只读：当前主页设置（自检用来核对菜单与运行时是否一致） */
    settings: () => ({ sens: { ...sensProfile }, crosshair: { ...crosshair } }),
    /** 只读：当前场景信息（自检用来确认"切了场景真的重建了房间"；注意 scene 已被 THREE.Scene 占用） */
    sceneInfo: () => ({
      id: SCENE.id,
      name: SCENE.name,
      room: { ...SCENE.room },
      spawns: spawnPoints.length,
      fixedSpawns: SCENE.spawns.length,
      procSpawns: procAdded,
      spawnIds: spawnPoints.map((s) => s.id),
      spawnCoords: spawnPoints.map((s) => [+s.x.toFixed(1), +s.z.toFixed(1)]),
      walls: room.walls.length,
      fog: [SCENE.fog.near, SCENE.fog.far],
      limits: { x: SCENE.player.limitX, zmin: SCENE.player.limitZmin, zmax: SCENE.player.limitZmax },
      player: { x: +camera.position.x.toFixed(2), z: +camera.position.z.toFixed(2) },
    }),
    /** 只读：实体碰撞盒（自检用来做"线段是否被掩体挡住"的几何验证） */
    colliders: () =>
      colliders.map((b) => ({
        min: [+b.min.x.toFixed(2), +b.min.y.toFixed(2), +b.min.z.toFixed(2)],
        max: [+b.max.x.toFixed(2), +b.max.y.toFixed(2), +b.max.z.toFixed(2)],
      })),
    rifle,
    parts: { mag: magPart, charging: chargingPart },
    perf: () => ({
      fps: +(perfFrames / Math.max(0.001, perfAccum)).toFixed(1),
      quality: qualityLevel,
      dpr: renderer.getPixelRatio(),
      calls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      shadows: renderer.shadowMap.enabled,
      buffer: [renderer.domElement.width, renderer.domElement.height],
      longFrames,
      maxFrameMs: +maxFrameMs.toFixed(1),
      loopError,
      recoveries,
      renders: renderFrames,
      sinceRenderMs: +(performance.now() - lastRenderDoneAt).toFixed(0),
      spikes: spikeCount,
      rawInput: !rawInputUnsupported,
      gpu: gpuName,
      gpuSoftware: gpuIsSoftware,
      antialias: qualityLevel === 'high',
    }),
    resetMaxFrame: () => {
      maxFrameMs = 0;
      longFrames = 0;
    },
    /** 测试钩子：模拟"循环冻结"，用于验证看门狗能自动恢复 */
    forceStall: () => {
      lastLoopTick = performance.now() - 9999;
    },
    /** 测试钩子：把玩家放到指定位置（自检用：验证"躲在箱子后面敌人到底看不看得见"） */
    setPlayer: (x: number, z: number) => {
      playerPos.set(x, CONFIG.eyeHeight, z);
      camera.position.set(x, CONFIG.eyeHeight, z);
      playerVel.set(0, 0, 0);
    },
    /** 测试钩子：对玩家造成伤害（与敌人开火走同一条代码路径，用于验证死亡流程） */
    hurtPlayer: (dmg = ENEMY_SHOT_DAMAGE) => damagePlayer(dmg),
    /** 测试钩子：直接让敌人开一枪（与真实开火同一条路径，用于统计命中率/爆头率） */
    forceEnemyFire: () => enemyFire(),
    /** 测试钩子：让敌人重走一次「刷新 → 拉出 → 停下」，用于测量"停下到开火"的真实间隔 */
    forceEnemyCycle: () => {
      enemyAI.state = 'hidden';
      enemyAI.timer = 0.25;
      enemyAI.feintPlan = false;
    },
    /** 只读：玩家血量 / 是否阵亡 / 连续阵亡次数 */
    playerState: () => ({ hp: playerHp, dead: playerDead, streak: deathStreak }),
    /** 测试钩子：直接设置玩家血量（统计命中率时把血量拉高，避免中途阵亡打断采样） */
    setPlayerHp: (hp: number) => {
      playerHp = Math.max(1, Math.round(hp));
      hpEl.textContent = String(playerHp);
    },
    /** 只读：敌人开火统计（命中率/爆头率自检） */
    enemyFireStats: () => ({ shots: enemyShots, hits: enemyHits, headshots: enemyHeadshots }),
    /** 只读：受击/阵亡的表现层状态（震动幅度、红屏透明度、见血音效次数） */
    hurtFx: () => ({
      blood: +bloodShown.toFixed(3),
      shakeAmp: +shakeAmp.toFixed(4),
      shakeLeftMs: Math.max(0, Math.round(shakeUntil - performance.now())),
      lastShake: { ...lastShakeOffset },
      bloodSfx: bloodSfxCount,
      dead: playerDead,
    }),
    /** 只读：当前难度的开火参数（时限/命中率/爆头率） */
    fireParams: () => ({ delay: +enemyFireDelay().toFixed(3), ...tactics() }),
    setQuality: (q: 'high' | 'medium' | 'low') => {
      autoQuality = false;
      applyQuality(q);
    },
    reloadState: () => ({ reloading, magY: +magPart.position.y.toFixed(3), chargeZ: +chargingPart.position.z.toFixed(3) }),
    coverState: () => ({
      on: coverState.on,
      count: playerCoverMeshes.length,
      los: enemyHasLineOfSight(),
      blocked: +enemyAI.blocked.toFixed(2),
    }),
    deaths: () => stats.deaths,
    kills: () => stats.kills,
    poolSize: () => enemyPool.length,
    /** 测试钩子：走与爆头击杀完全相同的结算链路（用于验证"打满即出成绩"） */
    forceKill: () => {
      if (enemyAI.state === 'dead') return;
      enemyAI.hp = 0;
      enemyAI.state = 'dead';
      stats.kills++;
      headshotCount++;
      if (currentEncounter?.appearAt) reactionSamples.push(performance.now() - currentEncounter.appearAt);
      killsEl.textContent = String(stats.kills);
      closeEncounter(true);
      if (sessionTarget < 999 && stats.kills >= sessionTarget) endSession();
    },
    decals: () => decals.length,
    /** 穿模自检：敌人中心是否嵌入任何实体碰撞盒（半径 0.4 的 60% 容差） */
    enemyClipCheck: () => {
      const g = enemy.group.position;
      for (const b of colliders) {
        if (b.min.y > CONFIG.eyeHeight + 0.15 || b.max.y < 0.05) continue;
        const cx = Math.max(b.min.x, Math.min(g.x, b.max.x));
        const cz = Math.max(b.min.z, Math.min(g.z, b.max.z));
        if ((g.x - cx) ** 2 + (g.z - cz) ** 2 < (0.4 * 0.6) ** 2) return true;
      }
      return false;
    },
    enemyInfo: () => {
      const g = enemy.group;
      const dx = camera.position.x - g.position.x;
      const dz = camera.position.z - g.position.z;
      const dist = Math.hypot(dx, dz);
      // 朝向玩家程度：模型正面为本地 -Z
      const fwdX = -Math.sin(g.rotation.y);
      const fwdZ = -Math.cos(g.rotation.y);
      const facing = dist > 0.05 ? (fwdX * (dx / dist) + fwdZ * (dz / dist)) : 1;
      return {
        state: enemyAI.state,
        x: +g.position.x.toFixed(2),
        z: +g.position.z.toFixed(2),
        distance: +dist.toFixed(2),
        facingPlayer: +facing.toFixed(2),
        lineClear: enemyLineClear(g.position.x, g.position.z),
      };
    },
    probe: (x: number, y: number, z: number) => {
      const from = camera.position.clone();
      const target = new THREE.Vector3(x, y, z);
      const d = target.clone().sub(from);
      const dd = d.length();
      spawnRay.set(from, d.normalize());
      spawnRay.far = dd;
      const hits = spawnRay.intersectObjects(room.walls, false);
      return {
        wallCount: room.walls.length,
        hitCount: hits.length,
        firstHit: hits[0] ? { dist: +hits[0].distance.toFixed(2), far: +dd.toFixed(2) } : null,
      };
    },
    spawnInfo: () => ({
      ...lastSpawn,
      counters: { ...enemyAI.counters },
      strafeSeconds: +enemyAI.strafeSeconds.toFixed(1),
      // 需求⑦：给自检脚本读的"战术动作"明细
      peekOffset: enemyAI.peekOffset,
      paceFactor: enemyAI.paceFactor,
      crouchHold: +enemyAI.crouchHold.toFixed(2),
      bodyHits: enemyAI.bodyHits,
      coverName: enemyAI.coverName,
    }),
    setDifficulty: (id: string) => {
      sliceDiff = id;
      localStorage.setItem(DIFF_KEY, id);
      refreshDiffButtons();
    },
  };

  /* ---------------- 输入与射击 ---------------- */
  const keys = new Set<string>();
  let yaw = 0;
  let pitch = 0;
  /** 指针锁定刚拿到的时刻（前 120ms 的鼠标位移一律丢弃，防 pointer-lock jump） */
  let lockAcquiredAt = 0;
  /** 被夹掉的异常鼠标尖峰次数（HUD 会显示，用来判断是不是环境在制造脏数据） */
  let spikeCount = 0;
  /**
   * 单次事件允许的最大计数（按 DPI 缩放）：同一个"物理甩枪速度"下，
   * 高 DPI 鼠标的计数天然更大，所以不能写死一个常数。
   * 800 DPI → 480 计数；3200 DPI → 1920 计数。
   * 超过 3 倍上限的事件（800DPI 时 ≥1440 计数）几乎只可能是脏数据
   * （切换指针锁定 / 跨屏 / 系统加速曲线 / 卡顿后合并的巨量位移）→ 直接丢弃；
   * 介于两者之间的夹到上限，保证仍然能转向。
   */
  const mouseSpikeLimit = (): number => Math.max(256, Math.round(sensProfile.dpi * 0.6));
  let crouching = false;
  let firing = false;
  let ammo = RIFLE.magSize;
  let reloading = false;
  let reloadEnd = 0;
  let reloadStartAt = 0;
  let burst = 0;
  let lastShot = 0;
  let recoil = 0;
  let running = false;
  let rafId = 0;
  let lastT = performance.now();
  let perfFrames = 0;
  let perfAccum = 0;
  const autoSamples: number[] = [];
  let loopError = '';
  let longFrames = 0;
  let maxFrameMs = 0;
  /** 本局是否已结算（结算后停止生成敌人） */
  let sessionOver = false;
  /** 性能自检模式：收集每帧耗时（毫秒） */
  let benchMode = false;
  let benchSamples: number[] = [];
  /** 看门狗：记录最后一次真实渲染的时刻（用于检测"冻结"并自动恢复） */
  let lastLoopTick = performance.now();
  let lastRenderedAt = performance.now();
  /**
   * 真实渲染帧计数（诊断用）。
   * 关键点：主循环在跑 ≠ 画面在更新。只要 step() 里有任何一个提前 return
   * 绕过 renderer.render()，画面就会"定格"，而看门狗（只看主循环心跳）
   * 完全检测不到——必须单独统计真正的渲染次数。
   */
  let renderFrames = 0;
  /** 最后一次"真正调到 renderer.render()"的时刻（与上面的帧率门限含义不同） */
  let lastRenderDoneAt = performance.now();
  let recoveries = Number(localStorage.getItem('jg.slice3d.recoveries') ?? '0') || 0;
  let recovering = false;
  /**
   * 事件日志：记录"冻结前最后做了什么"。
   * 每次关键动作都写进 localStorage，下次打开（尤其是自动恢复重载后）就能看到触发点。
   */
  eventLog = (() => {
    try {
      const raw = localStorage.getItem('jg.slice3d.eventLog');
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      return Array.isArray(arr) ? arr.slice(-8) : [];
    } catch {
      return [];
    }
  })();
  logEvent = (msg: string): void => {
    eventLog.push(`${new Date().toLocaleTimeString('zh-CN')} ${msg}`);
    if (eventLog.length > 8) eventLog.shift();
    try {
      localStorage.setItem('jg.slice3d.eventLog', JSON.stringify(eventLog));
    } catch {
      // 忽略存储异常
    }
  };
  // 上次是否是"自动恢复"重载？把触发点显示出来
  try {
    const lastRec = localStorage.getItem('jg.slice3d.lastRecovery');
    if (lastRec) {
      lastLogEl.innerHTML =
        `<b>上次运行疑似冻结</b>：${lastRec}<br>` +
        `恢复次数：${recoveries}<br>` +
        `冻结前最后动作：<br>${eventLog.map((l) => `· ${l}`).join('<br>') || '（无记录）'}`;
      localStorage.removeItem('jg.slice3d.lastRecovery');
    } else {
      lastLogEl.textContent = '';
    }
  } catch {
    // 忽略
  }

  const stats = { shots: 0, hits: 0, kills: 0, deaths: 0, startedEpoch: Date.now(), startedPerf: performance.now() };
  // 本局统计（用于结算成绩）
  let headshotCount = 0;
  const reactionSamples: number[] = [];
  let sessionStartAt = performance.now();
  const shotRecords: ShotRecord[] = [];
  const encounterRecords: EncounterRecord[] = [];
  let currentEncounter: Partial<EncounterRecord> | null = null;
  const playerPos = new THREE.Vector3(SCENE.player.x, CONFIG.eyeHeight, SCENE.player.z);
  const playerVel = new THREE.Vector3();
  /** 玩家真实血量：敌人每一枪扣 ENEMY_SHOT_DAMAGE，归零即阵亡 */
  let playerHp = 100;
  /** 是否处于阵亡流程（死亡动画 / 阵亡界面）——期间不接受任何输入 */
  let playerDead = false;
  /** 阵亡开始的时刻（用于驱动死亡动画时间轴） */
  let deathStartAt = 0;
  /** 连续阵亡次数：完成一局（打满目标人数）才清零；跨局、跨刷新保留 */
  let deathStreak = 0;
  try {
    deathStreak = Math.max(0, Number(localStorage.getItem(STREAK_KEY) ?? '0') || 0);
  } catch {
    deathStreak = 0;
  }

  /* ---------------- 受击 / 阵亡的表现反馈（震动 · 渐红 · 见血音效） ----------------
   * 全部是纯表现层：不参与伤害与命中判定，也不影响帧率
   * （红屏 = DOM 透明度，震动 = 每帧几个浮点运算，音效 = WebAudio 合成）。
   */
  /** 本次受击红屏的峰值与开始时刻 */
  let bloodPeak = 0;
  let bloodAt = -1e9;
  /** 已经写到 DOM 上的透明度（只在变化时写，避免每帧触发样式重算） */
  let bloodShown = -1;
  /** 相机震动：幅度、起止时刻、方向（沿"子弹来向"推，有方向感而不是乱抖） */
  let shakeAmp = 0;
  let shakeRot = 0;
  let shakeStart = 0;
  let shakeUntil = 0;
  let shakeDirX = 0;
  let shakeDirZ = 0;
  /** 见血音效触发次数（自检用） */
  let bloodSfxCount = 0;
  /** 上一帧实际施加到相机上的震动偏移（自检用；相机位置每帧会被重置，采样容易错过） */
  let lastShakeOffset = { x: 0, y: 0, z: 0, roll: 0 };

  /** 触发一次红屏脉冲（峰值 0~1） */
  const bloodFlash = (peak: number): void => {
    bloodPeak = peak;
    bloodAt = performance.now();
  };
  /** 当前红屏脉冲强度：先冲上峰值，再线性回落 */
  const bloodLevelAt = (now: number): number => {
    const t = now - bloodAt;
    if (t < 0 || t > BLOOD_ATTACK_MS + BLOOD_DECAY_MS) return 0;
    return t <= BLOOD_ATTACK_MS
      ? bloodPeak * (t / BLOOD_ATTACK_MS)
      : bloodPeak * Math.max(0, 1 - (t - BLOOD_ATTACK_MS) / BLOOD_DECAY_MS);
  };
  /**
   * 加一次相机震动。
   * 取"最大值"而不是累加：连续中弹时不会把画面越抖越散，始终是最猛那一档。
   */
  const addShake = (amp: number, rot: number, ms: number, dirX: number, dirZ: number): void => {
    shakeAmp = Math.max(shakeAmp, amp);
    shakeRot = Math.max(shakeRot, rot);
    shakeStart = performance.now();
    shakeUntil = shakeStart + ms;
    shakeDirX = dirX;
    shakeDirZ = dirZ;
  };
  /**
   * 每帧更新受击表现：把震动叠加到相机上 + 驱动红屏透明度。
   * 必须在"相机变换完成之后、renderer.render 之前"调用。
   */
  const updateHurtFx = (now: number): void => {
    // —— 震动：平方衰减，结束时精确归零 ——
    if (shakeUntil > shakeStart && now < shakeUntil) {
      const k = 1 - (now - shakeStart) / (shakeUntil - shakeStart);
      const a = shakeAmp * k * k;
      const ox = (Math.random() * 2 - 1) * a + shakeDirX * a * 0.8;
      const oy = (Math.random() * 2 - 1) * a * 0.8;
      const oz = (Math.random() * 2 - 1) * a + shakeDirZ * a * 0.8;
      const or = (Math.random() * 2 - 1) * shakeRot * k;
      camera.position.x += ox;
      camera.position.y += oy;
      camera.position.z += oz;
      camera.rotation.z += or;
      camera.rotation.y += or * 0.4;
      lastShakeOffset = { x: +ox.toFixed(4), y: +oy.toFixed(4), z: +oz.toFixed(4), roll: +or.toFixed(4) };
    } else {
      shakeAmp = 0;
      shakeRot = 0;
      lastShakeOffset = { x: 0, y: 0, z: 0, roll: 0 };
    }
    // —— 红屏：受击脉冲 与 阵亡渐红 取较大者 ——
    const deathRed = playerDead
      ? Math.min(DEATH_RED_MAX, 0.3 + Math.min(1, (now - deathStartAt) / DEATH_FALL_MS) * 0.6)
      : 0;
    const level = Math.max(bloodLevelAt(now), deathRed);
    if (Math.abs(level - bloodShown) > 0.004) {
      bloodShown = level;
      bloodEl.style.opacity = level.toFixed(3);
    }
  };

  const decals: THREE.Mesh[] = [];
  const sparks: { mesh: THREE.Mesh; vel: THREE.Vector3; life: number }[] = [];
  const decalGeo = new THREE.CircleGeometry(0.035, 10);
  const decalMat = new THREE.MeshBasicMaterial({ color: 0x121212, transparent: true, opacity: 0.9 });
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
  const bloodMat = new THREE.MeshBasicMaterial({ color: 0xa81f1a });
  // 复用同一份几何体：避免每次命中都新建 GPU 缓冲（会造成命中瞬间卡顿）
  const sparkGeo = new THREE.SphereGeometry(0.012, 5, 4);

  const raycaster = new THREE.Raycaster();

  const spawnSparks = (
    point: THREE.Vector3,
    normal: THREE.Vector3,
    count: number,
    mat: THREE.Material = sparkMat,
  ): void => {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(sparkGeo, mat);
      m.position.copy(point);
      const vel = normal
        .clone()
        .multiplyScalar(1.2 + Math.random())
        .add(new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6));
      scene.add(m);
      sparks.push({ mesh: m, vel, life: 0.35 + Math.random() * 0.2 });
    }
  };

  const addDecal = (point: THREE.Vector3, normal: THREE.Vector3): void => {
    const d = new THREE.Mesh(decalGeo, decalMat);
    d.position.copy(point).addScaledVector(normal, 0.012);
    d.lookAt(point.clone().add(normal));
    scene.add(d);
    decals.push(d);
    if (decals.length > 40) {
      const old = decals.shift();
      if (old) scene.remove(old);
    }
  };

  /** 单发：射线命中敌人（头=秒杀，身体=25）或场景（留弹孔 + 火花） */
  const shoot = (): void => {
    const now = performance.now();
    if (reloading || ammo <= 0) {
      sfx.empty();
      return;
    }
    ammo--;
    ammoEl.textContent = String(ammo);
    const moving = playerVel.length() > 0.4; // 需求④：移动打断连射累积
    if (shouldResetBurst(moving, now - lastShot)) burst = 0;
    burst++;
    lastShot = now;

    // 前两发精准；之后按散布半径换算成角度偏移（复用 2D 版的散布模型）
    const spreadPx = effectiveSpread(burst, window.innerWidth, moving);
    const off = sampleBulletOffset(spreadPx);
    const halfFovY = (75 * Math.PI) / 360;
    const angleX = Math.atan((off.x / window.innerWidth) * 2 * Math.tan(halfFovY) * camera.aspect);
    const angleY = Math.atan((off.y / window.innerHeight) * 2 * Math.tan(halfFovY));
    const dir = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(camera.quaternion)
      .applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(-angleY, angleX, 0, 'YXZ')))
      .normalize();
    raycaster.set(camera.getWorldPosition(new THREE.Vector3()), dir);

    const targets: THREE.Object3D[] = [...room.walls, enemy.group];
    const hits = raycaster.intersectObjects(targets, true);
    stats.shots++;
    shotRecords.push({
      t: now - stats.startedPerf,
      hit: false,
      head: false,
      targetX: 0,
      targetY: 0,
      distX: 0,
    });
    const lastShotRecord = shotRecords[shotRecords.length - 1];
    recoil = 1;
    flash.intensity = 6;
    flashMesh.material.opacity = 0.95;
    sfx.shot();

    if (hits.length > 0) {
      const hitObj = hits[0].object as THREE.Mesh;
      // 沿父级向上判断是否属于敌人（避免手臂/腿/武器漏判）
      let isEnemyPart = false;
      let cursor: THREE.Object3D | null = hitObj;
      while (cursor) {
        if (cursor.userData?.isEnemy) {
          isEnemyPart = true;
          break;
        }
        cursor = cursor.parent;
      }
      const zone = (hitObj.userData.zone as string | undefined) ?? 'body';
      const enemyHit = isEnemyPart && enemyAI.state !== 'dead';
      if (enemyHit) {
        const dmg = shotDamage(zone === 'head', 'headshot');
        enemyAI.hp = Math.max(0, enemyAI.hp - dmg);
        stats.hits++;
        showHitmarker(zone === 'head');
        spawnDamageText(hits[0].point, zone === 'head' ? '爆头' : `-${dmg}`, zone === 'head' ? '#ffd24a' : '#ff9a86');
        lastShotRecord.hit = true;
        lastShotRecord.head = zone === 'head';
        if (currentEncounter) {
          currentEncounter.shotsFired = (currentEncounter.shotsFired ?? 0) + 1;
          if (currentEncounter.firstShotAt == null) {
            currentEncounter.firstShotAt = now;
            currentEncounter.firstShotHit = true;
            currentEncounter.firstShotHead = zone === 'head';
          }
        }
        // 需求⑦-E2（折中方案）：身体命中后，**第 1、3 枪**缩回掩体换身位再拉出；
        // 第 2 枪不缩——留出让你打出第四枪的节奏窗口，否则会变成"永远打不死"。
        if (zone !== 'head' && enemyAI.hp > 0 && tactics().repeatPeek) {
          enemyAI.bodyHits++;
          if (enemyAI.bodyHits === 1 || enemyAI.bodyHits === 3) pendingThreat = 1;
        }
        flashEnemyMats(0x551111);
        window.setTimeout(() => flashEnemyMats(0x000000), 110);
        spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 6, bloodMat);
        if (zone === 'head') sfx.headshot();
        else sfx.hit();
        if (enemyAI.hp <= 0) {
          enemyAI.state = 'dead';
          stats.kills++;
          logEvent(`击杀 #${stats.kills}`);
          if (zone === 'head') headshotCount++;
          if (currentEncounter?.appearAt) reactionSamples.push(now - currentEncounter.appearAt);
          killsEl.textContent = String(stats.kills);
          sfx.killConfirm(stats.kills);
          showBanner(zone === 'head' ? '爆头击杀' : `击杀（${enemyAI.hp === 0 ? '身体' : ''}）`);
          spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 14, bloodMat);
          closeEncounter(true);
          // 达成本局目标 → 出成绩
          if (sessionTarget < 999 && stats.kills >= sessionTarget) endSession();
        }
      } else {
        addDecal(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0));
        spawnSparks(hits[0].point, hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0), 7);
        sfx.miss();
        // 需求⑦-E1：子弹从他身边 0.9m 内飞过（含打在掩体上擦身而过）→ 他记一次威胁
        if (tactics().repeatPeek && enemyAI.state !== 'hidden' && enemyAI.state !== 'dead') {
          threatPoint.set(enemy.group.position.x, enemy.group.position.y + 1.15, enemy.group.position.z);
          // 必须在他"身前方向"才算擦弹（否则背对着开一枪也会误判）
          const toEnemy = threatPoint.dot(raycaster.ray.direction) - raycaster.ray.origin.dot(raycaster.ray.direction);
          if (toEnemy > 0 && raycaster.ray.distanceToPoint(threatPoint) < 0.9) pendingThreat = 1;
        }
      }
    }
    if (ammo <= 0) startReload();
  };

  const startReload = (): void => {
    if (reloading) return;
    reloading = true;
    reloadStartAt = performance.now();
    reloadEnd = reloadStartAt + RIFLE.reloadMs;
    ammoEl.textContent = '换弹中';
    sfx.reloadStart();
  };

  const showBanner = (text: string, ms = 850): void => {
    bannerEl.textContent = text;
    bannerEl.className = 's3-banner show';
    window.setTimeout(() => {
      bannerEl.className = 's3-banner';
    }, ms);
  };

  /** 命中准星闪光 */
  const showHitmarker = (head: boolean): void => {
    crosshairEl.classList.remove('hit', 'headhit');
    void crosshairEl.offsetWidth;
    crosshairEl.classList.add(head ? 'headhit' : 'hit');
  };

  /** 伤害数字：把世界坐标投影到屏幕后生成漂浮文字 */
  const spawnDamageText = (world: THREE.Vector3, text: string, color: string): void => {
    const v = world.clone().project(camera);
    const el = document.createElement('div');
    el.className = 's3-dmg-item';
    el.textContent = text;
    el.style.color = color;
    el.style.left = `${((v.x + 1) / 2) * 100}%`;
    el.style.top = `${((-v.y + 1) / 2) * 100}%`;
    dmgLayer.appendChild(el);
    window.setTimeout(() => el.remove(), 700);
  };

  const openEncounter = (): void => {
    currentEncounter = {
      targetId: stats.kills + stats.deaths + 1,
      appearAt: performance.now(),
      firstShotAt: null,
      firstShotHit: false,
      firstShotHead: false,
      shotsFired: 0,
      killed: false,
      killAt: null,
      escaped: false,
      flickDistPx: null,
      preaimErrPx: null,
      displacementPx: 0,
      trackMs: null,
      activeDurMs: null,
      attacked: false,
    };
  };

  const closeEncounter = (killed: boolean): void => {
    if (!currentEncounter) return;
    currentEncounter.killed = killed;
    currentEncounter.killAt = performance.now();
    currentEncounter.escaped = !killed;
    encounterRecords.push(currentEncounter as EncounterRecord);
    currentEncounter = null;
  };

  /* ---------------- 事件绑定 ---------------- */
  const onKeyDown = (e: KeyboardEvent): void => {
    // 阵亡流程里不接受任何按键（否则会因为 Esc 之类的键打断死亡动画）
    if (playerDead) return;
    keys.add(e.code);
    // 吃掉浏览器默认行为（F1 帮助页之类）
    if (['KeyP', 'KeyC', 'KeyR', 'KeyF', 'Tab'].includes(e.code)) e.preventDefault();
    if (e.code === 'KeyR') startReload();
    // F：网页内全屏（浏览器全屏 API，作用于 3D 容器）
    if (e.code === 'KeyF') void toggleFullscreen();
    // P：循环切换画质（低 → 中 → 高）。不用 F1-F3，避免与浏览器快捷键冲突
    if (e.code === 'KeyP') {
      autoQuality = false;
      const next: QualityLevel = qualityLevel === 'low' ? 'medium' : qualityLevel === 'medium' ? 'high' : 'low';
      applyQuality(next);
      showBanner(`画质：${next === 'low' ? '低（540p 级）' : next === 'medium' ? '中（100 万像素）' : '高（含阴影，需刷新页面生效）'}`);
    }
    // C：随时切换玩家掩体（有掩体 / 空旷场地）
    if (e.code === 'KeyC') {
      coverState.on = !coverState.on;
      applyCoverSetting();
      showBanner(coverState.on ? '掩体：开启' : '掩体：关闭');
    }
    if (e.code === 'Escape') exit();
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') crouching = true;
  };
  const onKeyUp = (e: KeyboardEvent): void => {
    keys.delete(e.code);
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') crouching = false;
  };
  const onMouseMove = (e: MouseEvent): void => {
    if (playerDead || !running || document.pointerLockElement !== canvas) return;
    // 刚命中指针锁定的前 120ms 不采样：浏览器/系统在这时会补交一个很大的位移
    // （经典的 pointer-lock jump），一进游戏视角猛地甩一下就是它。
    if (performance.now() - lockAcquiredAt < 120) return;
    // 主页「灵敏度」单元真正生效的地方：按"每 1 个鼠标计数转多少度"换算。
    // CS2 系数 0.022、Valorant 系数 0.07 —— 所以同样 sens 数值下两者手感不同。
    // 尖峰保护：正常一次鼠标事件只有几个~几十个计数，出现几百上千计数说明事件不干净。
    // 直接把这种数据乘进灵敏度，就是"视角突然不受控地快速转动"（实测 5000 计数 = 甩 220°）。
    const limit = mouseSpikeLimit();
    const mx = Number.isFinite(e.movementX) ? e.movementX : 0;
    const my = Number.isFinite(e.movementY) ? e.movementY : 0;
    const huge = Math.abs(mx) > limit * 3 || Math.abs(my) > limit * 3;
    if (huge) {
      // 极其离谱的位移：整条丢弃，绝不换算成角度（宁可这一下不转，也不能甩出去）
      spikeCount++;
      if (spikeCount === 1) logEvent(`鼠标位移尖峰 ${Math.round(mx)}/${Math.round(my)} 计数（已丢弃）`);
      return;
    }
    const dx = Math.max(-limit, Math.min(limit, mx));
    const dy = Math.max(-limit, Math.min(limit, my));
    const radPerCount = (sensDegreesPerCount(sensProfile) * Math.PI) / 180;
    yaw -= dx * radPerCount;
    pitch = Math.max(-1.1, Math.min(1.1, pitch - dy * radPerCount));
  };
  const onMouseDown = (e: MouseEvent): void => {
    if (playerDead) return;
    if (e.button === 0) firing = true;
  };
  const onMouseUp = (e: MouseEvent): void => {
    if (e.button === 0) firing = false;
  };
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);

  const resize = (): void => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    // 关键：按"最大像素预算"决定渲染分辨率缩放——屏幕再大也不会把显卡压垮
    const budget = PIXEL_BUDGET[qualityLevel];
    const ideal = Math.sqrt(budget / Math.max(1, w * h));
    const scale = Math.max(0.5, Math.min(window.devicePixelRatio, ideal));
    renderer.setPixelRatio(scale);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const fsRoot = container.querySelector<HTMLElement>('.slice3d') ?? container;
  /** 最近一次成功进入全屏的时刻（用于识别"是不是全屏把图形上下文搞挂了"） */
  let fullscreenAt = 0;
  /**
   * 请求"网页内全屏"。
   * 注意：全屏 API 必须在**用户手势**里同步调用，否则会被浏览器拒绝——
   * 所以「点击进入」那一下就要顺手申请（见 start()），不能等 await 之后再申请。
   */
  const requestFullscreen = async (): Promise<boolean> => {
    if (document.fullscreenElement === fsRoot) return true;
    try {
      await fsRoot.requestFullscreen();
      fullscreenAt = performance.now();
      return true;
    } catch {
      return false;
    }
  };
  /** 网页内全屏切换（F 键 / 菜单按钮用） */
  const toggleFullscreen = async (): Promise<void> => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
        showBanner('已退出全屏');
      } catch {
        showBanner('退出全屏失败');
      }
      return;
    }
    const ok = await requestFullscreen();
    showBanner(ok ? '已进入全屏（Esc 退出）' : '当前环境不允许全屏，请用浏览器菜单的 F11');
  };
  /**
   * 全屏切换的瞬间容器尺寸还没稳定，只靠 fullscreenchange 调一次 resize 可能算错，
   * 所以过渡结束后再补两次（无副作用，代价可以忽略）。
   */
  const resizeSoon = (): void => {
    resize();
    window.setTimeout(resize, 120);
    window.setTimeout(resize, 420);
  };
  const onFullscreenChange = (): void => {
    resizeSoon();
    if (document.fullscreenElement === fsRoot) lockAcquiredAt = performance.now();
  };
  document.addEventListener('fullscreenchange', onFullscreenChange);
  window.addEventListener('resize', resize);
  // WebGL 上下文丢失（显存/驱动问题会让画面彻底停住）：捕获并提示
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    loopError = 'WebGL 上下文丢失（显存或驱动问题）';
    recover('图形上下文丢失');
  });
  canvas.addEventListener('webglcontextrestored', () => {
    loopError = '';
  });

  /**
   * 自动恢复：显卡驱动挂起 / 上下文丢失 / 循环停摆时，浏览器会彻底冻住且无法自救。
   * 这里统一走"提示 + 自动重载"，把"永久卡死"变成"最多两秒恢复"。
   */
  const recover = (reason: string): void => {
    if (recovering) return;
    recovering = true;
    recoveries++;
    localStorage.setItem('jg.slice3d.recoveries', String(recoveries));
    /**
     * 自保护：如果故障发生在"刚进全屏"的 3 秒内，说明这台机器的全屏切换会把
     * 图形上下文搞挂（重载后再自动进全屏 = 无限循环，玩家会以为游戏坏了）。
     * 这时自动关掉"进入战斗全屏"，让玩家至少能正常玩。
     */
    if (autoFullscreen && fullscreenAt > 0 && performance.now() - fullscreenAt < 3000) {
      autoFullscreen = false;
      try {
        localStorage.setItem(FS_KEY, 'window');
      } catch {
        // 存储不可用也无妨，本次会话已经不会再自动全屏
      }
      refreshFsUI();
    }
    try {
      localStorage.setItem(
        'jg.slice3d.lastRecovery',
        `${reason} · ${new Date().toLocaleString('zh-CN')}`,
      );
    } catch {
      // 忽略
    }
    try {
      showBanner(`${reason}，正在自动恢复…`);
    } catch {
      // 极端情况下 DOM 不可用也无妨，重载即可
    }
    window.setTimeout(() => window.location.reload(), 900);
  };

  /**
   * 看门狗：每 1 秒检查一次"最后一帧"距今多久。
   * 超过 2.5 秒没有任何一帧 → 判定冻结并自动恢复（这是"卡住就无法恢复"的根治手段）。
   */
  const watchdog = window.setInterval(() => {
    if (recovering) return;
    const t = performance.now();
    // 加载阶段：rAF 被冻住会让进度条永远停住（既进不去游戏、也不会报任何错）
    if (!running) {
      if (!loadingOverlay.classList.contains('hidden') && t - lastLoopTick > 6000) {
        recover('加载阶段停摆（浏览器没有送帧）');
      }
      return;
    }
    // 心跳 1：主循环本身停了（浏览器没送帧 / 显卡挂起）
    if (t - lastLoopTick > 2500) {
      recover('主循环停摆（浏览器没有送帧）');
      return;
    }
    // 心跳 2：主循环在跑，但画面根本没更新（step() 里有代码提前 return 跳过了渲染）。
    // 这一路就是为了兜住"画面定格但一切看起来正常、看门狗也检测不到"的那类 Bug。
    if (t - lastRenderDoneAt > 2000) {
      recover('渲染停摆（主循环在跑但画面没更新）');
    }
  }, 1000);
  void watchdog;
  // 容器尺寸变化也同步（例如进入全屏、布局变化）
  const ro = new ResizeObserver(() => resize());
  ro.observe(container);
  resize();

  /** 预编译：把场景里所有材质的着色器（含阴影深度材质）提前编译好，
   *  否则敌人首次出现/首次投影时会现场编译 → 明显的"卡一下" */
  const warmUp = (): void => {
    try {
      renderer.compile(scene, camera);
      renderer.render(scene, camera); // 跑一帧把阴影贴图与程序都预热
    } catch {
      // 预热失败不影响运行
    }
  };
  warmUp();

  /** 应用画质档位（改像素比/阴影/灯光强度，并立即重算画布尺寸） */
  const applyQuality = (level: QualityLevel): void => {
    qualityLevel = level;
    logEvent(`画质 → ${level}`);
    localStorage.setItem('jg.slice3d.quality', level);
    doorLight.intensity = level === 'low' ? 3 : 6;
    // 运行时只改"渲染分辨率"——阴影/材质档位需要刷新页面才生效（避免着色器重编译卡顿）
    resize();
  };
  applyQuality(qualityLevel);

  /** 一帧之后继续（让加载进度条能刷新出来，不阻塞界面） */
  const nextFrame = (): Promise<void> =>
    new Promise((resolve) => requestAnimationFrame(() => resolve()));
  /**
   * 加载专用的"等一下"：优先等下一帧，但如果浏览器**没有送帧**
   * （显卡/合成器卡住、rAF 被冻），最多等 500ms 就用定时器继续。
   * 目的：把"永远卡在加载进度条"变成"加载慢一点但一定走得完"。
   */
  const nextFrameOrTimeout = (ms = 500): Promise<void> =>
    new Promise((resolve) => {
      let done = false;
      const finish = (): void => {
        if (done) return;
        done = true;
        resolve();
      };
      requestAnimationFrame(finish);
      window.setTimeout(finish, ms);
    });
  const setProgress = (p: number, text: string): void => {
    const pct = Math.round(Math.max(0, Math.min(1, p)) * 100);
    progressFill.style.width = `${pct}%`;
    loadPctEl.textContent = `${pct}%`;
    loadStepEl.textContent = text;
  };

  /**
   * 开局前加载：建满敌人池 → 逐个放到镜头前渲染（编译彩色/阴影深度着色器）
   * → 预热命中特效。做完这些，运行中就不会再出现"现建对象/现场编译"的卡顿。
   */
  const loadSession = async (count: number): Promise<void> => {
    while (enemyPool.length < count) {
      const e = buildEnemy();
      e.group.visible = false;
      scene.add(e.group);
      enemyPool.push(e);
      setProgress((enemyPool.length / count) * 0.55, `构建敌人模型 ${enemyPool.length}/${count}`);
      if (enemyPool.length % 3 === 0) await nextFrameOrTimeout();
    }
    for (let i = 0; i < enemyPool.length; i++) {
      const e = enemyPool[i];
      e.group.visible = true;
      e.group.position.set(0, 0, camera.position.z - 3.5);
      renderer.render(scene, camera);
      e.group.visible = false;
      e.group.position.set(0, 0, 0);
      setProgress(0.55 + (i / Math.max(1, enemyPool.length)) * 0.35, `预编译着色器 ${i + 1}/${enemyPool.length}`);
      await nextFrameOrTimeout();
    }
    setProgress(0.93, '预热命中特效…');
    await nextFrameOrTimeout();
    for (let i = 0; i < 6; i++) {
      const spark = new THREE.Mesh(sparkGeo, bloodMat);
      spark.position.set(0, 1.2, camera.position.z - 3);
      scene.add(spark);
      renderer.render(scene, camera);
      scene.remove(spark);
    }
    setProgress(1, '准备完成');
    await nextFrameOrTimeout();
  };

  /** 重置本局统计 */
  const resetSessionStats = (): void => {
    playerHp = 100;
    playerDead = false;
    deathStartAt = 0;
    deathEl.classList.add('hidden');
    // 表现层复位：红屏、震动、计数器（否则会在下一局留下残留）
    bloodPeak = 0;
    bloodAt = -1e9;
    bloodShown = 0;
    bloodEl.style.opacity = '0';
    shakeAmp = 0;
    shakeRot = 0;
    shakeStart = 0;
    shakeUntil = 0;
    bloodSfxCount = 0;
    stats.shots = 0;
    stats.hits = 0;
    stats.kills = 0;
    stats.deaths = 0;
    stats.startedEpoch = Date.now();
    stats.startedPerf = performance.now();
    headshotCount = 0;
    reactionSamples.length = 0;
    sessionStartAt = performance.now();
    killsEl.textContent = '0';
    accEl.textContent = '--';
    hpEl.textContent = '100';
    ammoEl.textContent = String(RIFLE.magSize);
    sessionOver = false;
    resetEnemy();
  };

  /**
   * 本次「停下 → 开火」的时限（秒）。
   * 需求：再慢也不超过 0.5s、再快也不低于 0.2s，且难度越高越短，到点**必定开火**。
   * 出手节奏 paceFactor（秒拉/长架）保留为窗口内的变化，但会被夹回区间——
   * 它是"在 0.2~0.5 之间怎么变"，不能破坏"必然开火"这条规则。
   */
  const enemyFireDelay = (): number => Math.min(0.5, Math.max(0.2, tactics().fireDelay * enemyAI.paceFactor));

  /** 敌人开火统计（自检用来看命中率/爆头率是否落在需求区间） */
  let enemyShots = 0;
  let enemyHits = 0;
  let enemyHeadshots = 0;
  const enemyMissRay = new THREE.Raycaster();
  /**
   * 未命中的反馈：让子弹从玩家身边擦过去，打在背后的墙上（弹孔 + 火花）。
   * 没有这个反馈的话，"敌人开了一枪但没打中"玩家根本察觉不到，会以为敌人没开火。
   */
  const spawnEnemyMiss = (): void => {
    const g = enemy.group;
    const from = _v1.set(g.position.x, g.position.y + 1.6 * g.scale.y, g.position.z);
    const dir = _v2.copy(camera.position).sub(from).normalize();
    // 随机偏 3~6 度：足够擦身而过，又不至于看起来像乱打
    const off = 0.05 + Math.random() * 0.06;
    const yawOff = (Math.random() * 2 - 1) * off;
    const cos = Math.cos(yawOff);
    const sin = Math.sin(yawOff);
    dir.set(dir.x * cos - dir.z * sin, dir.y + (Math.random() * 2 - 1) * off * 0.6, dir.x * sin + dir.z * cos).normalize();
    enemyMissRay.set(from, dir);
    enemyMissRay.far = 60;
    const hits = enemyMissRay.intersectObjects(room.walls, false);
    const p = hits.length > 0 ? hits[0].point : from.clone().addScaledVector(dir, 14);
    const n = hits.length > 0 ? (hits[0].face?.normal ?? new THREE.Vector3(0, 1, 0)) : new THREE.Vector3(0, 1, 0);
    addDecal(p, n);
    spawnSparks(p, n, 5);
  };

  /**
   * 敌人开一枪：先掷「命中/未命中」，命中再掷「头/身体」。
   * 概率随难度变化（命中 30%→90%，命中里爆头 10%→60%）。
   */
  const enemyFire = (): void => {
    enemyShots++;
    sfx.enemyShot();
    const t = tactics();
    if (Math.random() >= t.hitRate) {
      spawnEnemyMiss();
      return;
    }
    const head = Math.random() < t.headRate;
    enemyHits++;
    if (head) enemyHeadshots++;
    damagePlayer(head ? ENEMY_HEADSHOT_DAMAGE : ENEMY_SHOT_DAMAGE, head);
  };

  /**
   * 玩家受伤：扣血 + 红屏 + 记录"被攻击"，血量归零则进入阵亡流程。
   * 抽成函数是为了让「敌人开火」和「测试钩子」走**同一条**代码路径，
   * 避免出现"测的那条路和真实那条路不一样"的假验证。
   */
  const damagePlayer = (dmg: number, head = false): void => {
    if (playerDead) return;
    playerHp = Math.max(0, playerHp - dmg);
    hpEl.textContent = String(playerHp);
    if (head) sfx.hit(); // 爆头的额外反馈：比身体命中更"响"
    document.body.classList.add(head ? 's3-hurt-head' : 's3-hurt');
    window.setTimeout(() => document.body.classList.remove(head ? 's3-hurt-head' : 's3-hurt'), head ? 420 : 260);
    // 受击表现三件套：震动（沿子弹来向推一把）+ 红屏脉冲 + 见血音效
    const g = enemy.group;
    const dx = camera.position.x - g.position.x;
    const dz = camera.position.z - g.position.z;
    const len = Math.hypot(dx, dz) || 1;
    const s = head ? SHAKE_HEAD : SHAKE_HIT;
    addShake(s.amp, s.rot, s.ms, dx / len, dz / len);
    bloodFlash(head ? 0.6 : 0.35);
    sfx.bloodHit(head);
    bloodSfxCount++;
    // 血量数字也闪一下红，视线即使不在 HUD 上也能察觉到"掉了多少"
    hpEl.classList.add('s3-hp-hit');
    window.setTimeout(() => hpEl.classList.remove('s3-hp-hit'), head ? 420 : 260);
    if (currentEncounter) {
      currentEncounter.attacked = true;
      closeEncounter(false);
    }
    if (playerHp <= 0) {
      playerDied();
      return;
    }
    logEvent(`${head ? '被爆头' : '被击中'}：血量剩 ${playerHp}`);
  };

  /**
   * 玩家阵亡：结束本局，进入死亡动画流程。
   * 期间不再接受任何输入（移动 / 射击 / 转视角全停），敌人也停火（step 里直接返回），
   * 但**渲染继续**——否则动画根本播不出来。
   */
  const playerDied = (): void => {
    if (playerDead) return;
    playerDead = true;
    deathStartAt = performance.now();
    stats.deaths++;
    // 连续阵亡计数：完成一局（打满目标人数）才会清零，这里逐次累加
    deathStreak++;
    try {
      localStorage.setItem(STREAK_KEY, String(deathStreak));
    } catch {
      // 存储不可用也不影响本次的嘲讽判定
    }
    // 连续死 3 次开始嘲讽（之后继续嘲讽，不再升级）
    if (deathStreak >= TAUNT_AT) {
      deathTextEl.textContent = '又死了，你个菜鸡';
      deathTextEl.classList.add('is-taunt');
      deathStreakEl.textContent = `连续阵亡 ${deathStreak} 次`;
    } else {
      deathTextEl.textContent = '你死了';
      deathTextEl.classList.remove('is-taunt');
      deathStreakEl.textContent = '';
    }
    logEvent(`玩家阵亡 #${stats.deaths}（血量归零，连续 ${deathStreak} 次）`);
    hpEl.textContent = '0';
    firing = false;
    keys.clear();
    crouching = false;
    // 松开鼠标锁定：玩家接下来要点屏幕返回开始界面
    if (document.pointerLockElement === canvas) void document.exitPointerLock();
    // 阵亡表现：更沉的震动（1.4s）+ 红屏立刻拉满（之后由"渐红到 0.9"接管）+ 倒地闷响
    addShake(SHAKE_DEATH.amp, SHAKE_DEATH.rot, SHAKE_DEATH.ms, 0, 0);
    bloodFlash(DEATH_RED_MAX);
    sfx.deathThud();
    bloodSfxCount++;
  };
  /** 阵亡界面：点击任意处 → 回到开始界面（可以马上再来一局） */
  deathEl.addEventListener('click', () => {
    deathEl.classList.add('hidden');
    playerDead = false;
    running = false;
    resetSessionStats();
    overlay.classList.remove('hidden');
    logEvent('阵亡后返回开始界面');
  });

  /** 达成目标数量 → 结算成绩 */
  const endSession = (): void => {
    sessionOver = true;
    running = false;
    firing = false;
    // 打满目标人数 = 这局没被反杀，连续阵亡清零（嘲讽从零开始）
    deathStreak = 0;
    try {
      localStorage.setItem(STREAK_KEY, '0');
    } catch {
      // 忽略存储异常
    }
    if (document.pointerLockElement === canvas) void document.exitPointerLock();
    const dur = (performance.now() - sessionStartAt) / 1000;
    const acc = stats.shots > 0 ? (stats.hits / stats.shots) * 100 : 0;
    const hsRate = stats.kills > 0 ? (headshotCount / stats.kills) * 100 : 0;
    const avgReact = reactionSamples.length
      ? reactionSamples.reduce((a, b) => a + b, 0) / reactionSamples.length
      : 0;
    const rows: [string, string][] = [
      ['击杀', `${stats.kills} / ${sessionTarget < 999 ? sessionTarget : '∞'}`],
      ['爆头击杀率', `${hsRate.toFixed(1)}%`],
      ['命中率', `${acc.toFixed(1)}%`],
      ['平均反应', `${avgReact.toFixed(0)} ms`],
      ['阵亡', String(stats.deaths)],
      ['用时', `${dur.toFixed(1)} s`],
    ];
    scoreEl.innerHTML = rows
      .map(([k, v]) => `<div class="s3-score-row"><span>${k}</span><b>${v}</b></div>`)
      .join('');
    resultOverlay.classList.remove('hidden');
  };

  const start = (): void => {
    overlay.classList.add('hidden');
    tryLock();
    // 战斗画面全屏：必须在这一下用户手势里同步申请（放到 await 之后就会被浏览器拒绝）。
    // 失败也不影响开打，玩家可以随时按 F 或点菜单里的全屏按钮重试。
    if (autoFullscreen && !document.fullscreenElement) {
      void requestFullscreen().then((ok) => {
        if (!ok) {
          logEvent('自动全屏被浏览器拒绝');
          // 关键：失败了要"说出来"。否则玩家只会觉得"全屏没生效"，
          // 完全不知道是浏览器拦了，也不知道还能按 F 手动进。
          // 延迟 0.9 秒再弹、显示 3 秒：避免和"软件渲染警告"等开局横幅互相覆盖。
          window.setTimeout(
            () => showBanner('浏览器拒绝了自动全屏 → 按 F 手动切换（或回菜单点「全屏（F）」）', 3000),
            900,
          );
        }
      });
    }
    // 关键修复：指针锁定必须在"用户手势"内**同步**申请。
    // 之前放在 await 加载之后申请，已超出浏览器的手势有效期 → 被拒绝 →
    // 鼠标无响应、视角冻住，表现就是"卡住动不了"（重载后偶发成功，所以时好时坏）
    void (async () => {
      if (!sessionReady) {
        // 首次进入：预建敌人池 + 预热着色器/特效
        loadingOverlay.classList.remove('hidden');
        await loadSession(Math.min(sessionTarget, 24));
        loadingOverlay.classList.add('hidden');
        sessionReady = true;
        resetSessionStats();
        logEvent(`开始本局：敌人 ${sessionTarget}，画质 ${qualityLevel}`);
        if (gpuIsSoftware) {
          showBanner('检测到软件渲染（未使用显卡）→ 请在浏览器开启硬件加速');
        }
      } else {
        // 已经加载过（如 Esc 后再进）：直接开始，不重复加载
        resetSessionStats();
      }
      running = true;
      lastT = performance.now();
      // 兜底：若同步申请被拒（Esc 退出后的冷却期），这里再试一次
      if (document.pointerLockElement !== canvas) tryLock();
    })();
  };

  const exit = (): void => {
    running = false;
    firing = false;
    cancelAnimationFrame(rafId);
    if (document.pointerLockElement === canvas) void document.exitPointerLock();
    // 退出战斗就退出全屏（否则重载后会卡在全屏里，玩家以为浏览器坏了）
    if (document.fullscreenElement) void document.exitFullscreen();
    if (stats.shots > 0) {
      const summary = summarizeSession({
        modeId: 'positioning',
        sceneId: '3d-slice',
        sceneName: '3D 试验场景',
        difficultyId: 'normal',
        difficultyName: '普通',
        profileId: '3d',
        profileName: '3D 切片',
        startedAt: stats.startedEpoch,
        durationMs: performance.now() - stats.startedPerf,
        shots: shotRecords,
        wastedShots: 0,
        encounters: encounterRecords,
        moveDir: 1,
      });
      pushSession(summary);
    }
    hooks.onExit();
  };

  // 顺序很关键：**先接上处理器，再启用按钮**。
  // 反过来做的话，在"启用"到"接上处理器"之间点击会丢事件（表现为点了没反应/卡住）
  startBtn.addEventListener('click', start);
  startBtn.textContent = '点击进入';
  startBtn.disabled = false;
  if (startRequested) start();
  // 兜底：开始界面**任意位置**点一下都能进入（避免点击被其它层吃掉导致"点了没反应"）
  overlay.addEventListener('click', (e) => {
    const el = e.target as HTMLElement | null;
    if (el && el.closest('button') && el.closest('button') !== startBtn) return; // 其它按钮不触发
    start();
  });
  /**
   * 性能自检：把场景真实渲染 3 秒，输出帧率与帧时间分布。
   * 这是唯一能在主人机器上直接给出"到底跑不跑得动"的数字的办法。
   */
  benchBtn.addEventListener('click', () => {
    void (async () => {
      benchOut.innerHTML = '采样中…（3 秒，请勿操作）';
      overlay.classList.add('hidden');
      await nextFrame();
      // 预热：先渲染 20 帧，排除首帧编译影响
      for (let i = 0; i < 20; i++) await nextFrame();
      benchSamples = [];
      benchMode = true;
      const t0 = performance.now();
      while (performance.now() - t0 < 3000) await nextFrame();
      benchMode = false;
      overlay.classList.remove('hidden');

      const s = benchSamples.slice().sort((a, b) => a - b);
      const pct = (p: number): number => s[Math.min(s.length - 1, Math.floor(s.length * p))] ?? 0;
      const avg = s.reduce((a, b) => a + b, 0) / Math.max(1, s.length);
      const p95 = pct(0.95);
      const worst = s[s.length - 1] ?? 0;
      const verdict =
        p95 <= 20
          ? '✅ 机器完全跑得动（60 FPS 级）'
          : p95 <= 33
            ? '⚠️ 基本流畅，偶有掉帧'
            : '❌ 渲染吃力（核显/软件渲染，或窗口分辨率过大）';
      const buf = renderer.domElement;
      benchOut.innerHTML = `
        <div class="s3-score-row"><span>版本</span><b>${BUILD_STAMP}</b></div>
        <div class="s3-score-row"><span>渲染器</span><b>${gpuName}</b></div>
        <div class="s3-score-row"><span>帧率</span><b>${(1000 / Math.max(0.01, avg)).toFixed(1)} FPS（均值）</b></div>
        <div class="s3-score-row"><span>帧时间 平均/P95/最差</span><b>${avg.toFixed(1)} / ${p95.toFixed(1)} / ${worst.toFixed(1)} ms</b></div>
        <div class="s3-score-row"><span>渲染缓冲</span><b>${buf.width} × ${buf.height}</b></div>
        <div class="s3-score-row"><span>窗口 / DPR</span><b>${window.innerWidth}×${window.innerHeight} / ${window.devicePixelRatio}</b></div>
        <div class="s3-score-row"><span>画质</span><b>${qualityLevel === 'low' ? '低' : qualityLevel === 'medium' ? '中' : '高'}</b></div>
        <div class="s3-score-row"><span>结论</span><b>${verdict}</b></div>
      `;
    })();
  });
  fullscreenBtn.addEventListener('click', () => void toggleFullscreen());
  coverOnBtn.addEventListener('click', () => {
    coverState.on = true;
    applyCoverSetting();
  });
  coverOffBtn.addEventListener('click', () => {
    coverState.on = false;
    applyCoverSetting();
  });
  againBtn.addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
    resetSessionStats();
    running = true;
    lastT = performance.now();
    tryLock();
  });
  backBtn.addEventListener('click', () => {
    resultOverlay.classList.add('hidden');
    overlay.classList.remove('hidden');
  });
  container.querySelector<HTMLButtonElement>('#s3-quit')!.addEventListener('click', () => {
    running = false;
    hooks.onExit();
  });
  canvas.addEventListener('click', () => {
    if (playerDead) return; // 阵亡时点画面不该再抢锁，而是留给"点击任意处返回"
    // 任何时候点击画面都尝试重新捕获鼠标（避免"没锁上就彻底动不了"）
    if (document.pointerLockElement !== canvas) tryLock();
  });
  document.addEventListener('pointerlockchange', () => {
    // 阵亡时会主动退出指针锁定，别把它当成"玩家暂停"去弹开始菜单
    if (playerDead) return;
    if (document.pointerLockElement === canvas) {
      // 记录锁定时刻：接下来的 120ms 内忽略鼠标位移（防锁定瞬间的补交位移）
      lockAcquiredAt = performance.now();
      return;
    }
    if (running && document.pointerLockElement !== canvas) {
      overlay.classList.remove('hidden');
      running = false;
    }
  });
  // 指针锁定失败（含"不支持 raw input"）→ 下次点击改用普通锁定
  document.addEventListener('pointerlockerror', () => {
    rawInputUnsupported = true;
  });

  /* ---------------- 主循环 ---------------- */
  const loop = (): void => {
    // 先排下一帧：即使本帧逻辑抛异常，循环也不会中断（防止"画面卡住不动"）
    rafId = requestAnimationFrame(loop);
    try {
      step();
    } catch (err) {
      loopError = err instanceof Error ? err.message : String(err);
    }
  };

  const step = (): void => {
    const now = performance.now();
    lastLoopTick = now; // 看门狗心跳
    // 帧率上限 60：高刷屏上不必让显卡跑 144+ 帧，能明显降低驱动层挂起的概率
    // 关键：被跳过的这一段**不能**推进 lastT，否则那段时间就丢了，
    // 高刷屏（120/144Hz）上游戏会变成半速/变速——所以先判门限，再算 dt。
    if (now - lastRenderedAt < 15.5) return;
    lastRenderedAt = now;
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    // 单帧超过 1.2 秒：视为"危险帧"（可能是驱动挂起前兆），立刻降到最低画质并记录
    if (dt >= 0.9) {
      longFrames++;
      if (qualityLevel !== 'low') {
        applyQuality('low');
      }
    }
    // 卡顿统计：单帧超过 400ms 记为一次长卡（用于判断是"持续低帧"还是"周期性卡死"）
    if (dt > 0.4) longFrames++;
    // 注意：上面已按 0.9s 阈值做"危险帧降档"，这里保留 0.4s 的统计口径
    if (dt * 1000 > maxFrameMs) maxFrameMs = dt * 1000;
    if (benchMode) benchSamples.push(dt * 1000);
    if (!running) return;
    // —— 阵亡流程：播死亡动画（倒地 → 约 3 秒后弹出「你死了」）——
    // 这里提前返回，所以移动/射击/敌人 AI 全部停止，但渲染必须继续（否则动画播不出来）。
    if (playerDead) {
      const since = now - deathStartAt;
      const t = Math.min(1, since / DEATH_FALL_MS);
      const fall = 1 - Math.pow(1 - t, 3); // easeOutCubic：先快后慢，像真的被撂倒
      // 第一人称倒地：视线高度掉到 0.34m + 侧倾 + 枪跟着垂下去
      camera.position.set(playerPos.x, CONFIG.eyeHeight - fall * (CONFIG.eyeHeight - 0.34), playerPos.z);
      camera.rotation.set(pitch - fall * 0.26, yaw + fall * 0.42, fall * 1.18);
      rifle.position.set(0.2 + fall * 0.3, -0.2 - fall * 0.62, -0.34 + fall * 0.12);
      rifle.rotation.set(fall * 0.95, 0.05, fall * 0.55);
      flashMesh.material.opacity = 0;
      if (since >= DEATH_TEXT_MS && deathEl.classList.contains('hidden')) {
        deathEl.classList.remove('hidden');
        logEvent('显示阵亡界面');
      }
      updateHurtFx(now); // 倒地期间继续抖 + 画面持续变红
      renderer.render(scene, camera);
      renderFrames++;
      lastRenderDoneAt = performance.now();
      return;
    }
    // 运行中但鼠标没被捕获 → 明确提示（这就是之前"卡住动不了"的可见症状）
    if (running && document.pointerLockElement !== canvas) {
      lockHintEl.classList.remove('hidden');
    } else {
      lockHintEl.classList.add('hidden');
    }

    // —— 视角 ——
    camera.rotation.set(pitch, yaw, 0);

    // —— WASD 移动 + 下蹲 ——
    const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    const wish = new THREE.Vector3();
    if (keys.has('KeyW')) wish.add(forward);
    if (keys.has('KeyS')) wish.sub(forward);
    if (keys.has('KeyD')) wish.add(right);
    if (keys.has('KeyA')) wish.sub(right);
    if (wish.lengthSq() > 0) wish.normalize().multiplyScalar(CONFIG.moveSpeed);
    playerVel.lerp(wish, Math.min(1, dt * 12));
    playerPos.addScaledVector(playerVel, dt);
    // 需求④：移动期间持续清零连射累积（急停后第一发必定精准）
    if (playerVel.length() > 0.4) burst = 0;
    // 活动范围按场景给（长地图更宽、纵深深一点，但仍然离敌人很远）
    playerPos.x = Math.max(-SCENE.player.limitX, Math.min(SCENE.player.limitX, playerPos.x));
    playerPos.z = Math.max(SCENE.player.limitZmin, Math.min(SCENE.player.limitZmax, playerPos.z));
    const eye = crouching ? CONFIG.crouchHeight : CONFIG.eyeHeight;
    camera.position.set(playerPos.x, eye + Math.sin(now * 0.002) * 0.006, playerPos.z);
    camera.position.y += (eye - camera.position.y) * Math.min(1, dt * 10);
    // 实体碰撞：玩家撞不过掩体/墙体（半径 0.38m）
    if (resolveXZ(playerPos, 0.38).lengthSq() > 1e-6) {
      playerVel.multiplyScalar(0.35); // 撞墙后减速，避免贴墙抖动
      camera.position.x = playerPos.x;
      camera.position.z = playerPos.z;
    }

    // —— 步枪后坐力与摆动 ——
    recoil = Math.max(0, recoil - dt * 6.5);
    const sway = -playerVel.x * 0.012;

    // —— 换弹动画（只做表现，不改变 2.5 秒的换弹时长与数值）——
    // t: 0→1 时间轴；分四段：压枪 → 卸匣 → 装匣 → 拉栓复位
    let reloadDip = 0;
    let magDrop = 0;
    let magTilt = 0;
    let chargingPull = 0;
    if (reloading) {
      const t = Math.min(1, (now - reloadStartAt) / RIFLE.reloadMs);
      // 压枪：前 25% 下沉，末 25% 抬起
      reloadDip = t < 0.25 ? t / 0.25 : t > 0.75 ? (1 - t) / 0.25 : 1;
      // 卸匣（20%-45%）→ 空档 → 装匣（55%-80%）
      if (t >= 0.2 && t < 0.45) {
        const k = (t - 0.2) / 0.25;
        magDrop = -0.55 * k;
        magTilt = 1.1 * k;
      } else if (t >= 0.45 && t < 0.55) {
        magDrop = -0.55;
        magTilt = 1.1;
      } else if (t >= 0.55 && t < 0.8) {
        const k = (t - 0.55) / 0.25;
        magDrop = -0.55 * (1 - k);
        magTilt = 1.1 * (1 - k);
      }
      // 拉栓（80%-95%）：一次往返
      if (t >= 0.8 && t < 0.95) {
        chargingPull = Math.sin(((t - 0.8) / 0.15) * Math.PI) * 0.085;
      }
    }
    magPart.position.set(magBase.x, magBase.y + magDrop, magBase.z);
    magPart.rotation.x = magBaseRotX + magTilt;
    chargingPart.position.set(chargingBase.x, chargingBase.y, chargingBase.z - chargingPull);

    rifle.position.set(
      0.16 + sway,
      -0.17 + recoil * 0.03 + reloadDip * -0.14,
      -0.34 + recoil * 0.085 + reloadDip * 0.02,
    );
    rifle.rotation.set(
      recoil * 0.16 + reloadDip * 0.34,
      0.04 + sway * 0.5,
      recoil * 0.05 - reloadDip * 0.16,
    );
    flash.intensity = Math.max(0, flash.intensity - dt * 90);
    flashMesh.material.opacity = Math.max(0, flashMesh.material.opacity - dt * 12);

    // —— 连发 ——
    if (firing && now - lastShot >= RIFLE.fireIntervalMs) shoot();

    // —— 换弹 ——
    if (reloading && now >= reloadEnd) {
      reloading = false;
      ammo = RIFLE.magSize;
      ammoEl.textContent = String(ammo);
      sfx.reloadDone();
    }

    // —— 敌人 AI：等待 → 走出门洞（拉出）→ 停下瞄准 → 开火 ——
    // 【血泪教训 · 画面定格的真凶】
    // 这段 AI 逻辑里原来有一句 `return;`（"跟随路径点时本帧不再做别的"），
    // 在原来的写法下它会直接 return 出整个 step()，把结尾的 renderer.render()
    // 一起跳过 —— 表现就是：画面永久定格、而主循环心跳照常更新（看门狗检测不到）、
    // 控制台没有任何报错、ESC 还能正常响应。
    // 包成 IIFE 之后，AI 内部的 return 只退出这一小段 AI 更新，渲染永远不会被跳过。
    void ((): void => {
      const g = enemy.group;
      // 需求⑦-E：被子弹擦过 / 被打中 → 缩回掩体，换个身位再拉出来（re-peek）
      if (pendingThreat > 0) {
        pendingThreat = 0;
        const tacE = tactics();
        if (tacE.repeatPeek && enemyAI.state !== 'hidden' && enemyAI.state !== 'dead') {
          enemyAI.counters.repeeks++;
          enemyAI.sameOffsetHits++;
          // 同一个身位被吃过三次 → 不再赌小身位，直接大身位横拉
          const wide = enemyAI.sameOffsetHits >= 3;
          enemyAI.peekOffset = pickPeekOffset(wide);
          if (enemyAI.peekOffset >= Math.max(...tacE.peekSet)) enemyAI.counters.wideSwings++;
          const curSide = Math.sign(enemyAI.peekTargetX - enemyAI.coverPos.x) || 1;
          const side = Math.random() < 0.7 ? -curSide : curSide; // 七成概率换另一边
          const towardPlayer = Math.sign(camera.position.z - enemyAI.coverPos.z) || 1;
          enemyAI.peekTargetX = enemyAI.coverPos.x + side * enemyAI.peekOffset;
          enemyAI.peekPos.set(
            enemyAI.peekTargetX,
            0,
            enemyAI.coverPos.z + towardPlayer * (0.9 + Math.random() * 0.8),
          );
          enemyAI.firingSpot = new THREE.Vector3(enemyAI.peekTargetX, 0, enemyAI.peekPos.z);
          enemyAI.badSpots.length = 0;
          enemyAI.aimPose = 0;
          enemyAI.strafePauseT = 0;
          enemyAI.crouchHold = 0;
          // 先缩回掩体、再拉出新身位（有真实的"缩—再拉"过程，不是原地瞬间换位）
          enemyAI.path = [enemyAI.coverPos.clone()];
          enemyAI.state = 'walking';
        }
      }
    if (enemyAI.state === 'hidden') {
      enemyAI.timer -= dt;
      if (enemyAI.timer <= 0 && !sessionOver) {
        // 高难度先做假动作（探一下再缩回），再真正拉出
        enemyAI.state = enemyAI.feintPlan ? 'feinting' : 'walking';
        openEncounter();
      }
    } else if (enemyAI.state === 'feinting') {
      // 需求⑦-B：假动作（jiggle peek / shoulder peek）——只骗枪，不开枪
      //   phase 0：小身位探出（约 0.35m，只露肩）→ phase 1：停一下（这就是骗你开枪的窗口）
      //   → phase 2：缩回掩体 → （极限难度）phase 3：再探第二次（深度不同）→ 真拉出
      // 结束后不是简单走回去，而是接一下"大身位横拉"（B2：jiggle → wide swing）
      const feintT = tactics();
      if (enemyAI.feintPhase === 1) {
        // 探出后原地停顿：站着不动就是给你"打空"的
        enemyAI.timer -= dt;
        facePlayer();
        enemy.leftLeg.rotation.x = 0;
        enemy.rightLeg.rotation.x = 0;
        if (enemyAI.timer <= 0) enemyAI.feintPhase = 2;
        return;
      }
      const phaseTarget =
        enemyAI.feintPhase === 3 ? enemyAI.feintPos2 : enemyAI.feintPhase === 0 ? enemyAI.feintPos : enemyAI.coverPos;
      const dir = phaseTarget.clone().sub(g.position);
      const dist = dir.length();
      if (dist > 0.05) {
        dir.normalize();
        g.position.addScaledVector(dir, CONFIG.enemySpeed * 1.6 * enemyAI.speedJitter * dt);
        // 注意：敌人的碰撞暂时关闭——严格碰撞会在掩体拐角处把敌人卡死（已实测）。
        // 玩家侧掩体仍是实体（挡人挡弹）。
        g.rotation.y = Math.atan2(dir.x, dir.z) + Math.PI;
        enemyAI.walkPhase += dt * 9;
        const swing = Math.sin(enemyAI.walkPhase) * 0.5;
        enemy.leftLeg.rotation.x = swing;
        enemy.rightLeg.rotation.x = -swing;
        return;
      }
      if (enemyAI.feintPhase === 0) {
        enemyAI.feintPhase = 1;
        enemyAI.timer = 0.16 + Math.random() * 0.22; // 探出后的停留（骗枪窗口）
        facePlayer();
        return;
      }
      if (enemyAI.feintPhase === 2 && feintT.feintDouble) {
        enemyAI.feintPhase = 3; // 极限：再来一次小身位探出
        return;
      }
      // 假动作结束：统计 → （高难度）有概率换掩体 → 转成大身位横拉
      enemyAI.counters.feints++;
      if (enemyAI.canChangeCover && Math.random() < 0.45) {
        const next = pickSpawnPoint();
        // 需求⑦-H：换掩体必须**走过去**——原来这里直接把坐标设过去（瞬移），
        // 在玩家眼里就是"凭空出现在另一个箱子后面"，属于要修掉的穿帮。
        enemyAI.coverName = next.id;
        enemyAI.coverPos.set(next.x, 0, next.z);
        enemyAI.path = [new THREE.Vector3(next.x, 0, next.z)];
        enemyAI.firingSpot = null;
        enemyAI.badSpots.length = 0;
        enemyAI.counters.coverChanges++;
        lastSpawn = {
          seq: lastSpawn.seq + 1,
          visible: isVisibleFromPlayer(new THREE.Vector3(next.x, 0, next.z)),
          distance: +Math.hypot(next.x - camera.position.x, next.z - camera.position.z).toFixed(2),
          cover: next.id,
          difficulty: sliceDiff,
          fallback: next.fallback,
          cameraY: +camera.position.y.toFixed(2),
          x: +next.x.toFixed(2),
          z: +next.z.toFixed(2),
        };
      }
      // B2：真正的横拉用"大身位"，并且直接把枪线位定在这个身位上
      enemyAI.peekOffset = pickPeekOffset(true);
      const swingSide = Math.random() < 0.5 ? -1 : 1;
      const towardPlayer = Math.sign(camera.position.z - enemyAI.coverPos.z) || 1;
      enemyAI.peekTargetX = enemyAI.coverPos.x + swingSide * enemyAI.peekOffset;
      enemyAI.peekPos.set(enemyAI.peekTargetX, 0, enemyAI.coverPos.z + towardPlayer * (0.9 + Math.random() * 0.8));
      if (enemyAI.peekOffset >= Math.max(...feintT.peekSet)) enemyAI.counters.wideSwings++;
      enemyAI.firingSpot = new THREE.Vector3(enemyAI.peekTargetX, 0, enemyAI.peekPos.z);
      enemyAI.badSpots.length = 0;
      enemyAI.feintPlan = false;
      enemyAI.state = 'walking';
    } else if (enemyAI.state === 'walking') {
      // 移动目标 = 把枪线挪到玩家身上（不是走到玩家身边）
      const speed = CONFIG.enemySpeed * enemyAI.speedJitter;
      // 1) 门后刷新：先穿门洞（中转点）
      if (enemyAI.path.length > 0) {
        const wp = enemyAI.path[0];
        const dBefore = Math.hypot(wp.x - g.position.x, wp.z - g.position.z);
        if (moveEnemyTo(wp, speed, dt)) enemyAI.path.shift();
        const dAfter = Math.hypot(wp.x - g.position.x, wp.z - g.position.z);
        // 路径点被别的掩体挡住 / 卡在角落永远走不到时，1.5 秒没进展就丢掉这个点。
        // 否则敌人会永远停在"走路"状态：既不出场也不开火（曾经 = 玩家干等）。
        enemyAI.pathStallT = dAfter < dBefore - 0.02 ? 0 : enemyAI.pathStallT + dt;
        if (enemyAI.pathStallT > 1.5) {
          enemyAI.pathStallT = 0;
          enemyAI.path.shift();
        }
        // 这里允许 return：它只退出本帧的 AI 更新（IIFE 内部），
        // 不会再跳过 step() 结尾的 renderer.render()。
        return;
      }
      // 2) 横向侧步到"能看见玩家"的枪线位
      if (!enemyAI.firingSpot) enemyAI.firingSpot = findFiringSpot();
      const lastDist = enemyAI.firingSpot.distanceTo(g.position);
      const arrived = moveEnemyTo(enemyAI.firingSpot, speed, dt);
      const newDist = enemyAI.firingSpot.distanceTo(g.position);
      // 卡住检测：1.2 秒没有进展 → 换一个候选枪线位
      enemyAI.stallT = newDist < lastDist - 0.02 ? 0 : enemyAI.stallT + dt;
      if (enemyAI.stallT > 1.2) {
        enemyAI.badSpots.push(enemyAI.firingSpot.clone());
        enemyAI.firingSpot = findFiringSpot();
        enemyAI.stallT = 0;
      }
      // 枪线已覆盖玩家（或已到位）→ 停下开火
      if (arrived || enemyLineClear(g.position.x, g.position.z)) {
        enemyAI.state = 'aiming';
        // 需求⑦-G：出手节奏——秒拉(<1)/正常/长架(>1)，避免玩家摸到固定节拍
        // 需求：停下后必定在 0.2~0.5s 内开火（难度越高越短）
        enemyAI.timer = enemyFireDelay();
        enemyAI.strafeWaitT = 0;
        enemy.leftLeg.rotation.x = 0;
        enemy.rightLeg.rotation.x = 0;
        facePlayer();
        if (enemyAI.crouch) {
          g.scale.set(1, 0.86, 1);
          g.position.y = -0.06;
        }
      }
    } else if (enemyAI.state === 'aiming') {
      // 举枪瞄准姿态：双臂前伸，随瞄准进度抬起
      enemyAI.aimPose = Math.min(1, enemyAI.aimPose + dt * 3);
      enemy.leftArm.rotation.x = -1.25 * enemyAI.aimPose;
      enemy.rightArm.rotation.x = -1.35 * enemyAI.aimPose;
      // 需求⑦-C：对枪节奏——高手不会匀速直线横移，而是"变向 + 随机急停"
      // （counter-strafe：把最准的一枪压在急停那一瞬间）
      if (enemyAI.strafeShoot) {
        const tac = tactics();
        enemyAI.strafeSeconds += dt;
        if (enemyAI.strafePauseT > 0) {
          enemyAI.strafePauseT -= dt; // 急停：这一段完全不动
        } else {
          enemyAI.strafeNextChange -= dt;
          if (enemyAI.strafeNextChange <= 0) {
            if (Math.abs(g.position.x) > 5.6) {
              enemyAI.strafeDir = -enemyAI.strafeDir;
            } else if (Math.random() < tac.strafePause) {
              enemyAI.strafePauseT = 0.1 + Math.random() * 0.18;
              enemyAI.strafeWaitT = 0;
            } else {
              enemyAI.strafeDir = -enemyAI.strafeDir;
              enemyAI.counters.strafeReversals++;
            }
            enemyAI.strafeNextChange = 0.25 + Math.random() * 0.45;
          }
          g.position.x += enemyAI.strafeDir * 1.15 * dt;
          if (Math.abs(g.position.x) > 5.6) enemyAI.strafeDir = -enemyAI.strafeDir;
          // 横移也不能穿进掩体里（沿用统一的碰撞推挤）
          resolveXZ(g.position, 0.4);
        }
      }
      // 需求⑦-D：蹲起（crouch spam）——蹲下时头位从 1.63m 掉到约 1.40m，
      // 你原本压在爆头线上的准星就打空了；起身再打你一套。高手对枪的常见动作。
      const tacD = tactics();
      if (enemyAI.crouchHold > 0) {
        enemyAI.crouchHold -= dt;
      } else if (Math.random() < tacD.crouchSpam * dt * 1.3) {
        enemyAI.crouchHold = 0.35 + Math.random() * 0.55;
        enemyAI.counters.crouchToggles++;
      }
      const wantCrouch = enemyAI.crouch || enemyAI.crouchHold > 0;
      const wantScaleY = wantCrouch ? 0.86 : 1;
      if (Math.abs(g.scale.y - wantScaleY) > 0.002) {
        g.scale.y += (wantScaleY - g.scale.y) * Math.min(1, dt * 10);
        g.position.y = (-0.06 * (1 - g.scale.y)) / 0.14;
      }
      // 面向玩家
      const toPlayer = new THREE.Vector3(playerPos.x - g.position.x, 0, playerPos.z - g.position.z);
      g.rotation.y = Math.atan2(toPlayer.x, toPlayer.z) + Math.PI;
      // 真实遮挡：玩家躲在掩体后 → 敌人看不见就不开火，并侧移换角度找人
      const hasLos = enemyHasLineOfSight();
      if (!hasLos) {
        enemyAI.blocked += dt;
        // 玩家躲好了：这一枪不该"憋着"等他探头再秒射（那是零反应时间）。
        // 躲超过 0.5 秒就重置前摇，玩家重新露头时仍然有完整的反应窗口。
        if (enemyAI.blocked > 0.5) enemyAI.timer = Math.max(enemyAI.timer, enemyFireDelay());
        if (enemyAI.blocked > 1.2) {
          enemyAI.blocked = 0;
          if (enemyAI.canChangeCover) {
            // 高难度：换个掩体绕角度——同样是**走过去**，不瞬移（需求⑦-H）
            const next = pickSpawnPoint();
            enemyAI.coverName = next.id;
            enemyAI.coverPos.set(next.x, 0, next.z);
            enemyAI.counters.coverChanges++;
            const side = Math.random() < 0.5 ? -1 : 1;
            const offset = pickPeekOffset(true);
            enemyAI.peekTargetX = next.x + side * offset;
            enemyAI.peekPos.set(enemyAI.peekTargetX, 0, next.z + 1.1 + Math.random() * 0.9);
            enemyAI.path = [new THREE.Vector3(next.x, 0, next.z)];
            enemyAI.firingSpot = null;
            enemyAI.badSpots.length = 0;
          } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            enemyAI.peekPos.x = Math.max(-5.6, Math.min(5.6, g.position.x + side * 1.1));
          }
          enemyAI.state = 'walking';
        }
      } else {
        // 只有真的看得见玩家时，开火前摇才推进
        enemyAI.timer -= dt;
        enemyAI.blocked = 0;
        if (enemyAI.timer > 0) return;
        // 到点就开：不再为了"等一个急停"而延后（那会破坏 0.2~0.5s 必然开火的规则）
        enemyAI.strafeWaitT = 0;
        enemyAI.blocked = 0;
        // 开火：按难度掷命中/爆头，命中才走受伤逻辑
        enemyFire();
        if (playerDead) return; // 已经阵亡：不再安排下一枪
        // 没死就继续：下一枪同样在 0.2~0.5s 内打出（提高了开火频率，但"停下"的节奏不变）
        enemyAI.timer = enemyFireDelay();
      }
    } else if (enemyAI.state === 'dead') {
      // 倒地动画（放慢，并保留尸体一小段时间，避免看起来"打死又复活"）
      enemyAI.dieProgress = Math.min(1, enemyAI.dieProgress + dt * 1.1);
      g.rotation.x = -enemyAI.dieProgress * 1.35;
      g.position.y = -enemyAI.dieProgress * 0.18;
      if (enemyAI.dieProgress >= 1) {
        enemyAI.timer += dt;
        if (enemyAI.timer > 1.0) resetEnemy();
      }
    }
    })();

    // 注意：不显示敌人血条——它会透过掩体暴露敌人位置（命中反馈用受击红闪/血雾/伤害数字）

    // —— 火花衰减 ——
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt;
      s.vel.y -= 4.5 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      if (s.life <= 0) {
        scene.remove(s.mesh);
        sparks.splice(i, 1);
      }
    }

    accEl.textContent = stats.shots > 0 ? `${Math.round((stats.hits / stats.shots) * 100)}%` : '--';

    // —— 性能采样：FPS / 帧时间 / 绘制批次 + 自动降画质 ——
    perfFrames++;
    perfAccum += dt;
    if (perfAccum >= 0.5) {
      const fps = perfFrames / perfAccum;
      const info = renderer.info.render;
      perfEl.textContent =
        `${fps.toFixed(0)} FPS · ${(1000 / Math.max(1, fps)).toFixed(1)} ms · ` +
        `${info.calls} draws · ${(info.triangles / 1000).toFixed(1)}k tri · ` +
        `dpr ${renderer.getPixelRatio().toFixed(2)} · 画质 ${qualityLevel === 'low' ? '低' : qualityLevel === 'medium' ? '中' : '高'}` +
        `\nGPU: ${gpuName}` +
        ` · 鼠标输入 ${rawInputUnsupported ? '普通（系统加速可能介入）' : '原始'}` +
        (gpuIsSoftware ? ' ⚠ 软件渲染（未用显卡）' : '') +
        (spikeCount > 0 ? ` · 位移尖峰 ${spikeCount}` : '') +
        (longFrames > 0 ? ` · 长卡 ${longFrames}` : '') +
        (loopError ? ` · 异常：${loopError}` : '');
      if (autoQuality && running) {
        autoSamples.push(fps);
        if (autoSamples.length >= 6) {
          const avg = autoSamples.reduce((a, b) => a + b, 0) / autoSamples.length;
          if (avg < 45 && qualityLevel === 'high') {
            applyQuality('medium');
            showBanner(`帧率 ${avg.toFixed(0)}，已自动降到中等画质`);
          } else if (avg < 40 && qualityLevel === 'medium') {
            applyQuality('low');
            showBanner(`帧率 ${avg.toFixed(0)}，已自动降到低画质（关阴影）`);
          }
          autoSamples.length = 0;
        }
      }
      perfFrames = 0;
      perfAccum = 0;
    }
    updateHurtFx(now); // 受击震动叠加 + 红屏透明度（必须在相机变换之后、渲染之前）
    renderer.render(scene, camera);
    renderFrames++; // 诊断：真实出图计数（看门狗的另一路心跳）
    lastRenderDoneAt = performance.now();
  };
  rafId = requestAnimationFrame(loop);

  // 清理：退出 3D 切片时解绑所有监听
  return () => {
    cancelAnimationFrame(rafId);
    running = false;
    ro.disconnect();
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
