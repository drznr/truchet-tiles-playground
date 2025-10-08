import { chartConfig } from './config';
import type { LayoutDatum } from './layout';
import { TileOrientation, TileType } from './types';

export function drawTile(type: TileType, d: LayoutDatum): string {
  if (type === TileType.QuarterCircle) {
    return drawQuarterCircleTile(d);
  }

  if (type === TileType.Triangle) {
    return drawTriangleTile(d);
  }

  if (type === TileType.SCurve) {
    return drawSCurveTile(d);
  }

  if (type === TileType.Diagonal) {
    return drawDiagonalTile(d);
  }

  throw new Error(`Unsupported tile type: ${type}`);
}

function drawTriangleTile(d: LayoutDatum): string {
  const { w, h, orientation } = d;

  switch (orientation) {
    case TileOrientation.TopLeft:
      return `M0,${h} L${w},0 L0,0 Z`;
    case TileOrientation.TopRight:
      return `M0,0 L${w},${h} L0,${h} Z`;
    case TileOrientation.BottomLeft:
      return `M0,0 L${w},${h} L${w},0 Z`;
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
        M0,${h - r} A${r},${r} 0 0,1 ${r},${h}
        M${r},0 A${r},${r} 0 0,1 ${w},${h - r}
      `;
    default:
      throw new Error(`Unsupported orientation: ${orientation}`);
  }
}

function drawSCurveTile(d: LayoutDatum): string {
  const { w, h, orientation } = d;

  switch (orientation) {
    case TileOrientation.TopLeft:
      return `M0,0 C0,${h / 2} ${w / 2},${h} ${w},${h}`;
    case TileOrientation.TopRight:
      return `M${w},0 C${w},${h / 2} ${w / 2},${h} 0,${h}`;
    case TileOrientation.BottomLeft:
      return `M0,${h} C0,${h / 2} ${w / 2},0 ${w},0`;
    case TileOrientation.BottomRight:
      return `M${w},${h} C${w},${h / 2} ${w / 2},0 0,0`;
    default:
      throw new Error(`Unsupported orientation: ${orientation}`);
  }
}

function drawDiagonalTile(d: LayoutDatum): string {
  const { w, h, orientation } = d;

  switch (orientation) {
    case TileOrientation.TopLeft:
      return `M0,0 L${w},${h}`;
    case TileOrientation.TopRight:
      return `M${w},0 L0,${h}`;
    case TileOrientation.BottomLeft:
      return `M0,${h} L${w},0`;
    case TileOrientation.BottomRight:
      return `M${w},${h} L0,0`;
    default:
      throw new Error(`Unsupported orientation: ${orientation}`);
  }
}

export function getTileTypeAttrs(type: TileType) {
  switch (type) {
    case TileType.Triangle:
      return {
        fill: chartConfig.colors.fill,
        stroke: chartConfig.colors.stroke,
      };

    case TileType.SCurve:
    case TileType.QuarterCircle:
      return {
        fill: chartConfig.colors.fill,
        stroke: chartConfig.colors.stroke,
        'stroke-width': '2',
        'vector-effect': 'non-scaling-stroke',
      };

    case TileType.Diagonal:
      return {
        stroke: chartConfig.colors.stroke,
        'stroke-width': '1',
        fill: chartConfig.colors.fill,
      };

    default:
      throw new Error(`Unsupported tile type: ${type}`);
  }
}
