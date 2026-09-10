import type { CrosshairStyle, SensitivityProfile, SessionSummary } from '../types';
import { defaultProfiles } from '../config/sensitivity';

const PROFILES_KEY = 'jg.profiles.v1';
const ACTIVE_KEY = 'jg.activeProfileId.v1';
const SESSIONS_KEY = 'jg.sessions.v1';
const DIFFICULTY_KEY = 'jg.difficulty.v1';
const CROSSHAIR_KEY = 'jg.crosshair.v1';
const SFX_KEY = 'jg.sfx.v1';
const MODE_KEY = 'jg.mode.v1';
const SCENE_KEY = 'jg.scene.v1';
const AMMO_MODE_KEY = 'jg.ammoMode.v1';

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 存储满等异常忽略，不阻塞训练
  }
}

export function loadProfiles(): SensitivityProfile[] {
  const stored = read<SensitivityProfile[]>(PROFILES_KEY);
  if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  const defaults = defaultProfiles();
  write(PROFILES_KEY, defaults);
  return defaults;
}

export function saveProfiles(profiles: SensitivityProfile[]): void {
  write(PROFILES_KEY, profiles);
}

export function loadActiveProfileId(): string {
  return read<string>(ACTIVE_KEY) ?? '';
}

export function saveActiveProfileId(id: string): void {
  write(ACTIVE_KEY, id);
}

export function loadSessions(): SessionSummary[] {
  const stored = read<SessionSummary[]>(SESSIONS_KEY);
  return Array.isArray(stored) ? stored : [];
}

export function saveSessions(sessions: SessionSummary[]): void {
  write(SESSIONS_KEY, sessions.slice(0, 50));
}

export function loadDifficultyId(): string {
  return read<string>(DIFFICULTY_KEY) ?? '';
}

export function saveDifficultyId(id: string): void {
  write(DIFFICULTY_KEY, id);
}

export function loadCrosshair(): CrosshairStyle | null {
  return read<CrosshairStyle>(CROSSHAIR_KEY);
}

export function saveCrosshair(style: CrosshairStyle): void {
  write(CROSSHAIR_KEY, style);
}

export function loadSfxEnabled(): boolean {
  const v = read<boolean>(SFX_KEY);
  return v === null ? true : v;
}

export function saveSfxEnabled(on: boolean): void {
  write(SFX_KEY, on);
}

export function loadModeId(): string {
  return read<string>(MODE_KEY) ?? '';
}

export function saveModeId(id: string): void {
  write(MODE_KEY, id);
}

export function loadSceneId(): string {
  return read<string>(SCENE_KEY) ?? '';
}

export function saveSceneId(id: string): void {
  write(SCENE_KEY, id);
}

export function loadAmmoMode(): string {
  return read<string>(AMMO_MODE_KEY) ?? '';
}

export function saveAmmoMode(mode: string): void {
  write(AMMO_MODE_KEY, mode);
}
