import type {
  Cover,
  CrosshairStyle,
  EncounterRecord,
  SceneConfig,
  SensitivityProfile,
  SessionSummary,
  ShotRecord,
} from '../types';
import { pxPerCount } from '../config/sensitivity';
import { effectiveEnemy, type DifficultyConfig, type EffectiveEnemy } from '../config/difficulty';
import type { ModeConfig } from '../config/modes';
import { effectiveSpread, RIFLE, sampleBulletOffset, shouldResetBurst, SPRAY } from '../config/spray';
import { DAMAGE, shotDamage } from '../config/damage';
import { clamp, rand } from '../utils/math';
import { hitZone, type Circle, type Rect } from './hitTest';
import { InputManager } from './input';
import { sfx } from './sfx';
import {
  drawArena,
  drawBlood,
  drawCasing,
  drawCrosshair,
  drawDust,
  drawEnemy,
  drawEnemyHpBar,
  drawFloatTexts,
  drawHitMarkers,
  drawMuzzleFlash,
  drawSceneBack,
  drawSceneFront,
  drawSceneLighting,
  drawTracer,
  drawViewmodel,
  viewmodelMuzzle,
  type BloodFx,
  type CasingFx,
  type DustFx,
  type FloatTextFx,
  type HitMarker,
  type TracerFx,
} from './renderer';
import { summarizeSession } from '../stats/metrics';

export interface GameHooks {
  getProfile: () => SensitivityProfile;
  getCrosshair: () => CrosshairStyle;
  onStats: (summary: SessionSummary) => void;
  onPause: () => void;
  onHotkey: (code: string) => void;
  onSensAdjust: (deltaY: number) => void;
  onShot: (hit: boolean, headshot: boolean) => void;
  onPlayerDown: () => void;
  onKill: (info: { headshot: boolean; reactionMs: number; streak: number; shots: number }) => void;
  getAmmoMode: () => string;
}

export interface LiveStats {
  shots: number;
  hits: number;
  headshots: number;
  kills: number;
  encounters: number;
  accuracy: number;
  firstShotRate: number;
  avgReactionMs: number;
  streak: number;
  overshoots: number;
  undershoots: number;
  flickTimeMs: number;
  flickDistPx: number;
  preaimErrPx: number;
  displacementPx: number;
  trackPct: number;
  deaths: number;
  ammo: number;
  magSize: number;
  reloading: boolean;
  moving: boolean;
  crouching: boolean;
}

type EnemyState = 'waiting' | 'active' | 'dead';
type EnemyPhase = 'approach' | 'move' | 'hold' | 'retreat';

class Enemy {
  state: EnemyState = 'waiting';
  x = 0;
  y = 0;
  appearAt = 0;
  waitUntil = 0;
  phase: EnemyPhase = 'approach';
  phaseUntil = 0;
  opIdx = 0;
  scale = 1;
  approachStartAt = 0;
  approachDur = 1;
  speedFactor = 1;
  bobY = 0;
  popUp = true;
  popUntil = 0;
  shotsFired = 0;
  firstShotAt: number | null = null;
  firstShotHit = false;
  firstShotHead = false;
  killed = false;
  escaped = false;
  hitFlash = 0;
  killFlash = 0;
  flickDistPx: number | null = null;
  preaimErrPx: number | null = null;
  maxDisp = 0;
  initCX = 0;
  initCY = 0;
  trackMs = 0;
  activeDurMs = 0;
  retreatX = 0;
  holdX = 0;
  coverDir = 1;
  cover: Cover | null = null;
  targetScale = 1;
  crouch = false;
  attackAt: number | null = null;
  attacked = false;
  hp = DAMAGE.maxHp;
  deathProgress = 0;
  hpVisibleUntil = 0;
  bloodLevel = 0;
  /** 纵深：拉出掩体后走向玩家 */
  depth = 0;
}

const FLICK_ENEMY: EffectiveEnemy = {
  speed: 0,
  headR: 0.02,
  bodyW: 0.055,
  bodyH: 0.22,
  waitMin: 300,
  waitMax: 300,
  moveDir: 1,
  jitter: 0,
  bobAmp: 0,
  attackMul: 1,
};

const FLICK_POSITIONS = [0.12, 0.88];
const FLICK_HEAD_Y = 0.4;
const FLICK_VISIBLE_MS = 2200;
const PREAIM_VISIBLE_MS = 1200;
const PEEK_OFFSETS = [0.5, 1, 1.5, 2.5];
const PEEK_SCALES = [0.6, 0.75, 0.9, 1];
const CROSS_SCALES = [0.8, 0.9, 1, 1];

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mode: ModeConfig;
  private scene: SceneConfig | null;
  private cfg: EffectiveEnemy;
  private difficulty: DifficultyConfig;
  private hooks: GameHooks;
  private input: InputManager;
  private raf = 0;
  private last = 0;
  private running = false;
  private locked = false;
  private sessionEnded = false;
  private width = 0;
  private height = 0;

  private crosshair = { x: 0, y: 0 };
  private enemy = new Enemy();
  private targetId = 0;
  private shots: ShotRecord[] = [];
  private encounters: EncounterRecord[] = [];
  private markers: HitMarker[] = [];
  private streak = 0;
  private maxStreak = 0;
  private startedAt = 0;
  private startedEpoch = 0;
  private flickSide = 0;
  private prevTarget: { x: number; y: number } | null = null;
  private swayX = 0;
  private swayY = 0;
  private swayVX = 0;
  private swayVY = 0;
  private lastShotAt = 0;
  private burstCount = 0;
  private casings: CasingFx[] = [];
  private tracers: TracerFx[] = [];
  private muzzleUntil = 0;
  private blood: BloodFx[] = [];
  private texts: FloatTextFx[] = [];
  private dust: DustFx[] = [];
  private decals: { x: number; y: number; t: number }[] = [];
  private wastedShots = 0;
  private weaponImg: HTMLImageElement | null = null;
  private weaponReady = false;
  private ammo = RIFLE.magSize;
  private reloading = false;
  private reloadUntil = 0;
  private triggerHeld = false;
  private lastEmptyAt = 0;
  private playerX = 0;
  private playerVel = 0;
  private moveLeft = false;
  private moveRight = false;
  private crouching = false;
  private lookX = 0;
  private lookY = 0;
  private recoilKickY = 0;

  constructor(
    canvas: HTMLCanvasElement,
    mode: ModeConfig,
    scene: SceneConfig | null,
    difficulty: DifficultyConfig,
    hooks: GameHooks,
  ) {
    this.canvas = canvas;
    this.mode = mode;
    this.scene = scene;
    this.difficulty = difficulty;
    this.hooks = hooks;
    this.cfg = mode.behavior === 'flick' ? FLICK_ENEMY : scene ? effectiveEnemy(scene, difficulty) : FLICK_ENEMY;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('无法获取 Canvas 2D 上下文');
    this.ctx = ctx;

    this.input = new InputManager(canvas, {
      onMove: (dx, dy) => this.onMove(dx, dy),
      onTriggerDown: () => this.triggerDown(),
      onTriggerUp: () => this.triggerUp(),
      onHotkey: (code) => {
        if (code === 'KeyA') {
          this.moveLeft = true;
          return;
        }
        if (code === 'KeyD') {
          this.moveRight = true;
          return;
        }
        if (code === 'ControlLeft' || code === 'ControlRight') {
          this.crouching = true;
          return;
        }
        if (code === 'KeyR') {
          this.reload();
          return;
        }
        this.hooks.onHotkey(code);
      },
      onKeyUp: (code) => this.keyUp(code),
      onSensAdjust: (deltaY) => this.hooks.onSensAdjust(deltaY),
    });
    this.input.setLockChangeHandler((locked) => {
      this.locked = locked;
      if (!locked && this.running && !this.sessionEnded) {
        this.pause();
        this.hooks.onPause();
      }
    });
    this.resize();
  }

  start(): void {
    this.input.attach();
    window.addEventListener('resize', this.resize);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.crosshair = { x: this.width / 2, y: this.height / 2 };
    this.lookX = 0;
    this.lookY = 0;
    this.recoilKickY = 0;
    this.playerX = 0;
    this.playerVel = 0;
    // 素材抠图枪模（加载失败则回退到 Canvas 绘制的枪）
    if (!this.weaponImg) {
      const img = new Image();
      img.onload = () => {
        this.weaponReady = true;
      };
      img.src = '/weapon-cutout.png';
      this.weaponImg = img;
    }
    // 空气中的尘埃（氛围）
    this.dust = [];
    for (let i = 0; i < 42; i++) {
      this.dust.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: 0.8 + Math.random() * 1.8,
        speed: 0.06 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      });
    }
    this.startedAt = performance.now();
    this.startedEpoch = Date.now();
    this.ammo = RIFLE.magSize;
    this.reloading = false;
    this.burstCount = 0;
    this.startWaiting(performance.now());
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  pause(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  resume(): void {
    if (this.sessionEnded) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.loop);
  }

  dispose(): void {
    this.sessionEnded = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.input.detach();
    window.removeEventListener('resize', this.resize);
    if (document.pointerLockElement === this.canvas) {
      void document.exitPointerLock();
    }
  }

  endSession(): void {
    if (this.sessionEnded) return;
    this.sessionEnded = true;
    this.pause();
    const profile = this.hooks.getProfile();
    const summary = summarizeSession({
      modeId: this.mode.id,
      sceneId: this.scene?.id ?? 'arena',
      sceneName: this.scene?.name ?? '竞技场',
      difficultyId: this.difficulty.id,
      difficultyName: this.difficulty.name,
      profileId: profile.id,
      profileName: profile.name,
      startedAt: this.startedEpoch,
      durationMs: performance.now() - this.startedAt,
      shots: this.shots,
      wastedShots: this.wastedShots,
      encounters: this.encounters,
      moveDir: this.cfg.moveDir,
    });
    this.hooks.onStats(summary);
  }

  requestLock(): void {
    this.input.requestLock();
  }

  private camX(): number {
    return clamp(this.playerX + this.lookX, -this.width * 0.45, this.width * 0.45);
  }

  private camY(): number {
    return clamp(
      (this.crouching ? this.height * 0.04 : 0) + this.lookY + this.recoilKickY,
      -this.height * 0.25,
      this.height * 0.25,
    );
  }

  /** 纵深越大越靠近玩家（体型放大） */
  private enemyDepthScale(): number {
    return this.enemy.scale * (1 + this.enemy.depth * 0.5);
  }

  private enemyFeetDrop(): number {
    return this.enemy.depth * this.height * 0.1;
  }

  liveStats(): LiveStats {
    const shots = this.shots.length;
    const hits = this.shots.filter((s) => s.hit).length;
    const headshots = this.shots.filter((s) => s.head).length;
    const kills = this.encounters.filter((e) => e.killed).length;
    const withFirstShot = this.encounters.filter((e) => e.firstShotAt != null);
    const reactionSum = withFirstShot.reduce((sum, e) => sum + ((e.firstShotAt ?? 0) - e.appearAt), 0);
    const flickKills = this.encounters.filter((e) => e.killed && e.killAt != null && this.mode.id === 'flick');
    const flickSum = flickKills.reduce((sum, e) => sum + ((e.killAt ?? 0) - e.appearAt), 0);
    const avg = (arr: number[]): number => (arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const trackTotal = this.encounters.reduce((sum, e) => sum + (e.trackMs ?? 0), 0);
    const activeTotal = this.encounters.reduce((sum, e) => sum + (e.activeDurMs ?? 0), 0);
    return {
      shots,
      hits,
      headshots,
      kills,
      encounters: this.encounters.length,
      accuracy: shots > 0 ? hits / shots : 0,
      firstShotRate:
        this.encounters.length > 0
          ? this.encounters.filter((e) => e.firstShotHit).length / this.encounters.length
          : 0,
      avgReactionMs: withFirstShot.length > 0 ? reactionSum / withFirstShot.length : 0,
      streak: this.streak,
      overshoots: 0,
      undershoots: 0,
      flickTimeMs: flickKills.length > 0 ? flickSum / flickKills.length : 0,
      flickDistPx: avg(this.encounters.filter((e) => e.flickDistPx != null).map((e) => e.flickDistPx ?? 0)),
      preaimErrPx: avg(this.encounters.filter((e) => e.preaimErrPx != null).map((e) => e.preaimErrPx ?? 0)),
      displacementPx: avg(
        this.encounters.filter((e) => e.displacementPx != null).map((e) => e.displacementPx ?? 0),
      ),
      trackPct: activeTotal > 0 ? (trackTotal / activeTotal) * 100 : 0,
      deaths: this.encounters.filter((e) => e.attacked).length,
      ammo: this.ammo,
      magSize: RIFLE.magSize,
      reloading: this.reloading,
      moving: Math.abs(this.playerVel) > 30,
      crouching: this.crouching,
    };
  }

  private loop = (now: number): void => {
    if (!this.running) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.update(dt, now);
    this.render(now);
    this.raf = requestAnimationFrame(this.loop);
  };

  private update(dt: number, now: number): void {
    const e = this.enemy;

    // 需求④：只要玩家在移动，立刻打断连射累积（停下后重新从"前两发精准"开始）
    if (Math.abs(this.playerVel) > 30) this.burstCount = 0;

    // 玩家移动（AD 横移）与下蹲
    const dir = (this.moveRight ? 1 : 0) - (this.moveLeft ? 1 : 0);
    const accel = 2400;
    const maxV = 420;
    if (dir !== 0) {
      this.playerVel += dir * accel * dt;
    } else {
      this.playerVel *= Math.exp(-8 * dt);
    }
    this.playerVel = clamp(this.playerVel, -maxV, maxV);
    this.playerX += this.playerVel * dt;
    const limit = this.width * 0.35;
    if (this.playerX > limit) {
      this.playerX = limit;
      this.playerVel = 0;
    }
    if (this.playerX < -limit) {
      this.playerX = -limit;
      this.playerVel = 0;
    }

    // 换弹完成
    if (this.reloading && now >= this.reloadUntil) {
      this.reloading = false;
      this.ammo = RIFLE.magSize;
      this.burstCount = 0;
      sfx.reloadDone();
    }

    // 全自动连发
    if (
      this.triggerHeld &&
      !this.reloading &&
      this.ammo > 0 &&
      now - this.lastShotAt >= RIFLE.fireIntervalMs
    ) {
      this.fire();
    }

    if (e.state === 'waiting') {
      // 换弹时敌人不出现（真实弹匣模式）
      if (this.reloading) {
        e.waitUntil = Math.max(e.waitUntil, this.reloadUntil + 120);
      } else if (now >= e.waitUntil) {
        this.activate(now);
      }
    } else if (e.state === 'active') {
      this.updateActive(dt, now);
    } else if (e.state === 'dead') {
      e.killFlash = Math.max(0, e.killFlash - dt);
      e.deathProgress = Math.min(1, e.deathProgress + dt / 0.35);
      if (e.deathProgress >= 1 && e.killFlash <= 0) this.startWaiting(now);
    }
    e.hitFlash = Math.max(0, e.hitFlash - dt);

    // 血液粒子
    for (const b of this.blood) {
      b.vy += 900 * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
    }
    this.blood = this.blood.filter((b) => b.life > 0);
    this.texts = this.texts.filter((t) => now - t.t < t.life);

    // 弹壳物理
    for (const c of this.casings) {
      c.vy += 1600 * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      c.rot += c.vrot * dt;
      c.life -= dt;
    }
    this.casings = this.casings.filter((c) => c.life > 0);
  }

  private activate(now: number): void {
    const e = this.enemy;
    const W = this.width;
    const H = this.height;
    const cfg = this.cfg;
    const halfW = (cfg.bodyW * W) / 2;

    e.state = 'active';
    e.appearAt = now;
    e.shotsFired = 0;
    e.firstShotAt = null;
    e.firstShotHit = false;
    e.firstShotHead = false;
    e.killed = false;
    e.escaped = false;
    e.initCX = this.camX();
    e.initCY = this.camY();
    e.maxDisp = 0;
    e.trackMs = 0;
    e.activeDurMs = 0;
    e.scale = 1;
    e.bobY = 0;
    e.crouch = false;
    e.attackAt = null;
    e.attacked = false;
    e.hp = DAMAGE.maxHp;
    e.deathProgress = 0;
    e.bloodLevel = 0;
    e.depth = 0;
    e.speedFactor = 1 + rand(-cfg.jitter, cfg.jitter);
    this.targetId++;

    if (this.mode.behavior === 'flick') {
      e.x = this.camX() + W * FLICK_POSITIONS[this.flickSide];
      e.y = H * FLICK_HEAD_Y;
      e.flickDistPx = this.prevTarget ? Math.hypot(e.x - this.prevTarget.x, e.y - this.prevTarget.y) : null;
      this.prevTarget = { x: e.x, y: e.y };
      e.phase = 'approach';
      e.scale = 0.7;
      e.targetScale = 1;
      e.approachStartAt = now;
      e.approachDur = 130;
      e.opIdx = 0;
      return;
    }

    const scene = this.scene;
    if (!scene) return;
    const opIdx = scene.kind === 'dual-cross' ? Math.floor(Math.random() * scene.openings.length) : 0;
    const op = scene.openings[opIdx];
    const opX = op.x * W;
    const opRight = (op.x + op.width) * W;
    const headLine = scene.headLines[Math.floor(Math.random() * scene.headLines.length)];
    e.opIdx = opIdx;
    e.y = headLine * H;

    if (this.mode.behavior === 'stationary') {
      // 预瞄：从随机掩体边缘探入随机身位/远近，停顿后缩回，可能蹲下，停下会攻击
      const cover =
        scene.covers && scene.covers.length > 0
          ? scene.covers[Math.floor(Math.random() * scene.covers.length)]
          : { id: 'default', x: cfg.moveDir > 0 ? op.x : op.x + op.width, edge: cfg.moveDir > 0 ? 'left' : 'right', clip: op };
      const dir = cover.edge === 'right' ? -1 : 1;
      const targetScale = PEEK_SCALES[Math.floor(Math.random() * PEEK_SCALES.length)];
      const offset =
        PEEK_OFFSETS[Math.floor(Math.random() * PEEK_OFFSETS.length)] * cfg.bodyW * W * targetScale;
      const coverX = cover.x * W;
      const targetX = coverX + dir * offset;
      e.x = coverX - dir * (halfW * 0.5 + 6);
      e.preaimErrPx = Math.hypot(this.crosshair.x - targetX, this.crosshair.y - e.y);
      e.targetScale = targetScale;
      e.scale = targetScale;
      e.crouch = Math.random() < 0.35;
      e.cover = cover as Cover;
      e.coverDir = dir;
      e.phase = 'move';
      e.phaseUntil = now + 300;
      e.retreatX = e.x;
      e.holdX = targetX;
      return;
    }

    e.preaimErrPx = null;
    if (scene.kind === 'peek') {
      // 随机掩体（右墙/木箱/左墙）+ 随机身位 + 远近 + 可能蹲下
      const cover =
        scene.covers && scene.covers.length > 0
          ? scene.covers[Math.floor(Math.random() * scene.covers.length)]
          : { id: 'default', x: scene.wall.left, edge: 'right', clip: scene.openings[0] };
      const dir = cover.edge === 'right' ? -1 : 1;
      const targetScale = PEEK_SCALES[Math.floor(Math.random() * PEEK_SCALES.length)];
      const offset =
        PEEK_OFFSETS[Math.floor(Math.random() * PEEK_OFFSETS.length)] * cfg.bodyW * W * targetScale;
      const coverX = cover.x * W;
      e.targetScale = targetScale;
      e.scale = targetScale;
      e.crouch = Math.random() < 0.35;
      e.cover = cover as Cover;
      e.coverDir = dir;
      e.holdX = coverX + dir * offset;
      e.retreatX = coverX - dir * (halfW + 60);
      e.x = e.retreatX;
      e.phase = 'move';
      e.phaseUntil = 0;
    } else if (scene.kind === 'cover-pop') {
      e.cover = null;
      e.targetScale = 1;
      e.x = cfg.moveDir > 0 ? opX - halfW - 60 : opRight + halfW + 60;
      e.phase = 'move';
      e.popUp = true;
      e.popUntil = now + (scene.cover?.upMs ?? 650);
    } else {
      // 纵深出场：从门洞深处走近（脚底锚定缩放），再横移穿过
      e.cover = null;
      e.targetScale = CROSS_SCALES[Math.floor(Math.random() * CROSS_SCALES.length)];
      e.x = opX + (op.width * W) / 2;
      e.phase = 'approach';
      e.scale = 0.55;
      e.approachStartAt = now;
      e.approachDur = rand(380, 620);
    }
  }

  private updateActive(dt: number, now: number): void {
    const e = this.enemy;
    const cfg = this.cfg;
    const W = this.width;
    const scene = this.scene;

    // 位移追踪
    if (this.mode.behavior !== 'flick') {
      const d = Math.hypot(this.camX() - e.initCX, this.camY() - e.initCY);
      if (d > e.maxDisp) e.maxDisp = d;
    }

    // 跟枪计分：准星停留在头部命中框内的时间
    if (this.mode.behavior === 'tracking' && this.targetable()) {
      e.activeDurMs += dt * 1000;
      const hb = this.enemyHitbox();
      const dx = this.crosshair.x - hb.head.x;
      const dy = this.crosshair.y - hb.head.y;
      if (dx * dx + dy * dy <= hb.head.r * hb.head.r) {
        e.trackMs += dt * 1000;
      }
    }

    if (this.mode.behavior === 'flick') {
      this.updateApproach(now);
      if (e.phase === 'move' && now >= e.appearAt + FLICK_VISIBLE_MS) this.finishEncounter(now);
      return;
    }
    if (this.mode.behavior === 'stationary') {
      this.updatePreaim(dt, now);
      return;
    }
    if (!scene) return;

    if (e.phase === 'approach') {
      this.updateApproach(now);
    }

    const halfW = (cfg.bodyW * W) / 2;
    const op = scene.openings[e.opIdx];
    const opX = op.x * W;
    const opRight = (op.x + op.width) * W;

    if (scene.kind === 'cover-pop') {
      if (e.phase !== 'move') return;
      e.x += cfg.moveDir * cfg.speed * e.speedFactor * dt;
      if (now >= e.popUntil) {
        e.popUp = !e.popUp;
        e.popUntil = now + (e.popUp ? (scene.cover?.upMs ?? 650) : (scene.cover?.downMs ?? 450));
      }
      const baseY = scene.headLines[0] * this.height;
      e.y = e.popUp ? baseY : baseY + this.height * 0.17;
      const pastEnd = cfg.moveDir > 0 ? e.x > opRight + halfW + 60 : e.x < opX - halfW - 60;
      if (pastEnd) this.finishEncounter(now);
      return;
    }

    if (scene.kind === 'peek') {
      const dir = e.coverDir;
      const stopX = e.holdX;
      const startX = e.retreatX;
      if (e.phase === 'move') {
        e.x += dir * cfg.speed * e.speedFactor * dt;
        const reached = dir > 0 ? e.x >= stopX : e.x <= stopX;
        if (reached) {
          e.x = stopX;
          e.phase = 'hold';
          e.phaseUntil = now + (scene.peek?.holdMs ?? 800);
          e.attackAt = now + (600 + rand(0, 350)) * cfg.attackMul;
        }
      } else if (e.phase === 'hold') {
        // 拉出掩体：朝玩家方向走出来（变为可见、体型变大）
        e.depth = Math.min(1, e.depth + dt / 0.3);
        if (!e.attacked && !e.killed && e.attackAt != null && now >= e.attackAt) {
          this.doAttack(now);
          return;
        }
      } else if (e.phase === 'retreat') {
        e.depth = Math.max(0, e.depth - dt / 0.25);
        e.x -= dir * cfg.speed * e.speedFactor * dt;
        const back = dir > 0 ? e.x <= startX : e.x >= startX;
        if (back) this.finishEncounter(now);
      }
      return;
    }

    if (e.phase === 'move') {
      e.x += cfg.moveDir * cfg.speed * e.speedFactor * dt;
      const pastEnd = cfg.moveDir > 0 ? e.x > opRight + halfW + 60 : e.x < opX - halfW - 60;
      if (pastEnd) this.finishEncounter(now);
    }
  }

  private updateApproach(now: number): void {
    const e = this.enemy;
    if (e.phase !== 'approach') return;
    const p = Math.min(1, (now - e.approachStartAt) / e.approachDur);
    e.scale = 0.55 + (e.targetScale - 0.55) * p;
    if (p >= 1) {
      e.scale = e.targetScale;
      e.phase = 'move';
    }
  }

  private updatePreaim(dt: number, now: number): void {
    const e = this.enemy;
    const cfg = this.cfg;
    if (e.phase === 'move') {
      const dir = e.coverDir;
      e.x += dir * cfg.speed * e.speedFactor * dt;
      const reached = dir > 0 ? e.x >= e.holdX : e.x <= e.holdX;
      if (reached) {
        e.x = e.holdX;
        e.phase = 'hold';
        e.phaseUntil = now + PREAIM_VISIBLE_MS;
        e.attackAt = now + (600 + rand(0, 350)) * cfg.attackMul;
      }
    } else if (e.phase === 'hold') {
      // 探出后走出来，确保完整可见
      e.depth = Math.min(1, e.depth + dt / 0.3);
      if (!e.attacked && !e.killed && e.attackAt != null && now >= e.attackAt) {
        this.doAttack(now);
        return;
      }
    } else if (e.phase === 'retreat') {
      e.depth = Math.max(0, e.depth - dt / 0.25);
      const dir = e.coverDir;
      e.x -= dir * cfg.speed * e.speedFactor * dt;
      const back = dir > 0 ? e.x <= e.retreatX : e.x >= e.retreatX;
      if (back) this.finishEncounter(now);
    }
  }

  private finishEncounter(now: number): void {
    this.enemy.escaped = true;
    this.streak = 0;
    this.pushEncounter(now);
    this.startWaiting(now);
  }

  private doAttack(now: number): void {
    const e = this.enemy;
    e.attacked = true;
    e.escaped = true;
    this.streak = 0;
    this.pushEncounter(now);
    this.hooks.onPlayerDown();
    this.startWaiting(now);
  }

  private targetable(): boolean {
    const e = this.enemy;
    if (e.state !== 'active') return false;
    if (this.mode.behavior === 'flick') return true;
    const scene = this.scene;
    if (!scene) return false;
    const cfg = this.cfg;
    const W = this.width;
    const halfW = (cfg.bodyW * W * e.scale) / 2;
    // 掩体拉出：按掩体可视区判定；其余按开口判定
    if (e.cover) {
      const clip = e.cover.clip;
      const cX = clip.x * W;
      const cRight = (clip.x + clip.width) * W;
      if (scene.kind === 'cover-pop' && !e.popUp) return false;
      return e.x + halfW > cX && e.x - halfW < cRight;
    }
    const op = scene.openings[e.opIdx];
    const opX = op.x * W;
    const opRight = (op.x + op.width) * W;
    if (scene.kind === 'cover-pop' && !e.popUp) return false;
    return e.x + halfW > opX && e.x - halfW < opRight;
  }

  private enemyHitbox(): { head: Circle; body: Rect } {
    const e = this.enemy;
    const cfg = this.cfg;
    const sc = this.enemyDepthScale();
    const crouch = e.crouch;
    const hR = cfg.headR * this.width * sc * (crouch ? 0.9 : 1);
    const bW = cfg.bodyW * this.width * sc;
    const bH = cfg.bodyH * this.height * sc * (crouch ? 0.72 : 1);
    const feetY = e.y + cfg.headR * this.width + cfg.bodyH * this.height + e.bobY + this.enemyFeetDrop();
    const headCY = feetY - (hR + bH);
    const camX = this.camX();
    const camY = this.camY();
    return {
      head: { x: e.x - camX, y: headCY - camY, r: hR },
      body: { x: e.x - camX - bW / 2, y: headCY - camY + hR, w: bW, h: bH },
    };
  }

  private triggerDown(): void {
    if (this.sessionEnded || !this.running) return;
    this.triggerHeld = true;
    if (!this.reloading) this.fire();
  }

  private triggerUp(): void {
    this.triggerHeld = false;
  }

  private keyUp(code: string): void {
    if (code === 'KeyA') this.moveLeft = false;
    else if (code === 'KeyD') this.moveRight = false;
    else if (code === 'ControlLeft' || code === 'ControlRight') this.crouching = false;
  }

  private reload(): void {
    if (!this.running || this.reloading || this.ammo >= RIFLE.magSize) return;
    if (this.hooks.getAmmoMode() === 'infinite') return;
    this.reloading = true;
    this.reloadUntil = performance.now() + RIFLE.reloadMs;
    sfx.reloadStart();
  }

  private fire(): void {
    if (this.sessionEnded || !this.running || !this.locked || this.reloading) return;
    const now = performance.now();
    const infinite = this.hooks.getAmmoMode() === 'infinite';

    // 弹药管理：无限子弹模式永不耗尽；真实弹匣模式空仓提示
    if (!infinite && this.ammo <= 0) {
      if (now - this.lastEmptyAt > 250) {
        sfx.empty();
        this.lastEmptyAt = now;
      }
      return;
    }
    if (!infinite) this.ammo--;

    const e = this.enemy;
    const hb = this.enemyHitbox();

    // 弹道散布：前两发精准，连射散布递增；停火超时重置
    if (shouldResetBurst(Math.abs(this.playerVel) > 30, now - this.lastShotAt)) this.burstCount = 0;
    this.burstCount++;
    this.lastShotAt = now;
    // 后坐力抬视角
    this.recoilKickY += 2.2;
    // 移动中散布极大（前两发也不精准）；站定时正常连射散布
    const spread = effectiveSpread(this.burstCount, this.width, Math.abs(this.playerVel) > 30);
    const off = sampleBulletOffset(spread);
    const bx = this.crosshair.x + off.x;
    const by = this.crosshair.y + off.y;

    const camX = this.camX();
    const camY = this.camY();
    const hasTarget = this.targetable();
    const zone = hasTarget ? hitZone(bx, by, hb.head, hb.body) : 'miss';
    const hit = zone !== 'miss';
    const headshot = zone === 'head';

    if (hasTarget) {
      e.shotsFired++;
      if (e.firstShotAt == null) {
        e.firstShotAt = now;
        e.firstShotHit = hit;
        e.firstShotHead = headshot;
      }
      this.shots.push({
        t: now - this.startedAt,
        hit,
        head: headshot,
        targetX: e.x - camX,
        targetY: e.y - camY,
        distX: bx - (e.x - camX),
      });
    } else {
      // 空枪：子弹打在场景上，留下弹孔
      this.wastedShots++;
      this.decals.push({ x: bx, y: by, t: now });
      if (this.decals.length > 60) this.decals.shift();
      this.spawnDebris(bx, by);
    }

    // 开枪特效：枪口火光 / 弹壳 / 曳光
    const muzzle = viewmodelMuzzle(this.width, this.height, this.crosshair, {
      swayX: this.swayX,
      swayY: this.swayY,
      recoil: 1,
      moveBob: -this.playerVel * 0.018,
      crouchLift: this.crouching ? 26 : 0,
    }, now);
    this.muzzleUntil = now + 70;
    this.casings.push({
      x: muzzle.x - 18,
      y: muzzle.y - 8,
      vx: rand(-60, 60) + (this.cfg.moveDir > 0 ? 120 : -120),
      vy: rand(-320, -200),
      rot: rand(0, Math.PI * 2),
      vrot: rand(-12, 12),
      life: 0.7,
    });
    this.tracers.push({ x1: muzzle.x, y1: muzzle.y, x2: bx, y2: by, t: now });

    this.hooks.onShot(hit, headshot);

    if (!hasTarget) {
      this.markers.push({ x: bx, y: by, kind: 'miss', t: now });
    } else if (hit) {
      const dmg = shotDamage(headshot, this.mode.killRule);
      e.hp = Math.max(0, e.hp - dmg);
      e.hitFlash = 0.12;
      e.hpVisibleUntil = now + 1800;
      e.bloodLevel = 1 - e.hp / DAMAGE.maxHp;
      this.markers.push({ x: bx, y: by, kind: headshot ? 'head' : 'hit', t: now });
      this.spawnBlood(bx, by, headshot ? 24 : 11, headshot);
      this.texts.push({
        x: bx,
        y: by - 16,
        text: headshot ? '爆头' : `-${dmg}`,
        t: now,
        life: headshot ? 750 : 560,
        color: headshot ? '#ffd24a' : '#ff9a86',
        size: headshot ? 22 : 18,
      });
      if (e.hp <= 0) {
        e.killed = true;
        e.state = 'dead';
        e.killFlash = 0.18;
        this.streak++;
        if (this.streak > this.maxStreak) this.maxStreak = this.streak;
        const reactionMs = e.firstShotAt != null ? e.firstShotAt - e.appearAt : 0;
        this.hooks.onKill({
          headshot,
          reactionMs,
          streak: this.streak,
          shots: e.shotsFired,
        });
        this.spawnBlood(bx, by, 34, true);
        this.pushEncounter(now);
      }
    } else {
      this.markers.push({ x: bx, y: by, kind: 'miss', t: now });
    }
  }

  private spawnBlood(x: number, y: number, count: number, big: boolean): void {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = (big ? 120 : 70) * (0.4 + Math.random());
      this.blood.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 60,
        life: 0.45 + Math.random() * 0.4,
        maxLife: 0.85,
        size: 1.2 + Math.random() * (big ? 2.6 : 1.8),
        color: '#a81f1a',
      });
    }
  }

  /** 弹着点碎屑与火花（打墙/打箱子） */
  private spawnDebris(x: number, y: number): void {
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 60 + Math.random() * 130;
      this.blood.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 80,
        life: 0.25 + Math.random() * 0.3,
        maxLife: 0.55,
        size: 1 + Math.random() * 1.6,
        color: Math.random() < 0.45 ? '#ffd9a0' : '#b9ac97',
      });
    }
  }

  private pushEncounter(now: number): void {
    const e = this.enemy;
    this.encounters.push({
      targetId: this.targetId,
      appearAt: e.appearAt,
      firstShotAt: e.firstShotAt,
      firstShotHit: e.firstShotHit,
      firstShotHead: e.firstShotHead,
      shotsFired: e.shotsFired,
      killed: e.killed,
      killAt: e.killed ? now : null,
      escaped: e.escaped,
      flickDistPx: e.flickDistPx,
      preaimErrPx: e.preaimErrPx,
      displacementPx: e.maxDisp,
      trackMs: this.mode.behavior === 'tracking' ? e.trackMs : null,
      activeDurMs: this.mode.behavior === 'tracking' ? e.activeDurMs : null,
      attacked: e.attacked,
    });
  }

  private startWaiting(now: number): void {
    const e = this.enemy;
    e.state = 'waiting';
    if (this.mode.behavior === 'flick') {
      this.flickSide = this.flickSide === 0 ? 1 : 0;
      e.waitUntil = now + rand(250, 500);
    } else {
      e.waitUntil = now + rand(this.cfg.waitMin, this.cfg.waitMax);
    }
  }

  private onMove(dx: number, dy: number): void {
    if (!this.running || !this.locked) return;
    // 枪模摆动：与鼠标移动方向相反，带阻尼回弹
    this.swayVX -= dx * 0.1;
    this.swayVY -= dy * 0.1;
    const profile = this.hooks.getProfile();
    const ppc = pxPerCount(profile, this.width);
    // 鼠标转视角（准星固定屏幕中心，视角移动）
    this.lookX = clamp(this.lookX + dx * ppc, -this.width * 0.3, this.width * 0.3);
    this.lookY = clamp(this.lookY + dy * ppc, -this.height * 0.2, this.height * 0.2);
  }

  private render(now: number): void {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const e = this.enemy;

    // 头部晃动（仅活跃且非 cover 隐藏态）
    const bobAmp = this.cfg.bobAmp * this.cfg.headR * w * e.scale;
    e.bobY = e.state === 'active' && e.popUp ? Math.sin(now * 0.014) * bobAmp : 0;

    // 枪模摆动阻尼与后坐力
    this.swayVX *= 0.85;
    this.swayVY *= 0.85;
    this.swayX = clamp(this.swayX + this.swayVX, -50, 50);
    this.swayY = clamp(this.swayY + this.swayVY, -50, 50);
    this.recoilKickY *= 0.82;
    const recoil = this.lastShotAt > 0 ? Math.max(0, 1 - (now - this.lastShotAt) / 160) : 0;
    const camX = this.camX();
    const camY = this.camY();
    const moving = Math.abs(this.playerVel) > 30;

    const drawEnemyNow = (): void => {
      if (e.state === 'waiting') return;
      drawEnemy(ctx, {
        x: e.x,
        y: e.y,
        headR: this.cfg.headR * w,
        bodyW: this.cfg.bodyW * w,
        bodyH: this.cfg.bodyH * h,
        hitFlash: e.hitFlash,
        killFlash: e.killFlash,
        dir: this.cfg.moveDir,
        walkPhase: now / 150,
        scale: this.enemyDepthScale(),
        bobY: e.bobY,
        crouch: e.crouch,
        hp: e.hp,
        deathProgress: e.deathProgress,
        feetDrop: this.enemyFeetDrop(),
      });
    };

    const drawHpBar = (): void => {
      if (e.state === 'waiting' || e.hp >= DAMAGE.maxHp) return;
      const alpha = Math.max(0, Math.min(1, (e.hpVisibleUntil - now) / 600));
      drawEnemyHpBar(ctx, e.x, e.y - this.cfg.headR * w * this.enemyDepthScale() - 20, e.hp, alpha);
    };

    ctx.save();
    ctx.translate(-camX, -camY);
    if (this.mode.behavior === 'flick' || !this.scene) {
      drawArena(ctx, w, h);
      drawEnemyNow();
    } else {
      // 后景 → 敌人（不裁剪，遮挡交给前景）→ 前景
      drawSceneBack(ctx, this.scene, w, h);
      // 贴墙（穿门/掩体后）时按开口裁剪；走出来后画在墙前
      const inFront = e.depth > 0.4;
      if (!inFront) {
        const clipRect = e.cover ? e.cover.clip : this.scene.openings[e.opIdx];
        ctx.save();
        ctx.beginPath();
        ctx.rect(clipRect.x * w, clipRect.y0 * h, clipRect.width * w, (clipRect.y1 - clipRect.y0) * h);
        ctx.clip();
        drawEnemyNow();
        drawHpBar();
        ctx.restore();
      }
      drawSceneFront(ctx, this.scene, w, h);
      if (inFront) {
        drawEnemyNow();
        drawHpBar();
      }
      // 弹孔（打在墙上/地面）
      for (const d of this.decals) {
        const age = (now - d.t) / 300;
        ctx.globalAlpha = Math.max(0.25, 1 - age * 0.1);
        if (now - d.t < 130) {
          const fl = 1 - (now - d.t) / 130;
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, 16 * fl + 4);
          g.addColorStop(0, `rgba(255,236,190,${0.85 * fl})`);
          g.addColorStop(1, 'rgba(255,180,90,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 16 * fl + 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = 'rgba(20,16,14,0.85)';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(220,200,170,0.35)';
        ctx.beginPath();
        ctx.arc(d.x - 1, d.y - 1, 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    ctx.restore();

    if (this.scene && this.mode.behavior !== 'flick') {
      drawSceneLighting(ctx, w, h);
      drawDust(ctx, this.dust, now);
    }
    drawBlood(ctx, this.blood);
    drawHitMarkers(ctx, this.markers, now);
    for (const tr of this.tracers) drawTracer(ctx, tr, now);
    this.tracers = this.tracers.filter((tr) => now - tr.t < 90);
    for (const c of this.casings) drawCasing(ctx, c);
    const viewState = {
      swayX: this.swayX,
      swayY: this.swayY,
      recoil,
      moveBob: -this.playerVel * 0.018,
      crouchLift: this.crouching ? 26 : 0,
    };
    if (this.weaponReady && this.weaponImg) {
      // 抠图枪模：开枪时抖动 + 靠近放大（模拟后坐力）
      const sprite = this.weaponImg;
      const aspect = sprite.height / sprite.width;
      const zoom = 1 + recoil * 0.075;
      const drawW = w * 0.44 * zoom;
      const drawH = drawW * aspect;
      const shake = recoil * Math.sin(now * 0.06) * 7;
      const ox = w * 0.585 + viewState.swayX + viewState.moveBob + shake;
      const oy = h - drawH * 0.9 + viewState.swayY + Math.sin(now * 1.7) * 2 + viewState.crouchLift + recoil * 14;
      ctx.save();
      ctx.globalAlpha = 0.98;
      // 与场景风格协调：略降饱和、压暗并偏向暖色
      ctx.filter = 'saturate(0.88) contrast(1.04) brightness(0.94) sepia(0.08)';
      ctx.translate(ox + drawW / 2, oy + drawH / 2);
      ctx.rotate(viewState.swayX * 0.0007 + recoil * 0.018 * Math.sin(now * 0.045));
      ctx.drawImage(sprite, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    } else {
      drawViewmodel(ctx, w, h, this.crosshair, viewState, now);
    }

    const flashIntensity = this.muzzleUntil > 0 ? Math.max(0, 1 - (now - this.muzzleUntil) / 70) : 0;
    if (flashIntensity > 0) {
      const muzzle = viewmodelMuzzle(
        w,
        h,
        this.crosshair,
        { swayX: this.swayX, swayY: this.swayY, recoil, moveBob: -this.playerVel * 0.018, crouchLift: this.crouching ? 26 : 0 },
        now,
      );
      drawMuzzleFlash(ctx, muzzle.x, muzzle.y, flashIntensity);
    }

    // 准星随散布扩散（连射 + 移动反馈），停火半秒衰减归零
    const spread = effectiveSpread(this.burstCount, w, moving);
    const bloom = spread * Math.max(0, 1 - (now - this.lastShotAt) / SPRAY.recoveryMs);
    const cs = this.hooks.getCrosshair();
    drawCrosshair(ctx, this.crosshair.x, this.crosshair.y, { ...cs, gap: cs.gap + bloom * 1.6 });
    drawFloatTexts(ctx, this.texts, now);
  }

  private resize = (): void => {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.width = w;
    this.height = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 准星固定屏幕中心
    this.crosshair.x = w / 2;
    this.crosshair.y = h / 2;
  };
}
