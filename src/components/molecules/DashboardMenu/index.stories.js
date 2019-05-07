import React from 'react';
import { storiesOf } from '@storybook/react';

import DashboardMenu from 'sly/components/molecules/DashboardMenu';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', href: '/link1', active: true, role: 2,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler', href: '/link2', role: 2,
  },
];

storiesOf('Molecules|DashboardMenu', module)
  .add('default', () => (
    <DashboardMenu menuItems={menuItems} />
  ));
