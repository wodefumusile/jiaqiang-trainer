import type { CrosshairStyle, GamePreset, ModeId, SensitivityProfile } from '../types';
import { cmPer360, createProfile, multiplierForPreset, pxPerCount } from '../config/sensitivity';
import { DIFFICULTIES, difficultyById } from '../config/difficulty';
import { MODES } from '../config/modes';
import { SCENES } from '../scenes/registry';
import {
  addProfile,
  activeMode,
  activeProfile,
  activeScene,
  appStore,
  gotoPhase,
  removeProfile,
  setActiveProfile,
  setCrosshair,
  setDifficulty,
  setAmmoMode,
  setMode,
  setScene,
  setSfxEnabled,
  updateProfile,
} from '../state/appStore';
import { startTraining } from './training';
import { drawCrosshair } from '../engine/renderer';
import { sfx } from '../engine/sfx';
import { clamp } from '../utils/math';

export function renderMenu(app: HTMLElement): void {
  const s = appStore.get();
  const activeDiff = difficultyById(s.difficultyId);
  const activeM = activeMode();
  const activeSc = activeScene();
  const cross = s.crosshair;

  app.innerHTML = `
    <div class="menu">
      <header class="menu-head">
        <h1>架枪训练器</h1>
        <p class="sub">FPS Aim Trainer · 一次定位 / 二次定位 / 预瞄 / 架枪</p>
      </header>

      <section class="panel">
        <h2>训练模式</h2>
        <div class="card-grid">
          ${MODES.map(
            (m) => `
            <button type="button" class="card card-select ${activeM.id === m.id ? 'card-active' : ''}" data-mode="${m.id}">
              <div class="card-title">${m.name} <span class="badge badge-ok">可选</span></div>
              <p>${m.description}</p>
            </button>`,
          ).join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>训练场景</h2>
          <span class="hint">${activeM.usesScene ? '点击选择场景' : '拉枪模式使用竞技场，不依赖场景'}</span>
        </div>
        <div class="card-grid">
          ${SCENES.map(
            (sc) => `
            <button type="button" class="card card-select ${activeSc.id === sc.id && activeM.usesScene ? 'card-active' : ''} ${activeM.usesScene ? '' : 'card-dim'}" data-scene="${sc.id}">
              <div class="card-title">${sc.name} <span class="badge badge-ok">可选</span></div>
              <p>${sc.description}</p>
            </button>`,
          ).join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>难度选择</h2>
          <span class="hint">影响目标速度、头部尺寸与出现间隔</span>
        </div>
        <div class="difficulty-grid" id="difficulty-grid">
          ${DIFFICULTIES.map(
            (d) => `
            <button type="button" class="difficulty-card ${activeDiff.id === d.id ? 'difficulty-active' : ''}" data-difficulty="${d.id}">
              <span class="difficulty-name">${d.name}</span>
              <span class="difficulty-desc">${d.description}</span>
            </button>`,
          ).join('')}
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>准星自定义</h2>
          <span class="hint">训练中即时生效</span>
        </div>
        <div class="crosshair-row">
          <canvas id="ch-preview" width="90" height="90" class="ch-preview"></canvas>
          <div class="crosshair-fields">
            <label>颜色 <input type="color" id="ch-color" value="${cross.color}" /></label>
            <label>长度 <input type="number" id="ch-size" value="${cross.size}" min="4" max="30" step="1" /></label>
            <label>间距 <input type="number" id="ch-gap" value="${cross.gap}" min="0" max="15" step="0.5" /></label>
            <label>粗细 <input type="number" id="ch-thick" value="${cross.thickness}" min="1" max="8" step="0.5" /></label>
            <label class="chk"><input type="checkbox" id="ch-dot" ${cross.dot ? 'checked' : ''} /> 中心点</label>
            <label class="chk"><input type="checkbox" id="sfx-toggle" ${s.sfxEnabled ? 'checked' : ''} /> 音效</label>
            <label class="chk"><input type="checkbox" id="ammo-infinite" ${s.ammoMode === 'infinite' ? 'checked' : ''} /> 无限子弹</label>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>灵敏度档案</h2>
          <span class="hint">训练中 1-5 快速切换 · Alt+滚轮 微调 · C 键实测校准</span>
        </div>
        <div id="profile-list"></div>
        <button id="add-profile" class="btn-ghost">+ 添加档案</button>
      </section>

      <div class="start-row">
        <button id="start-btn" class="btn-primary btn-lg">开始训练 · ${activeM.name} × ${activeM.usesScene ? activeSc.name : '竞技场'}</button>
        <p class="hint">进入训练后点击画面捕获鼠标，Esc 暂停</p>
      </div>

      <footer class="hint footer">
        热键：1-5 灵敏度 · Alt+滚轮 微调 · C 校准 · Tab 切模式 · Q/E 切场景 · F1-F6 难度 · Esc 暂停
      </footer>
    </div>
  `;

  renderProfileList();
  sfx.setEnabled(s.sfxEnabled);
  drawCrosshairPreview();
  wireMode();
  wireScene();
  wireDifficulty();
  wireCrosshair();
  wireStart();
  wireAddProfile();

  function wireStart(): void {
    app.querySelector<HTMLButtonElement>('#start-btn')?.addEventListener('click', () => {
      sfx.ui();
      gotoPhase('training');
      startTraining(app);
    });
  }

  function wireMode(): void {
    const cards = app.querySelectorAll<HTMLButtonElement>('[data-mode]');
    cards.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.mode as ModeId;
        setMode(id);
        sfx.ui();
        renderMenu(app);
      });
    });
  }

  function wireScene(): void {
    const cards = app.querySelectorAll<HTMLButtonElement>('[data-scene]');
    cards.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.scene;
        if (!id || !activeMode().usesScene) return;
        setScene(id);
        sfx.ui();
        renderMenu(app);
      });
    });
  }

  function wireDifficulty(): void {
    const grid = app.querySelector<HTMLElement>('#difficulty-grid');
    grid?.querySelectorAll<HTMLButtonElement>('[data-difficulty]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.difficulty;
        if (!id) return;
        setDifficulty(id);
        sfx.ui();
        grid.querySelectorAll<HTMLButtonElement>('[data-difficulty]').forEach((b) => {
          b.classList.toggle('difficulty-active', b === btn);
        });
      });
    });
  }

  function wireCrosshair(): void {
    const color = app.querySelector<HTMLInputElement>('#ch-color');
    const size = app.querySelector<HTMLInputElement>('#ch-size');
    const gap = app.querySelector<HTMLInputElement>('#ch-gap');
    const thick = app.querySelector<HTMLInputElement>('#ch-thick');
    const dot = app.querySelector<HTMLInputElement>('#ch-dot');
    const sfxToggle = app.querySelector<HTMLInputElement>('#sfx-toggle');

    color?.addEventListener('input', () => {
      setCrosshair({ color: color.value });
      drawCrosshairPreview();
    });
    size?.addEventListener('input', () => {
      const v = Number(size.value);
      if (Number.isFinite(v)) setCrosshair({ size: clamp(v, 4, 30) });
      drawCrosshairPreview();
    });
    gap?.addEventListener('input', () => {
      const v = Number(gap.value);
      if (Number.isFinite(v)) setCrosshair({ gap: clamp(v, 0, 15) });
      drawCrosshairPreview();
    });
    thick?.addEventListener('input', () => {
      const v = Number(thick.value);
      if (Number.isFinite(v)) setCrosshair({ thickness: clamp(v, 1, 8) });
      drawCrosshairPreview();
    });
    dot?.addEventListener('change', () => {
      setCrosshair({ dot: dot.checked });
      drawCrosshairPreview();
    });
    sfxToggle?.addEventListener('change', () => {
      setSfxEnabled(sfxToggle.checked);
      sfx.setEnabled(sfxToggle.checked);
      if (sfxToggle.checked) sfx.ui();
    });
    const ammoInfinite = app.querySelector<HTMLInputElement>('#ammo-infinite');
    ammoInfinite?.addEventListener('change', () => {
      setAmmoMode(ammoInfinite.checked ? 'infinite' : 'magazine');
      sfx.ui();
    });
  }

  function wireAddProfile(): void {
    app.querySelector<HTMLButtonElement>('#add-profile')?.addEventListener('click', () => {
      const base = activeProfile();
      const p = createProfile(
        `新档案 ${appStore.get().profiles.length + 1}`,
        'custom',
        base.sens,
        base.dpi,
        base.fov,
      );
      addProfile(p);
      sfx.ui();
      renderProfileList();
    });
  }

  function drawCrosshairPreview(): void {
    const canvas = app.querySelector<HTMLCanvasElement>('#ch-preview');
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const c: CrosshairStyle = appStore.get().crosshair;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCrosshair(ctx, 45, 45, {
      ...c,
      size: Math.min(20, c.size * 1.8),
      gap: Math.min(12, c.gap * 1.8),
      thickness: Math.max(1, c.thickness * 1.4),
    });
  }
}

function renderProfileList(): void {
  const list = document.querySelector<HTMLElement>('#profile-list');
  if (!list) return;
  const s = appStore.get();
  list.innerHTML = s.profiles
    .map((p) => {
      const active = p.id === s.activeProfileId;
      const meta = `cm/360 = ${cmPer360(p).toFixed(2)} · px/计数(1920) = ${pxPerCount(p, 1920).toFixed(4)}`;
      return `
        <div class="profile-card ${active ? 'profile-active' : ''}" data-id="${p.id}">
          <div class="profile-head">
            <label class="profile-select">
              <input type="radio" name="profile" data-radio="${p.id}" ${active ? 'checked' : ''} />
              <span class="profile-name">${p.name}</span>
            </label>
            <button class="btn-ghost btn-sm" data-del="${p.id}" ${s.profiles.length <= 1 ? 'disabled' : ''}>删除</button>
          </div>
          <div class="profile-fields">
            <label>名称 <input type="text" data-field="name" data-id="${p.id}" value="${p.name}" /></label>
            <label>预设
              <select data-field="preset" data-id="${p.id}">
                <option value="cs2" ${p.preset === 'cs2' ? 'selected' : ''}>CS2</option>
                <option value="valorant" ${p.preset === 'valorant' ? 'selected' : ''}>Valorant</option>
                <option value="custom" ${p.preset === 'custom' ? 'selected' : ''}>自定义</option>
              </select>
            </label>
            <label>游戏灵敏度 <input type="number" data-field="sens" data-id="${p.id}" value="${p.sens}" step="0.01" min="0.01" /></label>
            <label>DPI <input type="number" data-field="dpi" data-id="${p.id}" value="${p.dpi}" step="50" min="100" /></label>
            <label>水平FOV <input type="number" data-field="fov" data-id="${p.id}" value="${p.fov}" step="1" min="60" max="180" /></label>
            <label>系数(度/计数) <input type="number" data-field="multiplier" data-id="${p.id}" value="${p.multiplier}" step="0.001" min="0.0001" /></label>
          </div>
          <div class="profile-meta">${meta}</div>
        </div>
      `;
    })
    .join('');

  list.querySelectorAll<HTMLInputElement>('input[data-field], select[data-field]').forEach((el) => {
    el.addEventListener('input', () => {
      const id = el.dataset.id;
      const field = el.dataset.field as keyof SensitivityProfile;
      if (!id) return;
      const current = appStore.get().profiles.find((p) => p.id === id);
      if (!current) return;
      if (field === 'preset') {
        const preset = el.value as GamePreset;
        updateProfile(id, { preset, multiplier: multiplierForPreset(preset) });
        renderProfileList();
        return;
      }
      if (field === 'name') {
        updateProfile(id, { name: el.value });
      } else {
        const num = Number((el as HTMLInputElement).value);
        if (Number.isFinite(num)) {
          updateProfile(id, { [field]: num } as Partial<SensitivityProfile>);
        }
      }
      const card = list.querySelector<HTMLElement>(`.profile-card[data-id="${id}"]`);
      const nameEl = card?.querySelector<HTMLElement>('.profile-name');
      const updated = appStore.get().profiles.find((p) => p.id === id);
      if (card && updated) {
        if (field === 'name' && nameEl) nameEl.textContent = updated.name;
        const meta = card.querySelector<HTMLElement>('.profile-meta');
        if (meta) {
          meta.textContent = `cm/360 = ${cmPer360(updated).toFixed(2)} · px/计数(1920) = ${pxPerCount(updated, 1920).toFixed(4)}`;
        }
      }
    });
  });

  list.querySelectorAll<HTMLInputElement>('input[data-radio]').forEach((el) => {
    el.addEventListener('change', () => {
      const id = el.dataset.radio;
      if (id) setActiveProfile(id);
      renderProfileList();
    });
  });

  list.querySelectorAll<HTMLButtonElement>('button[data-del]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.del;
      if (id) removeProfile(id);
      renderProfileList();
    });
  });
}
