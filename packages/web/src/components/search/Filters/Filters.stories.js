import React from 'react';
import { storiesOf } from '@storybook/react';

import Filters from './Filters';

storiesOf('Search|Filters', module)
  .add('default', () => (
    <Filters />
  ));
