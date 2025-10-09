import * as d3 from 'd3';
import { applyLayoutAlgorithm, layout } from './layout';
import { drawTile, getTileTypeAttrs } from './tiles';
import { chartConfig } from './config';
import { TileOrientation } from './types';

export function update(width: number, height: number) {
  const { tileType } = chartConfig;
  const w = Math.floor(width);
  const h = Math.floor(height);

  const layoutData = layout(w, h);

  applyLayoutAlgorithm(layoutData, w, h);

  const svg = d3
    .select('.chart-container')
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .attr('width', '100%')
    .attr('height', '100%')
    .style('display', 'block')
    .style('background-color', chartConfig.colors.background);

  const tiles = svg
    .selectAll('g')
    .data(layoutData)
    .join('g')
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`)
    .style('cursor', 'pointer');

  tiles
    .append('rect')
    .attr('width', (d) => d.w)
    .attr('height', (d) => d.h)
    .attr('fill', 'transparent');

  tiles
    .selectAll('path')
    .data((d) => [d])
    .join('path')
    .attr('d', (d) => drawTile(tileType, d));

  // Custom attributes per tile type
  const TileTypeAttrs = Object.entries(getTileTypeAttrs(tileType));
  TileTypeAttrs.forEach(([attr, value]) => {
    tiles.selectAll('path').attr(attr, value);
  });

  tiles.on('click', function (_, d) {
    const orientations = Object.values(TileOrientation);
    const currentIndex = orientations.indexOf(d.orientation);
    const nextIndex = (currentIndex + 1) % orientations.length;
    d.orientation = orientations[nextIndex];

    d3.select(this).select('path').attr('d', drawTile(tileType, d));
  });
}
