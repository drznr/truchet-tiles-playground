import { select } from 'd3';
import { setChartConfig, chartConfig } from './config';
import { TileLayoutAlgorithm, TileType } from './types';
import { render } from './main';

const header = select('.main-header');

type Config = typeof chartConfig;
type ControlConfig = {
  class: string;
  key: keyof Config;
  type: 'radio' | 'color';
  options: {
    label: string;
    value: TileType | TileLayoutAlgorithm | number | string;
    checked?: boolean;
    name?: string;
  }[];
};

const controlsData: ControlConfig[] = [
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

export function initControls() {
  const fieldsets = header
    .selectAll('fieldset')
    .data(controlsData)
    .join('fieldset')
    .attr('class', (d) => d.class);

  const labels = fieldsets
    .selectAll('label')
    .data((d) => d.options.map((opt) => ({ ...opt, parent: d })))
    .join('label')
    .style('cursor', 'pointer');

  labels.each((d, i, nodes) => {
    const label = select(nodes[i]);
    const { parent } = d;

    label
      .append('input')
      .attr('type', parent.type)
      .attr('name', parent.key)
      .attr('value', d.value)
      .property('checked', d.checked)
      .on('change', (ev) => handleChange(parent.key, d, ev.target.value));

    label.append('span').text(d.label);
  });
}

function handleChange(
  key: ControlConfig['key'],
  option: ControlConfig['options'][number],
  inputValue: string
) {
  if (key === 'colors') {
    setChartConfig(key, {
      ...chartConfig.colors,
      [option.name!]: inputValue,
    });
  } else setChartConfig(key, option.value as Config[typeof key]);

  render();
}
