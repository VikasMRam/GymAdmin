import React from 'react';
import { storiesOf } from '@storybook/react';

import Slider from 'sly/web/components/molecules/Slider';

const moneyValue = val => `$${val}K`;

storiesOf('Molecules|Slider', module)
  .add('default', () => <Slider />)
  .add('disabled', () => (
    <Slider disabled min={0} max={11} step={0.5} defaultValue={5.5} />
  ))
  .add('money value', () => (
    <Slider
      responsive
      min={0}
      max={11}
      step={0.5}
      defaultValue={5.5}
      valueWidth="regular"
      valueParse={moneyValue}
    />
  ));
