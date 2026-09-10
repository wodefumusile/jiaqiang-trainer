import type { CrosshairStyle, ModeId, Phase, SensitivityProfile, SessionSummary } from '../types';
import { difficultyById, type DifficultyConfig } from '../config/difficulty';
import { modeById, type ModeConfig } from '../config/modes';
import {
  loadActiveProfileId,
  loadAmmoMode,
  loadCrosshair,
  loadDifficultyId,
  loadModeId,
  loadProfiles,
  loadSceneId,
  loadSessions,
  loadSfxEnabled,
  saveActiveProfileId,
  saveAmmoMode,
  saveCrosshair,
  saveDifficultyId,
  saveModeId,
  saveProfiles,
  saveSceneId,
  saveSessions,
  saveSfxEnabled,
} from '../stats/store';
import { createStore } from '../utils/store';
import { SCENES } from '../scenes/registry';

interface AppState {
  phase: Phase;
  profiles: SensitivityProfile[];
  activeProfileId: string;
  sessions: SessionSummary[];
  modeId: ModeId;
  sceneId: string;
  difficultyId: string;
  ammoMode: string;
  crosshair: CrosshairStyle;
  sfxEnabled: boolean;
  lastSession: SessionSummary | null;
}

const DEFAULT_CROSSHAIR: CrosshairStyle = {
  color: '#7cfc9b',
  size: 11,
  gap: 2.5,
  thickness: 2,
  dot: true,
};

const initialProfiles = loadProfiles();
const initialActive =
  loadActiveProfileId() || initialProfiles[0]?.id || '';

export const appStore = createStore<AppState>({
  phase: 'menu',
  profiles: initialProfiles,
  activeProfileId: initialActive,
  sessions: loadSessions(),
  modeId: (loadModeId() || 'positioning') as ModeId,
  sceneId: loadSceneId() || SCENES[0].id,
  difficultyId: loadDifficultyId() || 'normal',
  ammoMode: loadAmmoMode() || 'infinite',
  crosshair: loadCrosshair() ?? DEFAULT_CROSSHAIR,
  sfxEnabled: loadSfxEnabled(),
  lastSession: null,
});

export function activeProfile(): SensitivityProfile {
  const s = appStore.get();
  return s.profiles.find((p) => p.id === s.activeProfileId) ?? s.profiles[0];
}

export function activeScene() {
  const s = appStore.get();
  return SCENES.find((sc) => sc.id === s.sceneId) ?? SCENES[0];
}

export function activeMode(): ModeConfig {
  return modeById(appStore.get().modeId);
}

export function setMode(id: ModeId): void {
  appStore.set({ modeId: id });
  saveModeId(id);
}

export function setScene(id: string): void {
  appStore.set({ sceneId: id });
  saveSceneId(id);
}

export function updateProfile(id: string, patch: Partial<SensitivityProfile>): void {
  const s = appStore.get();
  const profiles = s.profiles.map((p) => (p.id === id ? { ...p, ...patch } : p));
  appStore.set({ profiles });
  saveProfiles(profiles);
}

export function setActiveProfile(id: string): void {
  appStore.set({ activeProfileId: id });
  saveActiveProfileId(id);
}

export function addProfile(profile: SensitivityProfile): void {
  const s = appStore.get();
  const profiles = [...s.profiles, profile];
  appStore.set({ profiles });
  saveProfiles(profiles);
}

export function removeProfile(id: string): void {
  const s = appStore.get();
  if (s.profiles.length <= 1) return;
  const profiles = s.profiles.filter((p) => p.id !== id);
  const activeProfileId = s.activeProfileId === id ? profiles[0].id : s.activeProfileId;
  appStore.set({ profiles, activeProfileId });
  saveProfiles(profiles);
  saveActiveProfileId(activeProfileId);
}

export function pushSession(summary: SessionSummary): void {
  const sessions = [summary, ...appStore.get().sessions].slice(0, 50);
  appStore.set({ sessions, lastSession: summary, phase: 'results' });
  saveSessions(sessions);
}

export function setDifficulty(id: string): void {
  appStore.set({ difficultyId: id });
  saveDifficultyId(id);
}

export function setAmmoMode(mode: string): void {
  appStore.set({ ammoMode: mode });
  saveAmmoMode(mode);
}

export function setCrosshair(patch: Partial<CrosshairStyle>): void {
  const crosshair = { ...appStore.get().crosshair, ...patch };
  appStore.set({ crosshair });
  saveCrosshair(crosshair);
}

export function setSfxEnabled(on: boolean): void {
  appStore.set({ sfxEnabled: on });
  saveSfxEnabled(on);
}

export function activeDifficulty(): DifficultyConfig {
  return difficultyById(appStore.get().difficultyId);
}

export function gotoPhase(phase: Phase): void {
  appStore.set({ phase });
}
