import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BoxChoice from 'sly/components/molecules/BoxChoice';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];

storiesOf('Molecules|BoxChoice', module)
  .add('default', () => (
    <BoxChoice options={options} value={['third']} onChange={action('value changed')} />
  ))
  .add('multiChoice', () => (
    <BoxChoice multiChoice options={options} value={['third']} onChange={action('value changed')} />
  ));
