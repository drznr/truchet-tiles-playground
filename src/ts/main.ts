import { initControls } from './controls';
import { update } from './update';
import { debounce } from './utils';

const container = document.querySelector('.chart-container')!;

let rafId: number | null = null;

const debouncedRender = debounce(render, 25);

window.addEventListener('load', () => {
  const { width, height } = container.getBoundingClientRect();
  render(width, height);
  initControls();
});

const resizeObserver = new ResizeObserver((entries) => {
  const [entry] = entries;
  const { width, height } = entry.contentRect;
  debouncedRender(width, height);
});

resizeObserver.observe(container);

export function render(
  width = container.clientWidth,
  height = container.clientHeight
) {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => update(width, height));
}
