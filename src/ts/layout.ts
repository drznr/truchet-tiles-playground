import { chartConfig } from './config';
import { TileLayoutAlgorithm, TileOrientation } from './types';

export type LayoutDatum = ReturnType<typeof layout>[number];

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
      orientation: TileOrientation.TopLeft,
    };
  });
}

export function applyLayoutAlgorithm(
  layoutData: LayoutDatum[],
  w: number,
  h: number
): void {
  const { layoutAlgorithm } = chartConfig;

  const orientations = Object.values(TileOrientation) as TileOrientation[];

  if (layoutAlgorithm === TileLayoutAlgorithm.Random) {
    layoutData.forEach((d) => {
      d.orientation =
        orientations[Math.floor(Math.random() * orientations.length)];
    });
  }

  if (layoutAlgorithm === TileLayoutAlgorithm.Radial) {
    const centerX = w / 2;
    const centerY = h / 2;

    layoutData.forEach((d) => {
      const dx = d.x + d.w / 2 - centerX;
      const dy = d.y + d.h / 2 - centerY;
      const angle = Math.atan2(dy, dx);

      if (angle < -Math.PI / 2) d.orientation = TileOrientation.BottomLeft;
      else if (angle < 0) d.orientation = TileOrientation.TopLeft;
      else if (angle < Math.PI / 2) d.orientation = TileOrientation.TopRight;
      else d.orientation = TileOrientation.BottomRight;
    });
  }

  if (layoutAlgorithm === TileLayoutAlgorithm.Wave) {
    const FREQUENCY = (2 * Math.PI) / (Math.min(w, h) / 2);

    layoutData.forEach((d) => {
      const wave = Math.sin(d.x * FREQUENCY) + Math.cos(d.y * FREQUENCY);
      const index =
        Math.floor(((wave + 2) / 4) * orientations.length) %
        orientations.length;
      d.orientation = orientations[index];
    });
  }
}
