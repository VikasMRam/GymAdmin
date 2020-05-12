import React from 'react';
import { storiesOf } from '@storybook/react';

import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';

const items = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/assisted-living',
    label: 'Assisted living',
  },
  {
    path: '/assisted-living/california',
    label: 'california',
  },
  {
    path: '/assisted-living/california/san-fransisco',
    label: 'san fransisco',
  },
  {
    path: '/assisted-living/california/san-fransisco/rhoda-goldman-plaza',
    label: 'Rhoda Goldman Plaza',
  },
];

storiesOf('Molecules|BreadCrumb', module)
  .add('default', () => <BreadCrumb items={items} />)
  .add('only one item', () => <BreadCrumb items={items.slice(0, 1)} />);
