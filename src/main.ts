import './styles.css';
import type { Phase } from './types';
import { appStore } from './state/appStore';
import { renderMenu } from './ui/menu';
import { renderResults } from './ui/results';

const app = document.getElementById('app')!;
let lastPhase: Phase | null = null;

appStore.subscribe(() => {
  const phase = appStore.get().phase;
  if (phase === lastPhase) return;
  lastPhase = phase;
  if (phase === 'menu') renderMenu(app);
  else if (phase === 'results') renderResults(app);
  // training 阶段由 startTraining 自行渲染
});

renderMenu(app);
