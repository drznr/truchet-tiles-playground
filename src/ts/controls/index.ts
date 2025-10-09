import { select } from 'd3';
import { setChartConfig, chartConfig, type ChartConfig } from '../config';
import { render } from '../main';
import { controlsData, type ControlConfig } from './data';

const header = select('.main-header');

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
  } else setChartConfig(key, option.value as ChartConfig[typeof key]);

  render();
}
