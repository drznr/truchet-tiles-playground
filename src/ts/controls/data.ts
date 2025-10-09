import type { ChartConfig } from '../config';
import { TileLayoutAlgorithm, TileType } from '../types';

export type ControlConfig = {
  class: string;
  key: keyof ChartConfig;
  type: 'radio' | 'color';
  options: {
    label: string;
    value: TileType | TileLayoutAlgorithm | number | string;
    checked?: boolean;
    name?: string;
  }[];
};

export const controlsData: ControlConfig[] = [
  {
    class: 'tile-type-selector',
    key: 'tileType',
    type: 'radio',
    options: [
      {
        label: 'Triangle',
        value: TileType.Triangle,
        checked: true,
      },
      {
        label: 'Quadratic Circles',
        value: TileType.QuarterCircle,
      },
      {
        label: 'S-Curve',
        value: TileType.SCurve,
      },
      {
        label: 'Diagonal',
        value: TileType.Diagonal,
      },
    ],
  },
  {
    class: 'layout-algorythm-selector',
    key: 'layoutAlgorithm',
    type: 'radio',
    options: [
      {
        label: 'None',
        value: TileLayoutAlgorithm.None,
        checked: true,
      },
      {
        label: 'Random',
        value: TileLayoutAlgorithm.Random,
      },
      {
        label: 'Quad-rotation',
        value: TileLayoutAlgorithm.QuadRotation,
      },
      {
        label: 'Wave',
        value: TileLayoutAlgorithm.Wave,
      },
      {
        label: 'Quad-reflection',
        value: TileLayoutAlgorithm.QuadReflection,
      },
    ],
  },
  {
    class: 'tile-size-selector',
    key: 'tileSize',
    type: 'radio',
    options: [
      {
        label: 'Small',
        value: 20,
      },
      {
        label: 'Medium',
        value: 40,
        checked: true,
      },
      { label: 'Big', value: 80 },
    ],
  },
  {
    class: 'colors-selector',
    type: 'color',
    key: 'colors',
    options: [
      {
        label: 'Fill',
        name: 'fill',
        value: '#333333',
      },
      {
        label: 'Stroke',
        name: 'stroke',
        value: '#333333',
      },
      {
        label: 'Background',
        name: 'background',
        value: '#ffffff',
      },
    ],
  },
];
