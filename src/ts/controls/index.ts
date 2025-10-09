import { select } from 'd3';
import { setChartConfig, type ChartConfig } from '../config';
import { render } from '../main';
import { controlsData, type ControlConfig } from './data';

const header = select('.main-header');

export function initControls() {
  const fieldsets = header
    .selectAll('fieldset')
    .data(controlsData)
    .join('fieldset')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('gap', '12px');

  fieldsets.each((_, i, nodes) => {
    const fieldset = nodes[i] as HTMLFieldSetElement;
    fieldset.after('|');
  });

  const labels = fieldsets
    .selectAll('label')
    .data((d) => d.options.map((opt) => ({ ...opt, parent: d })))
    .join('label')
    .style('cursor', 'pointer')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('gap', '4px');

  labels.each((d, i, nodes) => {
    const label = select(nodes[i]);
    const { parent } = d;

    label
      .append('input')
      .style('block-size', parent.key === 'colors' ? '20px' : 'auto')
      .attr('type', parent.type)
      .attr('name', parent.key)
      .attr('value', d.value)
      .property('checked', d.checked)
      .on('change', (ev) => handleChange(parent.key, d, ev.target.value));

    label.append('span').text(d.label);
  });

  header
    .append('button')
    .style('line-height', '1')
    .style('padding', '1px 8px')
    .style('background-color', '#53DD6C')
    .text('Export')
    .on('click', handleExport);
}

function handleChange(
  key: ControlConfig['key'],
  option: ControlConfig['options'][number],
  inputValue: string
) {
  if (key === 'colors') {
    setChartConfig(key, (prevColors) => ({
      ...prevColors,
      [option.name!]: inputValue,
    }));
  } else setChartConfig(key, option.value as ChartConfig[typeof key]);

  render();
}

function handleExport() {
  const svg = select('svg').node() as SVGSVGElement;

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);

  const blob = new Blob([svgString], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'tiles.svg';
  a.click();
  URL.revokeObjectURL(url);
}
