import React from 'react';
import { storiesOf } from '@storybook/react';

import Guides from 'sly/web/components/homepage/Guides';

storiesOf('Homepage|Guides', module)
  .add('default', () => (
    <Guides />
  ));
