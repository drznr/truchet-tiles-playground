import { update } from './update';

const container = document.querySelector('.chart-container');
if (!container) throw new Error('Container not found');

let rafId: number | null = null;

window.addEventListener('load', render);
window.addEventListener('resize', render);

function render() {
  if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(() => {
    const { width, height } = container!.getBoundingClientRect();
    update(width, height);
  });
}
