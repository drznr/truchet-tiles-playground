import { TileLayoutAlgorithm, TileType } from './types';

type ChartConfig = {
  tileSize: number;
  tileType: TileType;
  layoutAlgorithm: TileLayoutAlgorithm;
};

export const chartConfig: ChartConfig = {
  tileSize: 40,
  tileType: TileType.Triangle,
  layoutAlgorithm: TileLayoutAlgorithm.Radial,
};

export function setChartConfig<K extends keyof ChartConfig>(
  key: K,
  value: ChartConfig[K]
) {
  chartConfig[key] = value;
}
