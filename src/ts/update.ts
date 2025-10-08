import * as d3 from 'd3';
import { layout } from './layout';

export function update(w: number, h: number) {
  const layoutData = layout(w, h);

  const svg = d3
    .select('body')
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .attr('width', w)
    .attr('height', h);

  const tiles = svg
    .selectAll('g.tile')
    .data(layoutData)
    .join('g')
    .attr('class', 'tile')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  tiles
    .selectAll('path')
    .data((d) => [d])
    .join('path')
    .attr('d', (d) => {
      const { w, h } = d;
      const r = Math.min(w, h) / 2;

      return `
        M${r},0 A${r},${r} 0 0,1 ${w},${r}
        M0,${r} A${r},${r} 0 0,1 ${r},${h}
      `;
    })
    .attr('fill', 'none')
    .attr('stroke', '#333')
    .attr('stroke-width', 2)
    .attr('vector-effect', 'non-scaling-stroke');
}
