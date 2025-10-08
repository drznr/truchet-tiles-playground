import { update } from './update';

function render() {
  const { width, height } = document.body.getBoundingClientRect();

  update(width, height);
}

render();

const observer = new ResizeObserver(render);
observer.observe(document.body);
