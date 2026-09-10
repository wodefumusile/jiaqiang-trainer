import './styles.css';
import type { Phase } from './types';
import { appStore } from './state/appStore';
import { renderMenu } from './ui/menu';
import { renderResults } from './ui/results';

const app = document.getElementById('app')!;
let lastPhase: Phase | null = null;

// 3D 垂直切片入口（branch: codex/3d-rebuild）：?view=3d 时挂载 Three.js 场景
if (new URLSearchParams(window.location.search).get('view') === '3d') {
  void import('./three/slice').then(({ mountThreeSlice }) => {
    const dispose = mountThreeSlice(app, {
      onExit: () => {
        dispose();
        window.location.search = '';
      },
    });
  });
} else {
  bootApp();
}

function bootApp(): void {
appStore.subscribe(() => {
  const phase = appStore.get().phase;
  if (phase === lastPhase) return;
  lastPhase = phase;
  if (phase === 'menu') renderMenu(app);
  else if (phase === 'results') renderResults(app);
  // training 阶段由 startTraining 自行渲染
});

renderMenu(app);
}
