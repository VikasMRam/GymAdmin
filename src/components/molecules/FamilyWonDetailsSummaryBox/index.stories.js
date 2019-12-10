import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FamilyWonDetailsSummaryBox from 'sly/components/molecules/FamilyWonDetailsSummaryBox';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';

storiesOf('Molecules|FamilyWonDetailsSummaryBox', module)
  .add('default', () => (
    <FamilyWonDetailsSummaryBox client={PraneshKumar} onEditClick={action('onEditClick')} />
  ));
