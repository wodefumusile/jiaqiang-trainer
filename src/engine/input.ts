export interface InputCallbacks {
  onMove: (dx: number, dy: number) => void;
  onTriggerDown: () => void;
  onTriggerUp: () => void;
  onHotkey: (code: string) => void;
  onKeyUp: (code: string) => void;
  onSensAdjust: (deltaY: number) => void;
}

export class InputManager {
  private canvas: HTMLCanvasElement;
  private cb: InputCallbacks;
  private onLockChange: (locked: boolean) => void = () => {};

  private moveHandler = (e: MouseEvent): void => {
    if (document.pointerLockElement === this.canvas) {
      this.cb.onMove(e.movementX, e.movementY);
    }
  };

  private downHandler = (e: MouseEvent): void => {
    if (document.pointerLockElement === this.canvas && e.button === 0) {
      e.preventDefault();
      this.cb.onTriggerDown();
    }
  };

  private upHandler = (e: MouseEvent): void => {
    if (e.button === 0) this.cb.onTriggerUp();
  };

  private keyHandler = (e: KeyboardEvent): void => {
    if (e.code === 'Tab' || e.code === 'Space' || /^F([1-6])$/.test(e.code)) e.preventDefault();
    this.cb.onHotkey(e.code);
  };

  private keyUpHandler = (e: KeyboardEvent): void => {
    this.cb.onKeyUp(e.code);
  };

  private wheelHandler = (e: WheelEvent): void => {
    if (e.altKey) {
      e.preventDefault();
      this.cb.onSensAdjust(e.deltaY);
    }
  };

  private lockChangeHandler = (): void => {
    const locked = document.pointerLockElement === this.canvas;
    if (!locked) this.cb.onTriggerUp();
    this.onLockChange(locked);
  };

  constructor(canvas: HTMLCanvasElement, cb: InputCallbacks) {
    this.canvas = canvas;
    this.cb = cb;
  }

  setLockChangeHandler(fn: (locked: boolean) => void): void {
    this.onLockChange = fn;
  }

  attach(): void {
    document.addEventListener('mousemove', this.moveHandler);
    document.addEventListener('mousedown', this.downHandler);
    document.addEventListener('mouseup', this.upHandler);
    document.addEventListener('keydown', this.keyHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    document.addEventListener('wheel', this.wheelHandler, { passive: false });
    document.addEventListener('pointerlockchange', this.lockChangeHandler);
  }

  detach(): void {
    document.removeEventListener('mousemove', this.moveHandler);
    document.removeEventListener('mousedown', this.downHandler);
    document.removeEventListener('mouseup', this.upHandler);
    document.removeEventListener('keydown', this.keyHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('wheel', this.wheelHandler);
    document.removeEventListener('pointerlockchange', this.lockChangeHandler);
  }

  requestLock(): void {
    if (document.pointerLockElement === this.canvas) return;
    const p = this.canvas.requestPointerLock();
    if (p && typeof p.catch === 'function') {
      p.catch(() => undefined);
    }
  }

  exitLock(): void {
    if (document.pointerLockElement === this.canvas) {
      void document.exitPointerLock();
    }
  }
}
