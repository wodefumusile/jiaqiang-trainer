/**
 * 轻量会话存储（2D 版已全面移除，这里只保留 3D 版本需要的最小状态）
 * 目前只负责：训练结果（SessionSummary）的读写与持久化。
 */
import type { SessionSummary } from '../types';

const SESSIONS_KEY = 'jg.sessions.v2';
const MAX_SESSIONS = 50;

export function loadSessions(): SessionSummary[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    const parsed = raw ? (JSON.parse(raw) as SessionSummary[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 追加一条训练结果（保留最近 50 条） */
export function pushSession(summary: SessionSummary): void {
  const sessions = [summary, ...loadSessions()].slice(0, MAX_SESSIONS);
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch {
    // 存储不可用时不影响训练
  }
}
