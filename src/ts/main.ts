import { update } from './update';
import { debounce } from './utils';

const container = document.querySelector('.chart-container')!;

let rafId: number | null = null;

const debouncedRender = debounce(render, 25);

window.addEventListener('load', () => {
  const { width, height } = container.getBoundingClientRect();
  render(width, height);
});

const resizeObserver = new ResizeObserver((entries) => {
  const [entry] = entries;
  const { width, height } = entry.contentRect;
  debouncedRender(width, height);
});

resizeObserver.observe(container);

function render(width: number, height: number) {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => update(width, height));
}
