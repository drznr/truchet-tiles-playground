import { TileLayoutAlgorithm, TileType } from './types';

type ChartConfig = {
  tileSize: number;
  tileType: TileType;
  layoutAlgorithm: TileLayoutAlgorithm;
};

const DEFAULT_CONFIG = {
  tileSize: 40,
  tileType: TileType.Triangle,
  layoutAlgorithm: TileLayoutAlgorithm.None,
} as const satisfies ChartConfig;

export const chartConfig: ChartConfig = DEFAULT_CONFIG;

export function setChartConfig<K extends keyof ChartConfig>(
  key: K,
  value: ChartConfig[K]
) {
  chartConfig[key] = value;
}
