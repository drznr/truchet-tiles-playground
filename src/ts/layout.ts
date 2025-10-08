import { chartConfig } from './config';

export function layout(w: number, h: number) {
  const { tileSize } = chartConfig;
  const cols = Math.floor(w / tileSize);
  const rows = Math.floor(h / tileSize);

  const cellWidth = w / cols;
  const cellHeight = h / rows;

  return Array.from({ length: rows * cols }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    return {
      w: cellWidth,
      h: cellHeight,
      x: col * cellWidth,
      y: row * cellHeight,
    };
  });
}
