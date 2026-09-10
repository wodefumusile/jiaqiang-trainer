import { describe, expect, it } from 'vitest';
import { hitZone } from './hitTest';

describe('hitZone 命中判定', () => {
  const head = { x: 100, y: 100, r: 20 };
  const body = { x: 80, y: 120, w: 40, h: 80 };

  it('头部命中', () => {
    expect(hitZone(100, 100, head, body)).toBe('head');
    expect(hitZone(112, 95, head, body)).toBe('head');
  });

  it('身体命中', () => {
    expect(hitZone(90, 150, head, body)).toBe('body');
    expect(hitZone(119, 199, head, body)).toBe('body');
  });

  it('脱靶', () => {
    expect(hitZone(10, 10, head, body)).toBe('miss');
    expect(hitZone(100, 300, head, body)).toBe('miss');
  });
});
