import React from 'react';
import { storiesOf } from '@storybook/react';

import FamilySummary from 'sly/components/molecules/FamilySummary';
import PraneshKumar from 'sly/../private/storybook/sample-data/user-pranesh-kumar.json';

storiesOf('Molecules|FamilySummary', module)
  .add('default', () => (
    <FamilySummary client={PraneshKumar} href="see more href" />
  ));
