import React from 'react';
import { storiesOf } from '@storybook/react';

import PartnerWithSly from 'sly/components/organisms/PartnerWithSly';

storiesOf('Organisms|PartnerWithSly', module)
  .add('default', () => (
    <PartnerWithSly />
  ));
