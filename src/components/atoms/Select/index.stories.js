import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from 'sly/components/atoms/Select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const groupedOptions = [
  {
    label: 'Firefox',
    options: [
      { label: '2.0 or higher', value: '2.0 or higher' },
      { label: '1.5.x', value: '1.5.x' },
    ],
  },
  {
    label: 'Microsoft Internet Explorer',
    options: [
      { label: '7.0 or higher', value: '7.0 or higher' },
      { label: '6.x', value: '6.x' },
      { label: '5.x', value: '5.x' },
    ],
  },
];

storiesOf('Atoms|Select', module)
  .add('default', () => <Select options={options} />)
  .add('with groups', () => <Select options={groupedOptions} />);
