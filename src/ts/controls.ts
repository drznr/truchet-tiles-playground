import { setChartConfig } from './config';
import { render } from './main';
import type { TileLayoutAlgorithm, TileType } from './types';

export function initControls() {
  const elTileTypeInput = document.querySelector(
    '.tile-type-selector'
  ) as HTMLInputElement;
  const elLayoutAlgoInput = document.querySelector(
    '.tile-type-selector'
  ) as HTMLInputElement;

  elTileTypeInput.addEventListener('change', (event) => {
    const { value } = event.target as HTMLInputElement;

    setChartConfig('tileType', value as TileType);
    render();
  });

  elLayoutAlgoInput.addEventListener('change', (event) => {
    const { value } = event.target as HTMLInputElement;

    setChartConfig('layoutAlgorithm', value as TileLayoutAlgorithm);
    render();
  });
}
