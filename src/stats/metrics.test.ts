import { describe, expect, it } from 'vitest';
import type { EncounterRecord } from '../types';
import { summarizeSession } from './metrics';

function enc(over: Partial<EncounterRecord>): EncounterRecord {
  return {
    targetId: 1,
    appearAt: 1000,
    firstShotAt: 1300,
    firstShotHit: true,
    firstShotHead: true,
    shotsFired: 1,
    killed: true,
    killAt: 1300,
    escaped: false,
    flickDistPx: null,
    preaimErrPx: null,
    displacementPx: null,
    trackMs: null,
    activeDurMs: null,
    attacked: false,
    ...over,
  };
}

describe('summarizeSession 指标汇总', () => {
  it('计算命中率/一次定位率/补枪/过冲欠冲/连杀', () => {
    const shots = [
      { t: 300, hit: true, head: true, targetX: 500, targetY: 300, distX: 2 },
      { t: 600, hit: false, head: false, targetX: 500, targetY: 300, distX: -30 },
      { t: 700, hit: true, head: true, targetX: 500, targetY: 300, distX: 4 },
      { t: 900, hit: false, head: false, targetX: 500, targetY: 300, distX: 25 },
    ];
    const encounters = [
      enc({ targetId: 1, firstShotHit: true, shotsFired: 1, killed: true }),
      enc({ targetId: 2, firstShotHit: false, firstShotHead: false, shotsFired: 3, killed: true }),
      enc({ targetId: 3, firstShotHit: false, firstShotAt: null, shotsFired: 0, killed: false, escaped: true, killAt: null }),
    ];
    const s = summarizeSession({
      modeId: 'positioning',
      sceneId: 's',
      sceneName: '窄门',
      difficultyId: 'normal',
      difficultyName: '普通',
      profileId: 'p',
      profileName: 'P',
      startedAt: 0,
      durationMs: 10000,
      shots,
      encounters,
      moveDir: 1,
    });

    expect(s.shots).toBe(4);
    expect(s.hits).toBe(2);
    expect(s.headshots).toBe(2);
    expect(s.accuracy).toBeCloseTo(0.5);
    expect(s.encounters).toBe(3);
    expect(s.kills).toBe(2);
    expect(s.firstShotRate).toBeCloseTo(1 / 3);
    expect(s.avgReactionMs).toBeCloseTo(300);
    expect(s.avgCorrectionsPerKill).toBeCloseTo((4 - 2) / 2);
    expect(s.overshoots).toBe(3);
    expect(s.undershoots).toBe(1);
    expect(s.maxStreak).toBe(2);
  });

  it('左移方向时过冲/欠冲取反', () => {
    const shots = [
      { t: 0, hit: false, head: false, targetX: 500, targetY: 300, distX: 10 },
      { t: 1, hit: false, head: false, targetX: 500, targetY: 300, distX: -10 },
    ];
    const s = summarizeSession({
      modeId: 'positioning',
      sceneId: 's',
      sceneName: '窄门',
      difficultyId: 'hard',
      difficultyName: '进阶',
      profileId: 'p',
      profileName: 'P',
      startedAt: 0,
      durationMs: 1000,
      shots,
      encounters: [enc({ killed: false, escaped: true, firstShotAt: null, killAt: null })],
      moveDir: -1,
    });
    // moveDir=-1：distX=10（偏右）→ 相对移动方向落后 = 欠冲；distX=-10（偏左）→ 冲过目标 = 过冲
    expect(s.overshoots).toBe(1);
    expect(s.undershoots).toBe(1);
  });

  it('模式专属指标：拉枪时间/距离/预瞄偏差/位移', () => {
    const shots = [
      { t: 0, hit: true, head: true, targetX: 500, targetY: 300, distX: 0 },
      { t: 1, hit: true, head: true, targetX: 500, targetY: 300, distX: 0 },
    ];
    const encounters = [
      enc({
        targetId: 1,
        appearAt: 1000,
        killAt: 1450,
        firstShotAt: 1450,
        killed: true,
        flickDistPx: 1200,
        preaimErrPx: 80,
        displacementPx: 40,
      }),
      enc({
        targetId: 2,
        appearAt: 2000,
        killAt: 2350,
        firstShotAt: 2350,
        killed: true,
        flickDistPx: 1200,
        preaimErrPx: 120,
        displacementPx: 70,
      }),
      enc({ targetId: 3, appearAt: 3000, firstShotAt: null, killed: false, escaped: true, killAt: null }),
    ];
    const s = summarizeSession({
      modeId: 'flick',
      sceneId: 'arena',
      sceneName: '竞技场',
      difficultyId: 'normal',
      difficultyName: '普通',
      profileId: 'p',
      profileName: 'P',
      startedAt: 0,
      durationMs: 5000,
      shots,
      encounters,
      moveDir: 1,
    });
    expect(s.modeExtra.flickTimeMs).toBeCloseTo(400);
    expect(s.modeExtra.flickDistPx).toBeCloseTo(1200);
    expect(s.modeExtra.preaimErrPx).toBeCloseTo(100);
    expect(s.modeExtra.displacementPx).toBeCloseTo(55);
  });

  it('跟枪占比：枪口停留时间 / 目标活跃时长', () => {
    const encounters = [
      enc({ targetId: 1, trackMs: 500, activeDurMs: 1000 }),
      enc({ targetId: 2, trackMs: 300, activeDurMs: 1000 }),
    ];
    const s = summarizeSession({
      modeId: 'tracking',
      sceneId: 'narrow-door',
      sceneName: '窄门',
      difficultyId: 'normal',
      difficultyName: '普通',
      profileId: 'p',
      profileName: 'P',
      startedAt: 0,
      durationMs: 5000,
      shots: [],
      encounters,
      moveDir: 1,
    });
    expect(s.modeExtra.trackPct).toBeCloseTo(40);
  });
});
