let host: HTMLDivElement | null = null;

export function showToast(msg: string): void {
  if (!host) {
    host = document.createElement('div');
    host.id = 'toast-host';
    document.body.appendChild(host);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  host.appendChild(el);
  window.setTimeout(() => {
    el.classList.add('toast-out');
    window.setTimeout(() => el.remove(), 260);
  }, 1800);
}
