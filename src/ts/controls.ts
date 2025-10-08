import { setChartConfig } from './config';
import { render } from './main';
import type { TileType } from './types';

export function initControls() {
  const elTileTypeInput = document.querySelector(
    '.tile-type-selector'
  ) as HTMLInputElement;

  elTileTypeInput.value = 'DIAGONAL';

  elTileTypeInput.addEventListener('change', (event) => {
    const { value } = event.target as HTMLInputElement;

    setChartConfig('tileType', value as TileType);
    render();
  });
}
