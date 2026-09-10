/**
 * 纯 WebAudio 合成音效，无外部资源。
 * 需要用户手势后才能出声（AudioContext 自动恢复）。
 */
class Sfx {
  enabled = true;
  private ctx: AudioContext | null = null;
  private lastShotAt = 0;

  setEnabled(on: boolean): void {
    this.enabled = on;
  }

  private ensure(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  private tone(
    freq: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    when = 0,
  ): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  private noise(dur: number, gain: number, cutoff: number, when = 0): void {
    const ctx = this.ensure();
    if (!ctx) return;
    const t0 = ctx.currentTime + when;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoff, t0);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);
    src.start(t0);
  }

  shot(): void {
    const now = performance.now();
    if (now - this.lastShotAt < 40) return;
    this.lastShotAt = now;
    this.noise(0.08, 0.5, 2400);
    this.tone(220, 0.07, 'square', 0.12);
  }

  hit(): void {
    this.tone(170, 0.12, 'triangle', 0.28);
  }

  headshot(): void {
    this.tone(1180, 0.16, 'square', 0.14);
    this.tone(590, 0.18, 'sine', 0.2, 0.02);
    this.noise(0.05, 0.2, 5000);
  }

  miss(): void {
    this.tone(760, 0.06, 'sine', 0.08);
  }

  /** 敌人开火（低频闷响，压迫感） */
  enemyShot(): void {
    this.noise(0.18, 0.55, 900);
    this.tone(90, 0.22, 'sine', 0.35, 0.02);
    this.tone(220, 0.1, 'square', 0.12, 0.05);
  }

  /** 空仓挂机 */
  empty(): void {
    this.tone(1400, 0.03, 'square', 0.05);
  }

  /** 换弹开始（退匣+装匣两下） */
  reloadStart(): void {
    this.tone(520, 0.04, 'square', 0.12);
    this.tone(700, 0.04, 'square', 0.12, 0.14);
  }

  /** 换弹完成（拉栓上膛） */
  reloadDone(): void {
    this.noise(0.05, 0.3, 3000, 0.02);
    this.tone(340, 0.08, 'square', 0.14);
  }

  /** 击杀确认（连杀越高音调越高） */
  killConfirm(streak: number): void {
    const step = Math.min(4, Math.max(0, streak - 1));
    this.tone(880 + step * 120, 0.09, 'sine', 0.16);
    this.tone(1320 + step * 180, 0.12, 'sine', 0.12, 0.06);
    if (streak >= 3) {
      this.tone(1760 + step * 200, 0.16, 'triangle', 0.1, 0.14);
    }
  }

  ui(): void {
    this.tone(880, 0.05, 'sine', 0.1);
  }

  error(): void {
    this.tone(240, 0.12, 'sawtooth', 0.1);
  }
}

export const sfx = new Sfx();
