import type { ModeId, SessionSummary } from '../types';
import { Game } from '../engine/game';
import { adjustMultiplier, calibrateMultiplier, cmPer360, pxPerCount } from '../config/sensitivity';
import { DIFFICULTIES } from '../config/difficulty';
import { MODES } from '../config/modes';
import { SCENES } from '../scenes/registry';
import {
  activeDifficulty,
  activeMode,
  activeProfile,
  activeScene,
  appStore,
  pushSession,
  setActiveProfile,
  setDifficulty,
  setMode,
  setScene,
  updateProfile,
} from '../state/appStore';
import { showToast } from './toast';
import { sfx } from '../engine/sfx';

function must<T>(v: T | null, name: string): T {
  if (v == null) throw new Error(`missing element: ${name}`);
  return v;
}

export function startTraining(app: HTMLElement): void {
  const mode = activeMode();
  const difficulty = activeDifficulty();
  const scene = mode.usesScene ? activeScene() : null;
  const sceneLabel = scene?.name ?? '竞技场';

  app.innerHTML = `
    <div class="training">
      <canvas id="train-canvas"></canvas>

      <div class="hud hud-top-left">
        <div class="hud-label">灵敏度</div>
        <div class="hud-title" id="hud-profile">--</div>
        <div class="hud-sub" id="hud-sens">--</div>
        <div class="hud-sub" id="hud-move">站立</div>
      </div>

      <div class="hud hud-top-center">
        <div class="hud-title" id="hud-mode">${mode.name}</div>
        <div class="hud-sub" id="hud-scene">${sceneLabel}</div>
        <div class="hud-sub" id="hud-diff">难度：${difficulty.name}</div>
      </div>

      <div class="hud hud-top-right" id="hud-stats">
        <div class="hud-line"><span id="stat1-label">命中率</span> <b id="stat1">--</b></div>
        <div class="hud-line"><span id="stat2-label">一次定位</span> <b id="stat2">--</b></div>
        <div class="hud-line"><span id="stat3-label">反应</span> <b id="stat3">--</b> ms</div>
        <div class="hud-line"><span id="stat4-label">连杀</span> <b id="stat4">0</b></div>
      </div>

      <div class="hud hud-bottom">鼠标转视角 · A/D 横移 · Ctrl 下蹲 · 1-5 灵敏度 · C 校准 · R 换弹 · Tab 模式 · Q/E 场景 · F1-F6 难度 · Esc 暂停</div>

      <div class="hud hud-bottom-right" id="hud-ammo">25 / 25</div>

      <div id="dmg-overlay"></div>
      <div class="kill-feed" id="kill-feed"></div>
      <div class="kill-banner" id="kill-banner"></div>

      <div class="overlay" id="start-overlay">
        <div class="overlay-card">
          <h2>${mode.name}</h2>
          <p>${mode.description}</p>
          <button id="lock-btn" class="btn-primary btn-lg">点击进入训练</button>
        </div>
      </div>

      <div class="overlay hidden" id="pause-overlay">
        <div class="overlay-card">
          <h2>已暂停</h2>
          <div class="cal-live" id="pause-stats">--</div>
          <div class="row">
            <button id="resume-btn" class="btn-primary">继续训练</button>
            <button id="end-btn" class="btn-danger">结束训练</button>
          </div>
        </div>
      </div>

      <div class="overlay hidden" id="cal-overlay">
        <div class="overlay-card">
          <h2>灵敏度校准</h2>
          <p>身体不动只移动鼠标，匀速转过设定角度。按 <b>C</b> 开始/结束记录，或点击下方按钮。</p>
          <div class="cal-row">
            <label>转动角度(°)<input type="number" id="cal-angle" value="180" min="45" max="360" step="15" /></label>
            <label>鼠标移动距离(cm)<input type="number" id="cal-cm" value="20" min="2" max="60" step="0.5" /></label>
          </div>
          <div class="cal-live">
            已记录移动：<b id="cal-counts">0</b> 计数<br />
            测得：<span id="cal-result">--</span>
          </div>
          <div class="row">
            <button id="cal-reset" class="btn-ghost">重新记录</button>
            <button id="cal-apply" class="btn-primary">应用并继续</button>
            <button id="cal-cancel" class="btn-ghost">取消</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const canvas = must(app.querySelector<HTMLCanvasElement>('#train-canvas'), 'canvas');
  const startOverlay = must(app.querySelector<HTMLElement>('#start-overlay'), 'start-overlay');
  const pauseOverlay = must(app.querySelector<HTMLElement>('#pause-overlay'), 'pause-overlay');
  const calOverlay = must(app.querySelector<HTMLElement>('#cal-overlay'), 'cal-overlay');
  const lockBtn = must(app.querySelector<HTMLButtonElement>('#lock-btn'), 'lock-btn');
  const resumeBtn = must(app.querySelector<HTMLButtonElement>('#resume-btn'), 'resume-btn');
  const endBtn = must(app.querySelector<HTMLButtonElement>('#end-btn'), 'end-btn');
  const pauseStats = must(app.querySelector<HTMLElement>('#pause-stats'), 'pause-stats');
  const calAngle = must(app.querySelector<HTMLInputElement>('#cal-angle'), 'cal-angle');
  const calCm = must(app.querySelector<HTMLInputElement>('#cal-cm'), 'cal-cm');
  const calCountsEl = must(app.querySelector<HTMLElement>('#cal-counts'), 'cal-counts');
  const calResultEl = must(app.querySelector<HTMLElement>('#cal-result'), 'cal-result');
  const calResetBtn = must(app.querySelector<HTMLButtonElement>('#cal-reset'), 'cal-reset');
  const calApplyBtn = must(app.querySelector<HTMLButtonElement>('#cal-apply'), 'cal-apply');
  const calCancelBtn = must(app.querySelector<HTMLButtonElement>('#cal-cancel'), 'cal-cancel');
  const dmgOverlay = must(app.querySelector<HTMLElement>('#dmg-overlay'), 'dmg-overlay');
  const killFeed = must(app.querySelector<HTMLElement>('#kill-feed'), 'kill-feed');
  const killBanner = must(app.querySelector<HTMLElement>('#kill-banner'), 'kill-banner');

  let calActive = false;
  let calCounts = 0;
  let calMoveHandler: ((e: MouseEvent) => void) | null = null;

  const game = new Game(canvas, mode, scene, difficulty, {
    getProfile: () => activeProfile(),
    getCrosshair: () => appStore.get().crosshair,
    onStats: (summary: SessionSummary) => {
      cleanup();
      pushSession(summary);
    },
    onPause: () => {
      if (calActive) closeCalibration(false);
      const st = game.liveStats();
      pauseStats.innerHTML =
        `击杀 ${st.kills} · 阵亡 ${st.deaths} · 命中率 ${fmtPct(st.accuracy)} · 一次定位 ${fmtPct(st.firstShotRate)} · 连杀 ${st.streak}`;
      pauseOverlay.classList.remove('hidden');
    },
    onHotkey: (code) => handleHotkey(code),
    onSensAdjust: (deltaY) => adjustSensitivity(deltaY),
    onShot: (hit, headshot) => {
      sfx.shot();
      if (headshot) sfx.headshot();
      else if (hit) sfx.hit();
      else sfx.miss();
    },
    onPlayerDown: () => {
      sfx.enemyShot();
      dmgOverlay.classList.remove('dmg-active');
      void dmgOverlay.offsetWidth;
      dmgOverlay.classList.add('dmg-active');
    },
    onKill: (info) => {
      sfx.killConfirm(info.streak);
      const label = info.headshot ? '爆头击杀' : `击杀（${info.shots} 枪）`;
      const entry = document.createElement('div');
      entry.className = 'kill-feed-item';
      entry.innerHTML = `<b>${label}</b> · ${info.reactionMs.toFixed(0)}ms`;
      killFeed.prepend(entry);
      while (killFeed.children.length > 5) killFeed.lastElementChild?.remove();
      window.setTimeout(() => entry.remove(), 6000);

      const streakText =
        info.streak >= 5 ? '五杀+' : info.streak === 4 ? '四杀' : info.streak === 3 ? '三杀' : info.streak === 2 ? '双杀' : '';
      killBanner.textContent = streakText ? `${streakText} · ${info.headshot ? '爆头' : '击杀'}` : info.headshot ? '爆头击杀' : '击杀';
      killBanner.className = `kill-banner show${info.headshot ? ' head' : ''}${info.streak >= 2 ? ' streak' : ''}`;
      window.setTimeout(() => {
        killBanner.className = 'kill-banner';
      }, 900);
    },
    getAmmoMode: () => appStore.get().ammoMode,
  });

  function restart(): void {
    cleanup();
    startTraining(app);
  }

  function handleHotkey(code: string): void {
    if (code === 'KeyC') {
      if (calActive) closeCalibration(true);
      else startCalibration();
      return;
    }
    if (calActive && code === 'Escape') {
      closeCalibration(false);
      return;
    }
    if (code.startsWith('Digit')) {
      const idx = Number(code.slice(5)) - 1;
      const profiles = appStore.get().profiles;
      const p = profiles[idx];
      if (p) {
        setActiveProfile(p.id);
        sfx.ui();
        showToast(`灵敏度档案：${p.name}`);
      }
      return;
    }
    if (code === 'Tab') {
      const idx = MODES.findIndex((m) => m.id === mode.id);
      const next = MODES[(idx + 1) % MODES.length];
      setMode(next.id as ModeId);
      showToast(`模式：${next.name}`);
      restart();
      return;
    }
    if (code === 'KeyQ' || code === 'KeyE') {
      if (!mode.usesScene) {
        showToast('拉枪模式使用竞技场，无场景可切换');
        return;
      }
      const idx = SCENES.findIndex((sc) => sc.id === scene?.id);
      const delta = code === 'KeyQ' ? -1 : 1;
      const next = SCENES[(idx + delta + SCENES.length) % SCENES.length];
      setScene(next.id);
      showToast(`场景：${next.name}`);
      restart();
      return;
    }
    if (/^F([1-6])$/.test(code)) {
      const d = DIFFICULTIES[Number(code.slice(1)) - 1];
      if (d) {
        setDifficulty(d.id);
        sfx.ui();
        showToast(`难度：${d.name}`);
        updateHud();
      }
    }
  }

  function adjustSensitivity(deltaY: number): void {
    const p = activeProfile();
    const factor = deltaY > 0 ? 0.99 : 1.01;
    const next = adjustMultiplier(p, factor);
    updateProfile(p.id, { multiplier: next.multiplier });
    showToast(`${p.name} 系数 ${next.multiplier.toFixed(4)} · cm/360 ${cmPer360(next).toFixed(2)}`);
  }

  function startCalibration(): void {
    if (document.pointerLockElement !== canvas) {
      showToast('需要鼠标捕获状态：点击画面进入训练后再按 C');
      return;
    }
    calActive = true;
    calCounts = 0;
    game.pause();
    calOverlay.classList.remove('hidden');
    updateCalResult();
    calMoveHandler = (e: MouseEvent) => {
      calCounts += Math.abs(e.movementX);
      updateCalResult();
    };
    document.addEventListener('mousemove', calMoveHandler);
  }

  function updateCalResult(): void {
    calCountsEl.textContent = String(Math.round(calCounts));
    const p = activeProfile();
    const angle = Number(calAngle.value) || 0;
    const cm = Number(calCm.value) || 0;
    if (calCounts > 0 && angle > 0 && cm > 0 && p.sens > 0) {
      const multiplier = calibrateMultiplier(calCounts, angle, p.sens);
      const cm360 = (cm * 360) / angle;
      calResultEl.textContent = `cm/360 = ${cm360.toFixed(2)} · 系数 = ${multiplier.toFixed(5)}`;
    } else {
      calResultEl.textContent = '--';
    }
  }

  function closeCalibration(apply: boolean): void {
    calActive = false;
    if (calMoveHandler) {
      document.removeEventListener('mousemove', calMoveHandler);
      calMoveHandler = null;
    }
    calOverlay.classList.add('hidden');
    if (apply) {
      const p = activeProfile();
      const angle = Number(calAngle.value) || 180;
      const cm = Number(calCm.value) || 20;
      const multiplier = calibrateMultiplier(calCounts, angle, p.sens);
      if (multiplier > 0) {
        const cm360 = (cm * 360) / angle;
        updateProfile(p.id, { multiplier });
        sfx.ui();
        showToast(`校准完成：实测 cm/360 ${cm360.toFixed(2)} · 系数 ${multiplier.toFixed(5)}`);
      } else {
        sfx.error();
        showToast('未检测到有效移动，校准已取消');
      }
    }
    game.resume();
  }

  function fmtPct(v: number): string {
    return v > 0 ? `${(v * 100).toFixed(1)}%` : '--';
  }

  function updateHud(): void {
    const p = activeProfile();
    const st = game.liveStats();
    const el = {
      profile: app.querySelector<HTMLElement>('#hud-profile'),
      sens: app.querySelector<HTMLElement>('#hud-sens'),
      scene: app.querySelector<HTMLElement>('#hud-scene'),
      diff: app.querySelector<HTMLElement>('#hud-diff'),
      s1l: app.querySelector<HTMLElement>('#stat1-label'),
      s1: app.querySelector<HTMLElement>('#stat1'),
      s2l: app.querySelector<HTMLElement>('#stat2-label'),
      s2: app.querySelector<HTMLElement>('#stat2'),
      s3l: app.querySelector<HTMLElement>('#stat3-label'),
      s3: app.querySelector<HTMLElement>('#stat3'),
      s4l: app.querySelector<HTMLElement>('#stat4-label'),
      s4: app.querySelector<HTMLElement>('#stat4'),
      ammo: app.querySelector<HTMLElement>('#hud-ammo'),
      move: app.querySelector<HTMLElement>('#hud-move'),
    };
    if (el.profile) el.profile.textContent = p.name;
    if (el.sens) {
      el.sens.textContent = `sens ${p.sens} · ${p.dpi} DPI · ${p.fov} FOV · ${pxPerCount(p, window.innerWidth).toFixed(3)} px/计数`;
    }
    if (el.move) {
      if (st.crouching) {
        el.move.textContent = '下蹲中';
        el.move.className = 'hud-sub hud-move-crouch';
      } else if (st.moving) {
        el.move.textContent = '移动中 · 散布极大';
        el.move.className = 'hud-sub hud-move-moving';
      } else {
        el.move.textContent = '站立';
        el.move.className = 'hud-sub';
      }
    }
    if (el.scene) el.scene.textContent = sceneLabel;
    if (el.diff) el.diff.textContent = `难度：${activeDifficulty().name}`;

    let lines: [string, string][] = [];
    if (mode.id === 'flick') {
      lines = [
        ['命中率', fmtPct(st.accuracy)],
        ['拉枪时间', st.flickTimeMs > 0 ? `${st.flickTimeMs.toFixed(0)} ms` : '--'],
        ['拉枪距离', st.flickDistPx > 0 ? `${st.flickDistPx.toFixed(0)} px` : '--'],
        ['连杀', String(st.streak)],
      ];
    } else if (mode.id === 'tracking') {
      lines = [
        ['跟枪占比', st.trackPct > 0 ? `${st.trackPct.toFixed(1)}%` : '--'],
        ['命中率', fmtPct(st.accuracy)],
        ['反应', st.avgReactionMs > 0 ? `${st.avgReactionMs.toFixed(0)} ms` : '--'],
        ['连杀', String(st.streak)],
      ];
    } else if (mode.id === 'preaim') {
      lines = [
        ['预瞄偏差', st.preaimErrPx > 0 ? `${st.preaimErrPx.toFixed(0)} px` : '--'],
        ['反应', st.avgReactionMs > 0 ? `${st.avgReactionMs.toFixed(0)} ms` : '--'],
        ['一次定位', fmtPct(st.firstShotRate)],
        ['连杀', String(st.streak)],
      ];
    } else if (mode.id === 'holding') {
      lines = [
        ['反应', st.avgReactionMs > 0 ? `${st.avgReactionMs.toFixed(0)} ms` : '--'],
        ['位移', st.displacementPx > 0 ? `${st.displacementPx.toFixed(0)} px` : '--'],
        ['一次定位', fmtPct(st.firstShotRate)],
        ['连杀', String(st.streak)],
      ];
    } else {
      lines = [
        ['命中率', fmtPct(st.accuracy)],
        ['一次定位', fmtPct(st.firstShotRate)],
        ['反应', st.avgReactionMs > 0 ? `${st.avgReactionMs.toFixed(0)} ms` : '--'],
        ['连杀', String(st.streak)],
      ];
    }
    if (el.s1l && el.s1) [el.s1l.textContent, el.s1.textContent] = lines[0];
    if (el.s2l && el.s2) [el.s2l.textContent, el.s2.textContent] = lines[1];
    if (el.s3l && el.s3) [el.s3l.textContent, el.s3.textContent] = lines[2];
    if (el.s4l && el.s4) [el.s4l.textContent, el.s4.textContent] = lines[3];
    if (el.ammo) {
      if (st.reloading) {
        el.ammo.textContent = '换弹中...';
        el.ammo.classList.add('hud-reloading');
      } else if (appStore.get().ammoMode === 'infinite') {
        el.ammo.textContent = '∞';
        el.ammo.classList.remove('hud-reloading');
        el.ammo.classList.remove('hud-ammo-empty');
      } else {
        el.ammo.textContent = `${st.ammo} / ${st.magSize}`;
        el.ammo.classList.remove('hud-reloading');
        el.ammo.classList.toggle('hud-ammo-empty', st.ammo === 0);
      }
    }
  }

  const hudTimer = window.setInterval(updateHud, 200);
  updateHud();

  function cleanup(): void {
    window.clearInterval(hudTimer);
    if (calMoveHandler) document.removeEventListener('mousemove', calMoveHandler);
    game.dispose();
  }

  lockBtn.addEventListener('click', () => {
    startOverlay.classList.add('hidden');
    game.start();
    game.requestLock();
  });

  resumeBtn.addEventListener('click', () => {
    pauseOverlay.classList.add('hidden');
    game.resume();
    game.requestLock();
  });

  endBtn.addEventListener('click', () => {
    game.endSession();
  });

  calAngle.addEventListener('input', updateCalResult);
  calCm.addEventListener('input', updateCalResult);
  calResetBtn.addEventListener('click', () => {
    calCounts = 0;
    updateCalResult();
  });
  calApplyBtn.addEventListener('click', () => closeCalibration(true));
  calCancelBtn.addEventListener('click', () => closeCalibration(false));
}
