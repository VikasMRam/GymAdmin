import React from 'react';
import { storiesOf } from '@storybook/react';

import DashboardMenu from 'sly/web/components/molecules/DashboardMenu';

storiesOf('Molecules|DashboardMenu', module)
  .add('default', () => (
    <DashboardMenu />
  ));
