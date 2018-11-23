import React from 'react';
import { storiesOf } from '@storybook/react';
import CommunityChoice from '.';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];

storiesOf('Molecules|CommunityChoice', module).add('default', () => (
  <CommunityChoice options={options} value={['third']} />
));
