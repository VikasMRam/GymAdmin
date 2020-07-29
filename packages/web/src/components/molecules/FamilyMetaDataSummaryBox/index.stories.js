import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FamilyMetaDataSummaryBox from 'sly/web/components/molecules/FamilyMetaDataSummaryBox';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';

storiesOf('Molecules|FamilyMetaDataSummaryBox', module)
  .add('default', () => (
    <FamilyMetaDataSummaryBox client={PraneshKumar} onEditClick={action('onEditClick')} />
  ));
