import React from 'react';
import { storiesOf } from '@storybook/react';

import DashboardFamilySummary from 'sly/web/components/molecules/DashboardFamilySummary';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';

storiesOf('Molecules|DashboardFamilySummary', module)
  .add('default', () => (
    <DashboardFamilySummary client={PraneshKumar} to="see more href" />
  ));
