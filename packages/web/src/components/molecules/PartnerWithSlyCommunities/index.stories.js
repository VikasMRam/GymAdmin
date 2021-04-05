import React from 'react';
import { storiesOf } from '@storybook/react';

import PartnerWithSly from 'sly/web/components/molecules/PartnerWithSly';

storiesOf('Molecules|PartnerWithSlyCommunities', module)
  .add('default', () => (
    <PartnerWithSly />
  ));
