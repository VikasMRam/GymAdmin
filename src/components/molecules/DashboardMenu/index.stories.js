import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardMenu from '.';

const menuItems = [
  {
    label: 'Favorites', icon: 'favourite-light', iconSize: 'regular', palette: 'slate', variation: 'base', onClick: action('clicked'), active: true,
  },
  {
    label: 'Profile', icon: 'user', iconSize: 'regular', palette: 'slate', variation: 'filler', onClick: action('clicked'),
  },
];

storiesOf('Molecules|DashboardMenu', module)
  .add('default', () => (
    <DashboardMenu menuItems={menuItems} />
  ));
