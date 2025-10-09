import { TileLayoutAlgorithm, TileType } from './types';

export type ChartConfig = {
  tileSize: 20 | 40 | 80;
  tileType: TileType;
  layoutAlgorithm: TileLayoutAlgorithm;
  colors: {
    fill: string;
    stroke: string;
    background: string;
  };
};

const DEFAULT_CONFIG = {
  tileSize: 40,
  tileType: TileType.Triangle,
  layoutAlgorithm: TileLayoutAlgorithm.None,
  colors: { fill: '#333333', stroke: '#333333', background: '#ffffff' },
} as const satisfies ChartConfig;

export const chartConfig: ChartConfig = DEFAULT_CONFIG;

export function setChartConfig<K extends keyof ChartConfig>(
  key: K,
  updater: ChartConfig[K] | ((prev: ChartConfig[K]) => ChartConfig[K])
) {
  const value =
    typeof updater === 'function'
      ? (updater as (prev: ChartConfig[K]) => ChartConfig[K])(chartConfig[key])
      : updater;

  chartConfig[key] = value;
}
