import type { LayoutDatum } from './layout';
import { TileOrientation, TileType } from './types';

export function drawTile(type: TileType, d: LayoutDatum): string {
  if (type === TileType.QuarterCircle) {
    return drawQuarterCircleTile(d);
  }

  if (type === TileType.Triangle) {
    return drawTriangleTile(d);
  }

  throw new Error(`Unsupported tile type: ${type}`);
}

function drawTriangleTile(d: LayoutDatum): string {
  const { w, h, orientation } = d;

  switch (orientation) {
    case TileOrientation.TopLeft:
      return `M0,0 L${w},${h} L0,${h} Z`;
    case TileOrientation.TopRight:
      return `M${w},0 L0,${h} L${w},${h} Z`;
    case TileOrientation.BottomLeft:
      return `M0,${h} L${w},0 L0,0 Z`;
    case TileOrientation.BottomRight:
      return `M${w},${h} L${w},0 L0,${h} Z`;
    default:
      throw new Error(`Unsupported orientation: ${orientation}`);
  }
}

function drawQuarterCircleTile(d: LayoutDatum): string {
  const { w, h, orientation } = d;
  const r = Math.min(w, h) / 2;

  switch (orientation) {
    case TileOrientation.TopLeft:
      return `
            M${r},0 A${r},${r} 0 0,1 ${w},${r}
            M0,${r} A${r},${r} 0 0,1 ${r},${h}
        `;
    case TileOrientation.TopRight:
      return `
            M${w - r},0 A${r},${r} 0 0,0 0,${r}
            M${w},${r} A${r},${r} 0 0,0 ${w - r},${h}
        `;
    case TileOrientation.BottomLeft:
      return `
            M0,${h - r} A${r},${r} 0 0,0 ${r},0
            M${r},${h} A${r},${r} 0 0,0 ${w},${h - r}
        `;
    case TileOrientation.BottomRight:
      return `
            M${w - r},${h} A${r},${r} 0 0,1 ${w},${h - r}
            M${w},${r} A${r},${r} 0 0,1 ${w - r},0
        `;
    default:
      throw new Error(`Unsupported orientation: ${orientation}`);
  }
}

export const TILES_ATTRS: Record<TileType, { [key: string]: string }> = {
  [TileType.QuarterCircle]: {
    fill: 'none',
    stroke: '#333',
    'stroke-width': '2',
    'vector-effect': 'non-scaling-stroke',
  },
  [TileType.Triangle]: {
    fill: '#333',
    stroke: 'none',
  },
} as const;
