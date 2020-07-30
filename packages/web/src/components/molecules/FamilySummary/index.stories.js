import React from 'react';
import { storiesOf } from '@storybook/react';

import FamilySummary from 'sly/web/components/molecules/FamilySummary';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';

storiesOf('Molecules|FamilySummary', module)
  .add('default', () => (
    <FamilySummary client={PraneshKumar} to="see more href" />
  ));
