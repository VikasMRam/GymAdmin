import React from 'react';
import { storiesOf } from '@storybook/react';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];

storiesOf('Molecules|MultipleChoice', module).add('default', () => (
  <MultipleChoice options={options} value={['third']} />
));
