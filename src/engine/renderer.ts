import type { Cover, CrosshairStyle, SceneConfig } from '../types';

export const ROOM = {
  wallTop: 0.13,
  floorTop: 0.94,
};

export interface EnemyPose {
  x: number;
  y: number;
  headR: number;
  bodyW: number;
  bodyH: number;
  hitFlash: number;
  killFlash: number;
  dir: 1 | -1;
  walkPhase: number;
  scale: number;
  bobY: number;
  crouch: boolean;
  /** 血量 0..100（用于血迹与血条） */
  hp: number;
  /** 倒地动画进度 0..1 */
  deathProgress: number;
  /** 纵深：0=贴墙（被门洞遮挡），1=走到玩家面前（画在墙前） */
  feetDrop: number;
}

export interface HitMarker {
  x: number;
  y: number;
  kind: 'hit' | 'head' | 'miss';
  t: number;
}

export interface CasingFx {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  life: number;
}

export interface TracerFx {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  t: number;
}

export interface BloodFx {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface FloatTextFx {
  x: number;
  y: number;
  text: string;
  t: number;
  life: number;
  color: string;
  size: number;
}

export interface DustFx {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
}

export interface ViewmodelState {
  swayX: number;
  swayY: number;
  recoil: number;
  moveBob: number;
  crouchLift: number;
}

function hash2(a: number, b: number): number {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ------------------------- 场景：后景（材质 + 开口内部） ------------------------- */

export function drawSceneBack(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  drawRoomBase(ctx, w, h);
  if (scene.kind === 'peek') {
    // 拐角场景：开阔地面（掩体在前景通道绘制）
    drawFloorDecals(ctx, w, h);
    return;
  }
  for (const o of scene.openings) drawOpeningInterior(ctx, o, w, h);
  if (scene.kind === 'window-cross') drawWindowFrame(ctx, scene.openings[0], w, h);
  drawFloorDecals(ctx, w, h);
}

/** 前景：墙体（挖洞）+ 掩体，用于自然遮挡敌人 */
export function drawSceneFront(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  const wallTop = ROOM.wallTop * h;
  const floorTop = ROOM.floorTop * h;

  if (scene.kind === 'peek') {
    drawPeekCovers(ctx, scene, w, h);
    drawLamp(ctx, w * 0.9, h * 0.2, w, h);
    return;
  }
  if (scene.kind === 'cover-pop') {
    drawLowCover(ctx, scene, w, h);
    drawLamp(ctx, w * 0.92, h * 0.22, w, h);
    return;
  }

  // 墙体：按开口挖洞
  const openings = [...scene.openings].sort((a, b) => a.x - b.x);
  let cursor = -w * 0.8;
  for (const o of openings) {
    const ox = o.x * w;
    const ow = o.width * w;
    if (ox > cursor) drawWallPanel(ctx, cursor, wallTop, ox - cursor, floorTop - wallTop);
    // 开口上下的墙
    drawWallPanel(ctx, ox, wallTop, ow, o.y0 * h - wallTop);
    drawWallPanel(ctx, ox, o.y1 * h, ow, floorTop - o.y1 * h);
    cursor = ox + ow;
  }
  if (cursor < w * 1.8) drawWallPanel(ctx, cursor, wallTop, w * 1.8 - cursor, floorTop - wallTop);

  // 高低差场景：平台与地面标识
  if (scene.kind === 'height-cross') drawHeightProps(ctx, scene, w, h);
  // 门口光池 + 地面杂物
  for (const o of openings) drawLightPool(ctx, o, w, h);
  drawLamp(ctx, w * 0.93, h * 0.2, w, h);
  drawProps(ctx, scene, w, h);
}

/** 统一光照与暗角（在墙、地面、敌人绘制后应用） */
export function drawSceneLighting(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.save();
  ctx.globalCompositeOperation = 'multiply';
  const lg = ctx.createLinearGradient(0, 0, w, h * 0.35);
  lg.addColorStop(0, '#574f46');
  lg.addColorStop(0.45, '#c8b79c');
  lg.addColorStop(1, '#ffe2b0');
  ctx.fillStyle = lg;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // 体积光锥 + 高光溢出（bloom）
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const cone = ctx.createLinearGradient(w, h * 0.18, w * 0.42, h * 0.95);
  cone.addColorStop(0, 'rgba(255,206,140,0.30)');
  cone.addColorStop(0.45, 'rgba(255,196,128,0.12)');
  cone.addColorStop(1, 'rgba(255,190,120,0)');
  ctx.fillStyle = cone;
  ctx.beginPath();
  ctx.moveTo(w * 0.98, h * 0.12);
  ctx.lineTo(w * 0.34, h);
  ctx.lineTo(w * 0.86, h);
  ctx.lineTo(w * 1.0, h * 0.34);
  ctx.closePath();
  ctx.fill();
  const bloom = ctx.createRadialGradient(w * 0.93, h * 0.2, 0, w * 0.93, h * 0.2, w * 0.3);
  bloom.addColorStop(0, 'rgba(255,224,170,0.34)');
  bloom.addColorStop(1, 'rgba(255,224,170,0)');
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = 'overlay';
  const warm = ctx.createRadialGradient(w * 0.86, h * 0.3, 0, w * 0.86, h * 0.3, w * 0.85);
  warm.addColorStop(0, 'rgba(255,178,96,0.5)');
  warm.addColorStop(1, 'rgba(255,186,104,0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  const vig = ctx.createRadialGradient(w / 2, h * 0.52, Math.min(w, h) * 0.16, w / 2, h * 0.5, Math.max(w, h) * 0.68);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.72)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

function drawRoomBase(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const wallTop = ROOM.wallTop * h;
  const floorTop = ROOM.floorTop * h;
  // 相机平移余量：两侧多画，避免转视角时露出空白
  const x0 = -w * 0.8;
  const x1 = w * 1.8;
  const fullW = x1 - x0;

  // 天花板：深色木板（向消失点收敛）
  const ceil = ctx.createLinearGradient(0, 0, 0, wallTop);
  ceil.addColorStop(0, '#140f0b');
  ceil.addColorStop(1, '#3d2b1e');
  ctx.fillStyle = ceil;
  ctx.fillRect(x0, 0, fullW, wallTop);
  ctx.strokeStyle = 'rgba(0,0,0,0.4)';
  ctx.lineWidth = 1.5;
  const vpX = w * 0.5;
  for (let i = -9; i <= 9; i++) {
    ctx.beginPath();
    ctx.moveTo(vpX + i * w * 0.07, 0);
    ctx.lineTo(vpX + i * w * 0.022, wallTop);
    ctx.stroke();
  }
  ctx.fillStyle = '#241812';
  ctx.fillRect(x0, wallTop - h * 0.03, fullW, h * 0.03);
  ctx.fillStyle = 'rgba(255,205,150,0.10)';
  ctx.fillRect(x0, wallTop - h * 0.03, fullW, 2);

  // 墙面灰浆底
  const mortar = ctx.createLinearGradient(0, wallTop, 0, floorTop);
  mortar.addColorStop(0, '#8c8172');
  mortar.addColorStop(1, '#6f675c');
  ctx.fillStyle = mortar;
  ctx.fillRect(x0, wallTop, fullW, floorTop - wallTop);

  // 砖块（确定性色差，避免每帧闪烁）
  const rowH = Math.max(16, (floorTop - wallTop) * 0.062);
  const colW = Math.max(54, w * 0.062);
  let row = 0;
  for (let y = wallTop; y < floorTop; y += rowH, row++) {
    const offset = row % 2 === 0 ? 0 : colW / 2;
    let col = -1;
    for (let x = x0 - offset; x < x1; x += colW, col++) {
      const n = hash2(col, row);
      const shade = 0.9 + n * 0.22;
      ctx.fillStyle = `rgba(${Math.round(176 * shade)},${Math.round(160 * shade)},${Math.round(134 * shade)},0.9)`;
      ctx.fillRect(x + 1.5, y + 1.5, colW - 3, rowH - 3);
      // 伪 3D 倒角：左上高光、右下阴影
      ctx.fillStyle = 'rgba(255,246,224,0.22)';
      ctx.fillRect(x + 1.5, y + 1.5, colW - 3, 1.5);
      ctx.fillRect(x + 1.5, y + 1.5, 1.5, rowH - 3);
      ctx.fillStyle = 'rgba(0,0,0,0.36)';
      ctx.fillRect(x + 1.5, y + rowH - 3, colW - 3, 1.6);
      ctx.fillRect(x + colW - 3, y + 1.5, 1.6, rowH - 3);
      if (n > 0.86) {
        // 个别旧砖更暗
        ctx.fillStyle = 'rgba(70,62,54,0.25)';
        ctx.fillRect(x + 1.5, y + 1.5, colW - 3, rowH - 3);
      }
    }
  }

  // 地面：水泥 + 接缝
  const floor = ctx.createLinearGradient(0, floorTop, 0, h);
  floor.addColorStop(0, '#4a453d');
  floor.addColorStop(1, '#161514');
  ctx.fillStyle = floor;
  ctx.fillRect(x0, floorTop, fullW, h - floorTop);
  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.lineWidth = 1;
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(vpX + i * w * 0.02, floorTop);
    ctx.lineTo(vpX + i * w * 0.19, h);
    ctx.stroke();
  }
  // 墙脚阴影
  const skirt = ctx.createLinearGradient(0, floorTop - h * 0.05, 0, floorTop);
  skirt.addColorStop(0, 'rgba(0,0,0,0)');
  skirt.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = skirt;
  ctx.fillRect(x0, floorTop - h * 0.05, fullW, h * 0.05);
  drawWallWear(ctx, w, h);
}

/** 墙面磨损：竖向水渍 + 污渍斑块（确定性，不闪烁） */
function drawWallWear(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const wallTop = ROOM.wallTop * h;
  const floorTop = ROOM.floorTop * h;
  for (let i = 0; i < 10; i++) {
    const x = hash2(i, 3) * w;
    const top = wallTop + hash2(i, 5) * (floorTop - wallTop) * 0.5;
    const len = (floorTop - wallTop) * (0.2 + hash2(i, 7) * 0.5);
    const wide = w * (0.006 + hash2(i, 9) * 0.014);
    const streak = ctx.createLinearGradient(0, top, 0, top + len);
    streak.addColorStop(0, 'rgba(44,38,32,0.26)');
    streak.addColorStop(1, 'rgba(44,38,32,0)');
    ctx.fillStyle = streak;
    ctx.fillRect(x, top, wide, len);
  }
  for (let i = 0; i < 6; i++) {
    const x = hash2(i, 11) * w;
    const y = floorTop - (floorTop - wallTop) * (0.08 + hash2(i, 13) * 0.3);
    const r = w * (0.03 + hash2(i, 17) * 0.05);
    ctx.fillStyle = `rgba(58,50,42,${0.1 + hash2(i, 19) * 0.14})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWallPanel(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  if (w <= 0 || h <= 0) return;
  const mortar = ctx.createLinearGradient(0, y, 0, y + h);
  mortar.addColorStop(0, '#8c8172');
  mortar.addColorStop(1, '#6f675c');
  ctx.fillStyle = mortar;
  ctx.fillRect(x, y, w, h);

  const rowH = Math.max(16, h * 0.075);
  const colW = Math.max(54, w * 0.09);
  const startRow = Math.max(0, Math.floor(y / rowH));
  let row = startRow;
  for (let yy = startRow * rowH; yy < y + h; yy += rowH, row++) {
    if (yy + rowH < y) continue;
    const offset = row % 2 === 0 ? 0 : colW / 2;
    const startCol = Math.floor((x - offset) / colW) - 1;
    for (let c = startCol; ; c++) {
      const bx = c * colW + offset;
      if (bx > x + w) break;
      if (bx + colW < x) continue;
      const n = hash2(c, row);
      const shade = 0.9 + n * 0.22;
      const clipX = Math.max(bx + 1.5, x);
      const clipW = Math.min(bx + colW - 1.5, x + w) - clipX;
      const clipY = Math.max(yy + 1.5, y);
      const clipH = Math.min(yy + rowH - 1.5, y + h) - clipY;
      if (clipW <= 0 || clipH <= 0) continue;
      ctx.fillStyle = `rgba(${Math.round(176 * shade)},${Math.round(160 * shade)},${Math.round(134 * shade)},0.85)`;
      ctx.fillRect(clipX, clipY, clipW, clipH);
      ctx.fillStyle = 'rgba(255,246,224,0.18)';
      ctx.fillRect(clipX, clipY, clipW, 1.3);
      ctx.fillStyle = 'rgba(0,0,0,0.32)';
      ctx.fillRect(clipX, clipY + clipH - 1.3, clipW, 1.3);
      if (n > 0.87) {
        ctx.fillStyle = 'rgba(70,62,54,0.28)';
        ctx.fillRect(clipX, clipY, clipW, clipH);
      }
    }
  }
}

function drawOpeningInterior(
  ctx: CanvasRenderingContext2D,
  o: { x: number; y0: number; y1: number; width: number },
  w: number,
  h: number,
): void {
  const dx = o.x * w;
  const dw = o.width * w;
  const dy0 = o.y0 * h;
  const dy1 = o.y1 * h;
  // 走廊背墙
  const back = ctx.createLinearGradient(dx, 0, dx + dw, 0);
  back.addColorStop(0, '#2a2f35');
  back.addColorStop(0.5, '#4a545d');
  back.addColorStop(1, '#2a2f35');
  ctx.fillStyle = back;
  ctx.fillRect(dx, dy0, dw, dy1 - dy0);
  // 走廊地面（透视）
  const floorTop = dy1 - Math.min(h * 0.16, (dy1 - dy0) * 0.3);
  const fg = ctx.createLinearGradient(0, floorTop, 0, dy1);
  fg.addColorStop(0, '#544c43');
  fg.addColorStop(1, '#1a1917');
  ctx.fillStyle = fg;
  ctx.fillRect(dx, floorTop, dw, dy1 - floorTop);
  const vpX = dx + dw * 0.5;
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(vpX + i * dw * 0.03, floorTop);
    ctx.lineTo(vpX + i * dw * 0.2, dy1);
    ctx.stroke();
  }
  // 走廊侧墙
  const sideL = ctx.createLinearGradient(dx, 0, dx + dw * 0.18, 0);
  sideL.addColorStop(0, 'rgba(12,14,16,0.85)');
  sideL.addColorStop(1, 'rgba(12,14,16,0)');
  ctx.fillStyle = sideL;
  ctx.fillRect(dx, dy0, dw * 0.18, dy1 - dy0);
  const sideR = ctx.createLinearGradient(dx + dw, 0, dx + dw * 0.82, 0);
  sideR.addColorStop(0, 'rgba(12,14,16,0.85)');
  sideR.addColorStop(1, 'rgba(12,14,16,0)');
  ctx.fillStyle = sideR;
  ctx.fillRect(dx + dw * 0.82, dy0, dw * 0.18, dy1 - dy0);
  // 门外顶光
  const topLight = ctx.createLinearGradient(0, dy0, 0, dy0 + (dy1 - dy0) * 0.3);
  topLight.addColorStop(0, 'rgba(255,208,150,0.22)');
  topLight.addColorStop(1, 'rgba(255,208,150,0)');
  ctx.fillStyle = topLight;
  ctx.fillRect(dx, dy0, dw, (dy1 - dy0) * 0.3);
  // 门框
  ctx.strokeStyle = '#5b5148';
  ctx.lineWidth = Math.max(4, w * 0.005);
  ctx.strokeRect(dx, dy0, dw, dy1 - dy0);
  ctx.strokeStyle = 'rgba(255,220,170,0.16)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(dx + 2, dy0 + 2, dw - 4, dy1 - dy0 - 4);
}

function drawWindowFrame(
  ctx: CanvasRenderingContext2D,
  o: { x: number; y0: number; y1: number; width: number },
  w: number,
  h: number,
): void {
  const dx = o.x * w;
  const dw = o.width * w;
  const dy0 = o.y0 * h;
  const dy1 = o.y1 * h;
  ctx.strokeStyle = '#6b6053';
  ctx.lineWidth = Math.max(6, w * 0.008);
  ctx.strokeRect(dx, dy0, dw, dy1 - dy0);
  ctx.fillStyle = '#3d372f';
  ctx.fillRect(dx - w * 0.012, dy1, dw + w * 0.024, h * 0.016);
  ctx.strokeStyle = 'rgba(255,222,170,0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(dx + 3, dy0 + 3, dw - 6, dy1 - dy0 - 6);
}

function drawFloorDecals(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const floorTop = ROOM.floorTop * h;
  ctx.fillStyle = 'rgba(0,0,0,0.22)';
  ctx.beginPath();
  ctx.ellipse(w * 0.18, floorTop + h * 0.03, w * 0.09, h * 0.012, 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.62, floorTop + h * 0.045, w * 0.11, h * 0.014, -0.04, 0, Math.PI * 2);
  ctx.fill();
}

function drawLightPool(
  ctx: CanvasRenderingContext2D,
  o: { x: number; y0: number; y1: number; width: number },
  w: number,
  h: number,
): void {
  const cx = (o.x + o.width / 2) * w;
  const floorTop = ROOM.floorTop * h;
  const pool = ctx.createRadialGradient(cx, floorTop + h * 0.02, 0, cx, floorTop + h * 0.02, w * 0.16);
  pool.addColorStop(0, 'rgba(255,206,140,0.30)');
  pool.addColorStop(1, 'rgba(255,206,140,0)');
  ctx.fillStyle = pool;
  ctx.beginPath();
  ctx.ellipse(cx, floorTop + h * 0.025, w * 0.16, h * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPeekCovers(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  const covers: Cover[] = scene.covers ?? [];
  for (const c of covers) {
    const cx = c.x * w;
    if (c.id === 'mid-crate') {
      const boxW = w * 0.15;
      const topY = h * 0.48;
      const boxH = ROOM.floorTop * h - topY;
      const dx = w * 0.03;
      const dy = h * 0.05;
      const bottom = ROOM.floorTop * h;
      // 投影（光源在右，影子偏左）
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.moveTo(cx - boxW * 0.5, bottom);
      ctx.lineTo(cx - boxW * 1.45, bottom - h * 0.006);
      ctx.lineTo(cx - boxW * 0.95, bottom - h * 0.035);
      ctx.lineTo(cx - boxW * 0.1, bottom - h * 0.014);
      ctx.closePath();
      ctx.fill();
      // 接触阴影
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.beginPath();
      ctx.ellipse(cx, bottom + h * 0.006, boxW * 0.7, h * 0.012, 0, 0, Math.PI * 2);
      ctx.fill();
      // 后侧面（暗）
      ctx.fillStyle = '#2f2115';
      ctx.beginPath();
      ctx.moveTo(cx + boxW * 0.5, topY);
      ctx.lineTo(cx + boxW * 0.5 - dx, topY - dy);
      ctx.lineTo(cx + boxW * 0.5 - dx, bottom - dy);
      ctx.lineTo(cx + boxW * 0.5, bottom);
      ctx.closePath();
      ctx.fill();
      // 正面（木纹板条）
      const side = ctx.createLinearGradient(0, topY, 0, bottom);
      side.addColorStop(0, '#8a6440');
      side.addColorStop(0.6, '#6b4a2c');
      side.addColorStop(1, '#3b2818');
      ctx.fillStyle = side;
      ctx.fillRect(cx - boxW / 2, topY, boxW, boxH);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1.4;
      for (let i = 1; i < 4; i++) {
        const yy = topY + (boxH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(cx - boxW / 2, yy);
        ctx.lineTo(cx + boxW / 2, yy);
        ctx.stroke();
      }
      // 顶面（受光最亮）
      const topGrad = ctx.createLinearGradient(cx - boxW / 2, topY - dy, cx + boxW / 2, topY);
      topGrad.addColorStop(0, '#b98d59');
      topGrad.addColorStop(1, '#d8af78');
      ctx.fillStyle = topGrad;
      ctx.beginPath();
      ctx.moveTo(cx - boxW / 2, topY);
      ctx.lineTo(cx + boxW / 2, topY);
      ctx.lineTo(cx + boxW / 2 - dx, topY - dy);
      ctx.lineTo(cx - boxW / 2 - dx, topY - dy);
      ctx.closePath();
      ctx.fill();
      // 顶面木纹
      ctx.strokeStyle = 'rgba(90,60,30,0.35)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 3; i++) {
        const t = i / 3;
        ctx.beginPath();
        ctx.moveTo(cx - boxW / 2 - dx * t, topY - dy * t);
        ctx.lineTo(cx + boxW / 2 - dx * t, topY - dy * t);
        ctx.stroke();
      }
      // 棱边高光
      ctx.strokeStyle = 'rgba(255,236,200,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - boxW / 2, topY);
      ctx.lineTo(cx + boxW / 2, topY);
      ctx.lineTo(cx + boxW / 2, bottom);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0,0,0,0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - boxW / 2, topY, boxW, boxH);
      ctx.fillStyle = '#6d6a63';
      ctx.fillRect(cx - boxW / 2, topY, boxW, h * 0.012);
      ctx.fillRect(cx - boxW / 2, bottom - h * 0.02, boxW, h * 0.02);
    } else if (c.id === 'right-wall') {
      const wallX = cx;
      const dx = w * 0.022;
      // 墙体厚度面（向画面内延伸）
      ctx.fillStyle = '#1a1f24';
      ctx.beginPath();
      ctx.moveTo(wallX, ROOM.wallTop * h);
      ctx.lineTo(wallX - dx, ROOM.wallTop * h - h * 0.02);
      ctx.lineTo(wallX - dx, ROOM.floorTop * h - h * 0.02);
      ctx.lineTo(wallX, ROOM.floorTop * h);
      ctx.closePath();
      ctx.fill();
      drawWallPanel(ctx, wallX, ROOM.wallTop * h, w * 1.8 - wallX, (ROOM.floorTop - ROOM.wallTop) * h);
      // 墙角高光
      ctx.strokeStyle = 'rgba(255,226,180,0.35)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(wallX, ROOM.wallTop * h);
      ctx.lineTo(wallX, ROOM.floorTop * h);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(30,26,22,0.9)';
      ctx.lineWidth = Math.max(3, w * 0.005);
      ctx.beginPath();
      ctx.moveTo(wallX, ROOM.wallTop * h);
      ctx.lineTo(wallX, ROOM.floorTop * h);
      ctx.stroke();
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(wallX, ROOM.wallTop * h, w * 0.01, (ROOM.floorTop - ROOM.wallTop) * h);
    } else if (c.id === 'left-wall') {
      const wallRight = cx;
      const dx = w * 0.02;
      ctx.fillStyle = '#1a1f24';
      ctx.beginPath();
      ctx.moveTo(wallRight, ROOM.wallTop * h);
      ctx.lineTo(wallRight + dx, ROOM.wallTop * h - h * 0.018);
      ctx.lineTo(wallRight + dx, ROOM.floorTop * h - h * 0.018);
      ctx.lineTo(wallRight, ROOM.floorTop * h);
      ctx.closePath();
      ctx.fill();
      drawWallPanel(ctx, -w * 0.8, ROOM.wallTop * h, wallRight + w * 0.8, (ROOM.floorTop - ROOM.wallTop) * h);
      ctx.strokeStyle = 'rgba(30,26,22,0.9)';
      ctx.lineWidth = Math.max(3, w * 0.005);
      ctx.beginPath();
      ctx.moveTo(wallRight, ROOM.wallTop * h);
      ctx.lineTo(wallRight, ROOM.floorTop * h);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,225,180,0.10)';
      ctx.fillRect(wallRight, ROOM.wallTop * h, w * 0.01, (ROOM.floorTop - ROOM.wallTop) * h);
    }
  }
}

function drawLowCover(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  const cx = scene.wall.left * w;
  const cw = (scene.wall.right - scene.wall.left) * w;
  const cy = scene.wall.top * h;
  const bottom = ROOM.floorTop * h;
  const dx = w * 0.026;
  const dy = h * 0.045;
  // 投影（光源在右）
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.moveTo(cx, bottom);
  ctx.lineTo(cx - w * 0.05, bottom - h * 0.004);
  ctx.lineTo(cx - w * 0.03, bottom - h * 0.03);
  ctx.lineTo(cx + w * 0.02, bottom - h * 0.012);
  ctx.closePath();
  ctx.fill();
  // 墙背厚度面
  ctx.fillStyle = '#221f1a';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + dx, cy - dy);
  ctx.lineTo(cx + cw + dx, cy - dy);
  ctx.lineTo(cx + cw, cy);
  ctx.closePath();
  ctx.fill();
  // 顶面（受光）
  const topGrad = ctx.createLinearGradient(cx, cy - dy, cx, cy);
  topGrad.addColorStop(0, '#8e8676');
  topGrad.addColorStop(1, '#6b6456');
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + cw, cy);
  ctx.lineTo(cx + cw + dx, cy - dy);
  ctx.lineTo(cx + dx, cy - dy);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,238,205,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + cw, cy);
  ctx.stroke();
  const grad = ctx.createLinearGradient(0, cy, 0, bottom);
  grad.addColorStop(0, '#5c554a');
  grad.addColorStop(1, '#2e2a24');
  ctx.fillStyle = grad;
  ctx.fillRect(cx, cy, cw, bottom - cy);
  const rowH = Math.max(14, h * 0.035);
  const colW = Math.max(48, w * 0.06);
  let row = 0;
  for (let y = cy; y < bottom; y += rowH, row++) {
    const offset = row % 2 === 0 ? 0 : colW / 2;
    let col = -1;
    for (let x = cx - offset; x < cx + cw; x += colW, col++) {
      const n = hash2(col + 20, row + 7);
      const shade = 0.85 + n * 0.25;
      const bx = Math.max(x + 1.5, cx);
      const bw = Math.min(x + colW - 1.5, cx + cw) - bx;
      if (bw > 0) {
        ctx.fillStyle = `rgba(${Math.round(150 * shade)},${Math.round(140 * shade)},${Math.round(120 * shade)},0.85)`;
        ctx.fillRect(bx, y + 1.5, bw, rowH - 3);
      }
    }
  }
  ctx.fillStyle = 'rgba(255,220,170,0.12)';
  ctx.fillRect(cx, cy, cw, h * 0.012);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx, cy, cw, bottom - cy);
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(cx + cw * 0.5, bottom + h * 0.006, cw * 0.55, h * 0.012, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawHeightProps(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  const hy1 = scene.headLines[1] * h;
  // 高台边缘
  ctx.fillStyle = '#5a5248';
  ctx.fillRect(0, hy1 + h * 0.14, w, h * 0.012);
  ctx.fillStyle = 'rgba(255,214,150,0.16)';
  ctx.fillRect(0, hy1 + h * 0.14, w, 2);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, hy1 + h * 0.152, w, h * 0.02);
}

function drawProps(ctx: CanvasRenderingContext2D, scene: SceneConfig, w: number, h: number): void {
  // 沙袋堆（左下）
  const sx = w * 0.06;
  const sy = ROOM.floorTop * h;
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 3 - row; i++) {
      const bx = sx + i * w * 0.045 + row * w * 0.022;
      const by = sy - (row + 1) * h * 0.035;
      ctx.fillStyle = row === 0 ? '#6b6146' : '#7a6f51';
      ctx.beginPath();
      ctx.ellipse(bx, by, w * 0.026, h * 0.021, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
  // 墙面管道
  if (scene.kind !== 'peek') {
    ctx.strokeStyle = '#4a4238';
    ctx.lineWidth = Math.max(4, w * 0.005);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.2);
    ctx.lineTo(w * 0.2, h * 0.2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,220,170,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.194);
    ctx.lineTo(w * 0.2, h * 0.194);
    ctx.stroke();
  }
}

function drawLamp(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, w * 0.22);
  glow.addColorStop(0, 'rgba(255,214,150,0.5)');
  glow.addColorStop(0.4, 'rgba(255,190,110,0.16)');
  glow.addColorStop(1, 'rgba(255,190,110,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, w * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2a2724';
  ctx.fillRect(x - w * 0.018, y - h * 0.008, w * 0.036, h * 0.016);
  ctx.fillStyle = 'rgba(255,236,190,0.95)';
  ctx.fillRect(x - w * 0.012, y + h * 0.004, w * 0.024, h * 0.008);
}

/* ------------------------------- 敌人 ------------------------------- */

export function drawEnemy(ctx: CanvasRenderingContext2D, pose: EnemyPose): void {
  const s = pose.scale;
  const crouch = pose.crouch;
  const effBodyH = pose.bodyH * (crouch ? 0.72 : 1);
  const effHeadR = pose.headR * (crouch ? 0.9 : 1);
  const feetX = pose.x;
  const feetY = pose.y + pose.headR + pose.bodyH + pose.bobY + pose.feetDrop;
  const headCY = -(effHeadR + effBodyH);
  const bodyTop = headCY + effHeadR;
  const torsoH = effBodyH * 0.52;
  const legH = effBodyH * 0.38;
  const torsoTop = bodyTop;
  const legTop = torsoTop + torsoH;
  const hurt = pose.hitFlash > 0 || pose.killFlash > 0;
  const blood = Math.max(0, 1 - pose.hp / 100);
  const skin = hurt ? '#ffd9b0' : '#d7a271';

  ctx.save();
  ctx.translate(feetX, feetY);
  if (pose.deathProgress > 0) {
    const p = Math.min(1, pose.deathProgress);
    ctx.rotate(-pose.dir * p * 1.35);
    ctx.translate(pose.dir * p * pose.bodyW * 0.3, -p * pose.bodyH * 0.06);
    ctx.globalAlpha = p > 0.65 ? 1 - ((p - 0.65) / 0.35) * 0.75 : 1;
  }
  ctx.scale(s, s);

  // 地面阴影
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.ellipse(0, 2, pose.bodyW * 0.6, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // 双腿（战术裤 + 靴）
  const step = Math.sin(pose.walkPhase) * Math.max(2, pose.bodyW * 0.1);
  ctx.fillStyle = hurt ? '#6b7480' : '#2f343b';
  ctx.fillRect(-pose.bodyW * 0.25, legTop + Math.max(0, step), pose.bodyW * 0.23, legH - Math.max(0, step));
  ctx.fillRect(pose.bodyW * 0.02, legTop + Math.max(0, -step), pose.bodyW * 0.23, legH - Math.max(0, -step));
  ctx.fillStyle = '#15181c';
  ctx.fillRect(-pose.bodyW * 0.26, legTop + legH - 2, pose.bodyW * 0.25, 5);
  ctx.fillRect(pose.bodyW * 0.01, legTop + legH - 2, pose.bodyW * 0.25, 5);

  // 躯干上衣
  ctx.fillStyle = hurt ? '#8b939c' : '#39434f';
  ctx.fillRect(-pose.bodyW * 0.4, torsoTop, pose.bodyW * 0.8, torsoH);
  // 战术背心
  ctx.fillStyle = hurt ? '#9aa2ab' : '#242a32';
  ctx.fillRect(-pose.bodyW * 0.33, torsoTop + torsoH * 0.08, pose.bodyW * 0.66, torsoH * 0.62);
  // 弹匣袋
  ctx.fillStyle = '#1b2028';
  ctx.fillRect(-pose.bodyW * 0.22, torsoTop + torsoH * 0.34, pose.bodyW * 0.14, torsoH * 0.22);
  ctx.fillRect(pose.bodyW * 0.06, torsoTop + torsoH * 0.34, pose.bodyW * 0.14, torsoH * 0.22);
  // 背带
  ctx.strokeStyle = 'rgba(15,18,22,0.9)';
  ctx.lineWidth = Math.max(2, pose.bodyW * 0.06);
  ctx.beginPath();
  ctx.moveTo(-pose.bodyW * 0.28, torsoTop + torsoH * 0.06);
  ctx.lineTo(pose.bodyW * 0.2, torsoTop + torsoH * 0.68);
  ctx.stroke();
  // 红臂章（参考图的红色点缀）
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(-pose.bodyW * 0.42, torsoTop + torsoH * 0.14, pose.bodyW * 0.1, torsoH * 0.16);

  // 手臂 + 步枪
  const shoulderY = torsoTop + torsoH * 0.3;
  const gunLen = pose.bodyW * 0.66;
  const gunH = pose.bodyW * 0.1;
  const gunX = pose.dir > 0 ? pose.bodyW * 0.16 : -pose.bodyW * 0.16 - gunLen;
  ctx.fillStyle = '#2b3138';
  ctx.fillRect(gunX, shoulderY, gunLen, gunH);
  ctx.fillStyle = '#15191d';
  ctx.fillRect(pose.dir > 0 ? gunX + gunLen * 0.55 : gunX, shoulderY - 1, gunLen * 0.45, gunH * 0.7);
  ctx.fillStyle = '#101316';
  ctx.fillRect(pose.dir > 0 ? gunX + gunLen * 0.4 : gunX + gunLen * 0.2, shoulderY + gunH, gunH * 0.9, gunH * 1.5);
  // 前手 / 后手
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(pose.dir > 0 ? gunX + gunLen * 0.72 : gunX + gunLen * 0.28, shoulderY + gunH * 0.4, pose.bodyW * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(pose.dir > 0 ? gunX + gunLen * 0.3 : gunX + gunLen * 0.7, shoulderY + gunH * 1.1, pose.bodyW * 0.095, 0, Math.PI * 2);
  ctx.fill();

  // 头部：皮肤 + 头发（参考图无帽兜）
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(0, headCY, effHeadR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = hurt ? '#4b4137' : '#2b2118';
  ctx.beginPath();
  ctx.arc(0, headCY - effHeadR * 0.22, effHeadR * 0.98, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.fillRect(-effHeadR, headCY - effHeadR * 0.3, effHeadR * 0.32, effHeadR * 0.5);
  // 眼部阴影
  ctx.fillStyle = 'rgba(20,16,12,0.35)';
  ctx.fillRect(-effHeadR * 0.7, headCY - effHeadR * 0.1, effHeadR * 1.4, effHeadR * 0.28);
  // 颈部
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(-effHeadR * 0.35, headCY + effHeadR * 0.75, effHeadR * 0.7, effHeadR * 0.5);

  // 血迹（随伤害加深）
  if (blood > 0) {
    ctx.fillStyle = `rgba(104,20,18,${0.12 + blood * 0.5})`;
    ctx.beginPath();
    ctx.ellipse(pose.dir * pose.bodyW * 0.06, torsoTop + torsoH * 0.4, pose.bodyW * 0.22, torsoH * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    if (blood > 0.6) {
      ctx.fillStyle = `rgba(88,14,14,0.55)`;
      ctx.beginPath();
      ctx.ellipse(-pose.dir * pose.bodyW * 0.1, torsoTop + torsoH * 0.72, pose.bodyW * 0.16, torsoH * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 受击/致死描边
  if (hurt) {
    ctx.strokeStyle = pose.killFlash > 0 ? 'rgba(255,120,110,0.85)' : 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      -pose.bodyW * 0.5,
      torsoTop - effHeadR * 0.9,
      pose.bodyW,
      torsoH + legH + effHeadR * 0.9,
    );
  }
  ctx.restore();
}

export function drawEnemyHpBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  topY: number,
  hp: number,
  alpha: number,
): void {
  if (alpha <= 0.01) return;
  const bw = 46;
  const bh = 4;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(x - bw / 2 - 1, topY - 1, bw + 2, bh + 2);
  const ratio = Math.max(0, Math.min(1, hp / 100));
  ctx.fillStyle = ratio > 0.5 ? '#7cfc9b' : ratio > 0.25 ? '#ffd166' : '#ff5c5c';
  ctx.fillRect(x - bw / 2, topY, bw * ratio, bh);
  ctx.restore();
}

/* ------------------------------- 特效 ------------------------------- */

export function drawBlood(ctx: CanvasRenderingContext2D, list: BloodFx[]): void {
  for (const b of list) {
    const a = Math.max(0, b.life / b.maxLife);
    ctx.globalAlpha = Math.min(1, a * 1.4);
    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.size * (0.6 + a * 0.6), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function drawFloatTexts(ctx: CanvasRenderingContext2D, list: FloatTextFx[], now: number): void {
  for (const f of list) {
    const age = (now - f.t) / f.life;
    if (age > 1) continue;
    const a = 1 - age;
    ctx.globalAlpha = a;
    ctx.font = `800 ${f.size}px "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(0,0,0,0.65)';
    const y = f.y - age * 34;
    ctx.strokeText(f.text, f.x, y);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, y);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = 'start';
}

export function drawDust(ctx: CanvasRenderingContext2D, dust: DustFx[], now: number): void {
  ctx.fillStyle = 'rgba(255,226,180,0.5)';
  for (const d of dust) {
    const y = d.y - ((now * d.speed) % (d.r * 90));
    ctx.globalAlpha = 0.12 + 0.16 * Math.abs(Math.sin(now * 0.0004 + d.phase));
    ctx.beginPath();
    ctx.arc(d.x + Math.sin(now * 0.0006 + d.phase) * 12, y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function drawArena(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#12181f');
  bg.addColorStop(0.55, '#0d1218');
  bg.addColorStop(1, '#070a0d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(124,252,155,0.07)';
  ctx.lineWidth = 1;
  const grid = 72;
  for (let x = grid; x < w; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, h * 0.62);
    ctx.lineTo(x + (x - w / 2) * 0.5, h);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(124,252,155,0.05)';
  for (let y = 1; y <= 5; y++) {
    const yy = h * 0.62 + (h - h * 0.62) * (y / 5) ** 1.7;
    ctx.beginPath();
    ctx.moveTo(0, yy);
    ctx.lineTo(w, yy);
    ctx.stroke();
  }
  const hy = h * 0.4;
  for (const fx of [0.12, 0.88]) {
    const x = w * fx;
    ctx.strokeStyle = 'rgba(124,252,155,0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 26, hy);
    ctx.lineTo(x + 26, hy);
    ctx.moveTo(x, hy - 26);
    ctx.lineTo(x, hy + 26);
    ctx.stroke();
  }
}

export function drawHitMarkers(ctx: CanvasRenderingContext2D, markers: HitMarker[], now: number): void {
  const LIFETIME = 400;
  for (const m of markers) {
    const age = now - m.t;
    if (age > LIFETIME) continue;
    ctx.globalAlpha = 1 - age / LIFETIME;
    const s = 12;
    if (m.kind === 'head') {
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(m.x, m.y - s);
      ctx.lineTo(m.x + s * 0.6, m.y);
      ctx.lineTo(m.x, m.y + s);
      ctx.lineTo(m.x - s * 0.6, m.y);
      ctx.closePath();
      ctx.fill();
    } else if (m.kind === 'hit') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(m.x - s * 0.5, m.y);
      ctx.lineTo(m.x + s * 0.5, m.y);
      ctx.moveTo(m.x, m.y - s * 0.5);
      ctx.lineTo(m.x, m.y + s * 0.5);
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m.x - s * 0.45, m.y - s * 0.45);
      ctx.lineTo(m.x + s * 0.45, m.y + s * 0.45);
      ctx.moveTo(m.x + s * 0.45, m.y - s * 0.45);
      ctx.lineTo(m.x - s * 0.45, m.y + s * 0.45);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}

export function drawCrosshair(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  style: CrosshairStyle,
): void {
  const { color, size, gap, thickness, dot } = style;
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x - gap, y);
  ctx.moveTo(x + gap, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y - gap);
  ctx.moveTo(x, y + gap);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  if (dot) {
    ctx.fillStyle = color;
    ctx.fillRect(x - thickness * 0.6, y - thickness * 0.6, thickness * 1.2, thickness * 1.2);
  }
  ctx.restore();
}

export function viewmodelMuzzle(
  w: number,
  h: number,
  crosshair: { x: number; y: number },
  state: ViewmodelState,
  t: number,
): { x: number; y: number } {
  const bob = Math.sin(t * 1.7) * 2;
  const rootX = w * 0.82 + state.swayX + state.moveBob * 0.7;
  const rootY = h * 0.99 + state.swayY + bob + state.crouchLift;
  const angle = Math.atan2(crosshair.y - rootY, crosshair.x - rootX) + state.moveBob * 0.0012;
  const L = w * 0.24;
  const kick = state.recoil * L * 0.12;
  return {
    x: rootX + Math.cos(angle) * (L * 0.98 - kick),
    y: rootY + Math.sin(angle) * (L * 0.98 - kick),
  };
}

export function drawViewmodel(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  crosshair: { x: number; y: number },
  state: ViewmodelState,
  t: number,
): void {
  const bob = Math.sin(t * 1.7) * 2;
  const breath = Math.sin(t * 0.9) * 1.2;
  const rootX = w * 0.82 + state.swayX + state.moveBob * 0.7;
  const rootY = h * 0.9 + state.swayY + bob + breath + state.crouchLift;
  const angle = Math.atan2(crosshair.y - rootY, crosshair.x - rootX) + state.moveBob * 0.0012;
  const L = w * 0.285;
  const kick = state.recoil * L * 0.12;

  ctx.save();
  ctx.translate(rootX, rootY);
  ctx.rotate(angle);
  // 上下翻转：让弹匣/握把/双手落在枪的下侧（否则会被转到屏幕外）
  ctx.scale(1, -1);
  ctx.translate(-kick, 0);
  ctx.globalAlpha = 0.98;

  const metal = (y0: number, y1: number): CanvasGradient => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, '#5a636e');
    g.addColorStop(0.35, '#39414a');
    g.addColorStop(1, '#171b20');
    return g;
  };
  const polymer = (y0: number, y1: number): CanvasGradient => {
    const g = ctx.createLinearGradient(0, y0, 0, y1);
    g.addColorStop(0, '#3d434b');
    g.addColorStop(1, '#1c2025');
    return g;
  };

  // 整体投影
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(L * 0.05, -12, L * 0.9, 30);
  ctx.restore();

  // 枪托（带腮托与底板）
  ctx.fillStyle = polymer(-16, 12);
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(L * 0.17, -9);
  ctx.lineTo(L * 0.17, 12);
  ctx.lineTo(L * 0.02, 16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#171a1e';
  ctx.fillRect(0, -13, 4, 30);
  ctx.fillStyle = 'rgba(255,226,180,0.20)';
  ctx.fillRect(L * 0.02, -11, L * 0.14, 1.6);

  // 机匣主体（含顶部导轨）
  ctx.fillStyle = metal(-14, 14);
  ctx.fillRect(L * 0.15, -11, L * 0.28, 21);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 1.4;
  ctx.strokeRect(L * 0.15, -11, L * 0.28, 21);
  // 导轨齿
  ctx.fillStyle = '#2b3138';
  ctx.fillRect(L * 0.15, -14, L * 0.3, 4);
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  for (let i = 0; i < 7; i++) {
    ctx.fillRect(L * (0.16 + i * 0.04), -13.5, 2, 3.5);
  }
  // 抛壳窗 + 拉机柄
  ctx.fillStyle = '#6a7480';
  ctx.fillRect(L * 0.27, -7, L * 0.075, 7);
  ctx.fillStyle = '#0f1216';
  ctx.fillRect(L * 0.28, -6, L * 0.055, 5);
  ctx.fillStyle = '#8b949e';
  ctx.fillRect(L * 0.24, -12.5, L * 0.05, 2.6);
  // 红色点缀（呼应素材）
  ctx.fillStyle = '#b8352a';
  ctx.fillRect(L * 0.17, -10, L * 0.02, 18);

  // 光学瞄具（红点）
  ctx.fillStyle = '#1b1f24';
  ctx.fillRect(L * 0.2, -22, L * 0.1, 9);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(L * 0.2, -22, L * 0.1, 9);
  ctx.fillStyle = 'rgba(255,60,60,0.9)';
  ctx.beginPath();
  ctx.arc(L * 0.25, -17, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // 握把 + 扳机护圈 + 扳机
  ctx.fillStyle = polymer(10, 30);
  ctx.beginPath();
  ctx.moveTo(L * 0.22, 9);
  ctx.lineTo(L * 0.16, 30);
  ctx.lineTo(L * 0.28, 30);
  ctx.lineTo(L * 0.31, 9);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#141719';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(L * 0.3, 14, 6, -0.5, Math.PI * 0.9);
  ctx.stroke();
  ctx.fillStyle = '#5b636c';
  ctx.fillRect(L * 0.29, 10, 2.4, 7);

  // 弹匣（前倾弧线）
  ctx.fillStyle = polymer(10, 34);
  ctx.beginPath();
  ctx.moveTo(L * 0.34, 9);
  ctx.quadraticCurveTo(L * 0.36, 24, L * 0.42, 32);
  ctx.lineTo(L * 0.5, 30);
  ctx.quadraticCurveTo(L * 0.44, 20, L * 0.43, 9);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,226,180,0.14)';
  ctx.fillRect(L * 0.35, 12, 2, 14);
  ctx.fillStyle = '#101317';
  ctx.fillRect(L * 0.4, 28, L * 0.12, 4);

  // 护木（暖色聚合物/木色，含散热孔与导轨）
  const wood = ctx.createLinearGradient(0, -8, 0, 12);
  wood.addColorStop(0, '#8a6540');
  wood.addColorStop(0.55, '#654729');
  wood.addColorStop(1, '#3a2a19');
  ctx.fillStyle = wood;
  ctx.fillRect(L * 0.43, -9, L * 0.27, 18);
  ctx.strokeStyle = 'rgba(0,0,0,0.45)';
  ctx.lineWidth = 1.3;
  ctx.strokeRect(L * 0.43, -9, L * 0.27, 18);
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(L * (0.46 + i * 0.055), -1.5, L * 0.03, 6);
  }
  ctx.fillStyle = 'rgba(255,226,180,0.22)';
  ctx.fillRect(L * 0.43, -9.5, L * 0.27, 1.6);
  ctx.fillStyle = '#2b3138';
  ctx.fillRect(L * 0.43, -12, L * 0.27, 3);

  // 枪管 + 枪口装置 + 准星座
  ctx.fillStyle = metal(-6, 6);
  ctx.fillRect(L * 0.69, -5, L * 0.22, 10);
  ctx.fillStyle = 'rgba(255,232,190,0.20)';
  ctx.fillRect(L * 0.69, -5, L * 0.22, 1.2);
  ctx.fillStyle = '#22272d';
  ctx.fillRect(L * 0.9, -7, L * 0.08, 14);
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  for (let i = 0; i < 3; i++) ctx.fillRect(L * 0.91, -5 + i * 4, L * 0.05, 2);
  ctx.fillStyle = '#12161a';
  ctx.beginPath();
  ctx.moveTo(L * 0.72, -10);
  ctx.lineTo(L * 0.735, -10);
  ctx.lineTo(L * 0.728, -14);
  ctx.closePath();
  ctx.fill();

  // 背带
  ctx.strokeStyle = 'rgba(60,52,40,0.85)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(L * 0.08, 8);
  ctx.quadraticCurveTo(L * 0.3, 26, L * 0.5, 12);
  ctx.stroke();

  // 前手（护木上，四指搭在导轨上方）
  const supportX = L * 0.55;
  ctx.fillStyle = '#3c4436';
  ctx.beginPath();
  ctx.moveTo(supportX + L * 0.02, 10);
  ctx.lineTo(supportX + L * 0.14, 34);
  ctx.lineTo(supportX - L * 0.04, 38);
  ctx.lineTo(supportX - L * 0.1, 14);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#d9a066';
  ctx.beginPath();
  ctx.roundRect(supportX - L * 0.06, -9, L * 0.15, 20, 6);
  ctx.fill();
  ctx.fillStyle = '#c08a55';
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.roundRect(supportX - L * 0.05 + i * L * 0.038, -13, L * 0.03, 9, 3);
    ctx.fill();
  }
  ctx.fillStyle = '#46503c';
  ctx.beginPath();
  ctx.moveTo(supportX + L * 0.04, 8);
  ctx.lineTo(supportX + L * 0.2, 40);
  ctx.lineTo(supportX - L * 0.02, 46);
  ctx.lineTo(supportX - L * 0.12, 16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(supportX - L * 0.06, 4, L * 0.16, 4);

  // 后手（握把处，四指包握）
  const gripX = L * 0.24;
  ctx.fillStyle = '#d9a066';
  ctx.beginPath();
  ctx.roundRect(gripX - L * 0.055, 9, L * 0.13, 19, 6);
  ctx.fill();
  ctx.fillStyle = '#c08a55';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.roundRect(gripX - L * 0.045 + i * L * 0.028, 16 + i * 2.4, L * 0.024, 10, 3);
    ctx.fill();
  }
  ctx.fillStyle = '#46503c';
  ctx.beginPath();
  ctx.moveTo(gripX - L * 0.08, 24);
  ctx.lineTo(gripX + L * 0.3, 44);
  ctx.lineTo(gripX + L * 0.16, 54);
  ctx.lineTo(gripX - L * 0.16, 32);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export function drawTracer(ctx: CanvasRenderingContext2D, tr: TracerFx, now: number): void {
  const LIFE = 90;
  const age = now - tr.t;
  if (age > LIFE) return;
  ctx.globalAlpha = (1 - age / LIFE) * 0.75;
  ctx.strokeStyle = '#ffe9a8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(tr.x1, tr.y1);
  ctx.lineTo(tr.x2, tr.y2);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

export function drawCasing(ctx: CanvasRenderingContext2D, c: CasingFx): void {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(c.rot);
  ctx.fillStyle = '#d4a94a';
  ctx.fillRect(-3.5, -1.5, 7, 3);
  ctx.restore();
}

export function drawMuzzleFlash(ctx: CanvasRenderingContext2D, x: number, y: number, intensity: number): void {
  if (intensity <= 0) return;
  const r = 10 + 16 * intensity;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(255,230,140,${0.9 * intensity})`);
  g.addColorStop(0.4, `rgba(255,170,60,${0.6 * intensity})`);
  g.addColorStop(1, 'rgba(255,120,30,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(255,220,120,${0.8 * intensity})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    ctx.beginPath();
    ctx.moveTo(x - Math.cos(a) * r * 1.3, y - Math.sin(a) * r * 1.3);
    ctx.lineTo(x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3);
    ctx.stroke();
  }
}
