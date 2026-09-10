export interface ChartOptions {
  color: string;
  /** 数值单位后缀 */
  unit?: string;
}

export function renderLineChart(canvas: HTMLCanvasElement, data: number[], opts: ChartOptions): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = (h / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  if (data.length < 2) {
    ctx.fillStyle = '#8b949e';
    ctx.font = '12px sans-serif';
    ctx.fillText('至少需要 2 局记录', w / 2 - 60, h / 2);
    return;
  }

  const pad = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = Math.max(1, max - min);
  const px = (i: number): number => pad + (i / (data.length - 1)) * (w - pad * 2);
  const py = (v: number): number => h - pad - ((v - min) / span) * (h - pad * 2);

  ctx.strokeStyle = opts.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  data.forEach((v, i) => {
    if (i === 0) ctx.moveTo(px(i), py(v));
    else ctx.lineTo(px(i), py(v));
  });
  ctx.stroke();

  ctx.fillStyle = opts.color;
  data.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(px(i), py(v), 2.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const last = data[data.length - 1];
  ctx.fillStyle = '#e6e9ec';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(`${last.toFixed(1)}${opts.unit ?? ''}`, pad, 14);
  ctx.fillStyle = '#8b949e';
  ctx.font = '10px sans-serif';
  ctx.fillText('第1局', pad, h - 6);
  ctx.fillText(`第${data.length}局`, w - pad - 38, h - 6);
}
