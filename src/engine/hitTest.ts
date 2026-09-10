export interface Circle {
  x: number;
  y: number;
  r: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function pointInCircle(px: number, py: number, c: Circle): boolean {
  const dx = px - c.x;
  const dy = py - c.y;
  return dx * dx + dy * dy <= c.r * c.r;
}

export function pointInRect(px: number, py: number, r: Rect): boolean {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

export type HitZone = 'head' | 'body' | 'miss';

export function hitZone(px: number, py: number, head: Circle, body: Rect): HitZone {
  if (pointInCircle(px, py, head)) return 'head';
  if (pointInRect(px, py, body)) return 'body';
  return 'miss';
}
