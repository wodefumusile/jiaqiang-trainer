import type { EncounterRecord, ModeId, ModeExtra, SessionSummary, ShotRecord } from '../types';
import { uid } from '../utils/id';

export interface SessionInput {
  modeId: ModeId;
  sceneId: string;
  sceneName: string;
  difficultyId: string;
  difficultyName: string;
  profileId: string;
  profileName: string;
  startedAt: number;
  durationMs: number;
  shots: ShotRecord[];
  wastedShots?: number;
  encounters: EncounterRecord[];
  moveDir: 1 | -1;
}

export function summarizeSession(input: SessionInput): SessionSummary {
  const shots = input.shots;
  const hits = shots.filter((s) => s.hit).length;
  const headshots = shots.filter((s) => s.head).length;
  const encounters = input.encounters;
  const kills = encounters.filter((e) => e.killed).length;

  let firstShotHits = 0;
  let reactionSum = 0;
  let reactionCount = 0;
  for (const e of encounters) {
    if (e.firstShotHit) firstShotHits++;
    if (e.firstShotAt != null) {
      reactionSum += e.firstShotAt - e.appearAt;
      reactionCount++;
    }
  }

  let overshoots = 0;
  let undershoots = 0;
  for (const s of shots) {
    const signed = input.moveDir > 0 ? s.distX : -s.distX;
    if (signed > 0) overshoots++;
    else if (signed < 0) undershoots++;
  }

  let maxStreak = 0;
  let streak = 0;
  for (const e of encounters) {
    streak = e.killed ? streak + 1 : 0;
    if (streak > maxStreak) maxStreak = streak;
  }

  // 击杀所需的额外子弹 = 总射击数 - 击杀数（每击杀的最后一发是击杀弹）
  const extraShots = Math.max(0, shots.length - kills);
  const avg = (arr: number[]): number => (arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  const flickKills =
    input.modeId === 'flick' ? encounters.filter((e) => e.killed && e.killAt != null) : [];
  const flickTimeMs =
    flickKills.length > 0
      ? flickKills.reduce((sum, e) => sum + ((e.killAt ?? 0) - e.appearAt), 0) / flickKills.length
      : 0;
  const modeExtra: ModeExtra = {
    flickTimeMs,
    flickDistPx: avg(encounters.filter((e) => e.flickDistPx != null).map((e) => e.flickDistPx ?? 0)),
    preaimErrPx: avg(encounters.filter((e) => e.preaimErrPx != null).map((e) => e.preaimErrPx ?? 0)),
    displacementPx: avg(encounters.filter((e) => e.displacementPx != null).map((e) => e.displacementPx ?? 0)),
    trackPct:
      input.modeId === 'tracking'
        ? (() => {
            const track = encounters.reduce((sum, e) => sum + (e.trackMs ?? 0), 0);
            const active = encounters.reduce((sum, e) => sum + (e.activeDurMs ?? 0), 0);
            return active > 0 ? (track / active) * 100 : 0;
          })()
        : 0,
  };
  const deaths = encounters.filter((e) => e.attacked).length;

  return {
    id: uid(),
    modeId: input.modeId,
    sceneId: input.sceneId,
    sceneName: input.sceneName,
    difficultyId: input.difficultyId,
    difficultyName: input.difficultyName,
    profileId: input.profileId,
    profileName: input.profileName,
    startedAt: input.startedAt,
    durationMs: input.durationMs,
    shots: shots.length,
    wastedShots: input.wastedShots ?? 0,
    hits,
    headshots,
    accuracy: shots.length > 0 ? hits / shots.length : 0,
    encounters: encounters.length,
    kills,
    firstShotHits,
    firstShotRate: encounters.length > 0 ? firstShotHits / encounters.length : 0,
    avgReactionMs: reactionCount > 0 ? reactionSum / reactionCount : 0,
    avgCorrectionsPerKill: kills > 0 ? extraShots / kills : 0,
    overshoots,
    undershoots,
    maxStreak,
    deaths,
    modeExtra,
  };
}
