import type { SessionSummary } from '../types';
import { modeById } from '../config/modes';
import { appStore, gotoPhase } from '../state/appStore';
import { startTraining } from './training';
import { renderLineChart } from './charts';

function fmtPercent(v: number): string {
  return `${(v * 100).toFixed(1)}%`;
}

function fmtTime(ms: number): string {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function statCards(last: SessionSummary): [string, string][] {
  const me = last.modeExtra;
  const base: [string, string][] = [
    ['命中率', fmtPercent(last.accuracy)],
    ['一次定位率', fmtPercent(last.firstShotRate)],
    ['平均反应', `${last.avgReactionMs.toFixed(0)} ms`],
    ['平均补枪', `${last.avgCorrectionsPerKill.toFixed(2)} 发`],
    ['过冲 / 欠冲', `${last.overshoots} / ${last.undershoots}`],
    ['最大连杀', String(last.maxStreak)],
    ['击杀 / 遭遇', `${last.kills} / ${last.encounters}`],
    ['射击 / 命中', `${last.shots} / ${last.hits}`],
    ['空枪（打墙）', String(last.wastedShots ?? 0)],
    ['阵亡', String(last.deaths)],
  ];
  if (last.modeId === 'flick') {
    return [
      ['命中率', fmtPercent(last.accuracy)],
      ['平均拉枪时间', `${me?.flickTimeMs.toFixed(0) ?? 0} ms`],
      ['平均拉枪距离', `${me?.flickDistPx.toFixed(0) ?? 0} px`],
      ['最大连杀', String(last.maxStreak)],
      ['击杀 / 遭遇', `${last.kills} / ${last.encounters}`],
      ['射击 / 命中', `${last.shots} / ${last.hits}`],
      ['平均反应', `${last.avgReactionMs.toFixed(0)} ms`],
      ['一次定位率', fmtPercent(last.firstShotRate)],
      ['阵亡', String(last.deaths)],
    ];
  }
  if (last.modeId === 'tracking') {
    return [
      ['跟枪占比', `${me?.trackPct.toFixed(1) ?? 0}%`],
      ['命中率', fmtPercent(last.accuracy)],
      ['平均反应', `${last.avgReactionMs.toFixed(0)} ms`],
      ['最大连杀', String(last.maxStreak)],
      ['一次定位率', fmtPercent(last.firstShotRate)],
      ['过冲 / 欠冲', `${last.overshoots} / ${last.undershoots}`],
      ['击杀 / 遭遇', `${last.kills} / ${last.encounters}`],
      ['射击 / 命中', `${last.shots} / ${last.hits}`],
      ['阵亡', String(last.deaths)],
    ];
  }
  if (last.modeId === 'preaim') {
    return [
      ['平均预瞄偏差', `${me?.preaimErrPx.toFixed(0) ?? 0} px`],
      ['平均反应', `${last.avgReactionMs.toFixed(0)} ms`],
      ['一次定位率', fmtPercent(last.firstShotRate)],
      ['最大连杀', String(last.maxStreak)],
      ['命中率', fmtPercent(last.accuracy)],
      ['击杀 / 遭遇', `${last.kills} / ${last.encounters}`],
      ['射击 / 命中', `${last.shots} / ${last.hits}`],
      ['平均补枪', `${last.avgCorrectionsPerKill.toFixed(2)} 发`],
      ['阵亡', String(last.deaths)],
    ];
  }
  if (last.modeId === 'holding') {
    return [
      ['平均反应', `${last.avgReactionMs.toFixed(0)} ms`],
      ['平均位移', `${me?.displacementPx.toFixed(0) ?? 0} px`],
      ['一次定位率', fmtPercent(last.firstShotRate)],
      ['最大连杀', String(last.maxStreak)],
      ['命中率', fmtPercent(last.accuracy)],
      ['过冲 / 欠冲', `${last.overshoots} / ${last.undershoots}`],
      ['击杀 / 遭遇', `${last.kills} / ${last.encounters}`],
      ['射击 / 命中', `${last.shots} / ${last.hits}`],
      ['阵亡', String(last.deaths)],
    ];
  }
  return base;
}

export function renderResults(app: HTMLElement): void {
  const s = appStore.get();
  const last = s.lastSession;
  if (!last) {
    gotoPhase('menu');
    return;
  }

  const modeName = modeById(last.modeId).name;
  const recent = s.sessions.slice(0, 20);
  const sameMode = recent.filter((r) => r.modeId === last.modeId).slice(0, 20);
  const accData = sameMode.map((r) => r.accuracy * 100);
  const fsrData = sameMode.map((r) => r.firstShotRate * 100);
  const reactData = sameMode.map((r) => r.avgReactionMs);

  app.innerHTML = `
    <div class="results">
      <header class="menu-head">
        <h1>训练结果</h1>
        <p class="sub">${modeName} · ${last.sceneName} · ${last.difficultyName} · ${last.profileName} · 时长 ${fmtTime(last.durationMs)}</p>
      </header>

      <div class="stat-grid">
        ${statCards(last)
          .map(
            ([k, v]) => `
            <div class="stat"><span>${k}</span><strong>${v}</strong></div>`,
          )
          .join('')}
      </div>

      <section class="panel">
        <div class="panel-head">
          <h2>进步曲线（${modeName} · 最近 ${sameMode.length} 局）</h2>
          <span class="hint">坚持训练，曲线会告诉你进步</span>
        </div>
        <div class="chart-grid">
          <div class="chart-card">
            <div class="chart-title">命中率 %</div>
            <canvas id="chart-acc" width="300" height="120"></canvas>
          </div>
          <div class="chart-card">
            <div class="chart-title">一次定位率 %</div>
            <canvas id="chart-fsr" width="300" height="120"></canvas>
          </div>
          <div class="chart-card">
            <div class="chart-title">平均反应 ms（越低越好）</div>
            <canvas id="chart-react" width="300" height="120"></canvas>
          </div>
        </div>
      </section>

      <div class="row results-actions">
        <button id="again-btn" class="btn-primary btn-lg">再来一局</button>
        <button id="back-btn" class="btn-ghost btn-lg">返回菜单</button>
      </div>

      <section class="panel">
        <h2>最近训练</h2>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>时间</th><th>模式</th><th>场景</th><th>难度</th><th>档案</th><th>命中率</th><th>一次定位</th><th>反应(ms)</th><th>击杀</th>
              </tr>
            </thead>
            <tbody>
              ${recent
                .slice(0, 10)
                .map(
                  (r) => `
                  <tr>
                    <td>${new Date(r.startedAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                    <td>${modeById(r.modeId).name}</td>
                    <td>${r.sceneName}</td>
                    <td>${r.difficultyName}</td>
                    <td>${r.profileName}</td>
                    <td>${fmtPercent(r.accuracy)}</td>
                    <td>${fmtPercent(r.firstShotRate)}</td>
                    <td>${r.avgReactionMs.toFixed(0)}</td>
                    <td>${r.kills}</td>
                  </tr>`,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;

  const c1 = app.querySelector<HTMLCanvasElement>('#chart-acc');
  const c2 = app.querySelector<HTMLCanvasElement>('#chart-fsr');
  const c3 = app.querySelector<HTMLCanvasElement>('#chart-react');
  if (c1) renderLineChart(c1, accData, { color: '#7cfc9b', unit: '%' });
  if (c2) renderLineChart(c2, fsrData, { color: '#5ad1ff', unit: '%' });
  if (c3) renderLineChart(c3, reactData, { color: '#ffd166', unit: 'ms' });

  app.querySelector<HTMLButtonElement>('#again-btn')?.addEventListener('click', () => {
    gotoPhase('training');
    startTraining(app);
  });
  app.querySelector<HTMLButtonElement>('#back-btn')?.addEventListener('click', () => {
    gotoPhase('menu');
  });
}
