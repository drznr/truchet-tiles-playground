import { chartConfig, type ChartConfig } from '../config';
import { TileLayoutAlgorithm, TileType } from '../types';

export type ControlConfig = {
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
    key: 'tileType',
    type: 'radio',
    options: [
      {
        label: 'Triangle',
        value: TileType.Triangle,
        checked: chartConfig.tileType === TileType.Triangle,
      },
      {
        label: 'Quadratic Circles',
        value: TileType.QuarterCircle,
        checked: chartConfig.tileType === TileType.QuarterCircle,
      },
      {
        label: 'S-Curve',
        value: TileType.SCurve,
        checked: chartConfig.tileType === TileType.SCurve,
      },
      {
        label: 'Diagonal',
        value: TileType.Diagonal,
        checked: chartConfig.tileType === TileType.Diagonal,
      },
    ],
  },
  {
    key: 'layoutAlgorithm',
    type: 'radio',
    options: [
      {
        label: 'None',
        value: TileLayoutAlgorithm.None,
        checked: chartConfig.layoutAlgorithm === TileLayoutAlgorithm.None,
      },
      {
        label: 'Random',
        value: TileLayoutAlgorithm.Random,
        checked: chartConfig.layoutAlgorithm === TileLayoutAlgorithm.Random,
      },
      {
        label: 'Quad-rotation',
        value: TileLayoutAlgorithm.QuadRotation,
        checked:
          chartConfig.layoutAlgorithm === TileLayoutAlgorithm.QuadRotation,
      },
      {
        label: 'Wave',
        value: TileLayoutAlgorithm.Wave,
        checked: chartConfig.layoutAlgorithm === TileLayoutAlgorithm.Wave,
      },
      {
        label: 'Quad-reflection',
        value: TileLayoutAlgorithm.QuadReflection,
        checked:
          chartConfig.layoutAlgorithm === TileLayoutAlgorithm.QuadReflection,
      },
    ],
  },
  {
    key: 'tileSize',
    type: 'radio',
    options: [
      { label: 'Small', value: 20, checked: chartConfig.tileSize === 20 },
      { label: 'Medium', value: 40, checked: chartConfig.tileSize === 40 },
      { label: 'Big', value: 80, checked: chartConfig.tileSize === 80 },
    ],
  },
  {
    type: 'color',
    key: 'colors',
    options: [
      { label: 'Fill', name: 'fill', value: chartConfig.colors.fill },
      { label: 'Stroke', name: 'stroke', value: chartConfig.colors.stroke },
      {
        label: 'Background',
        name: 'background',
        value: chartConfig.colors.background,
      },
    ],
  },
];
