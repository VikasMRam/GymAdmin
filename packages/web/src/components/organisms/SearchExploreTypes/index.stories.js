import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchExploreTypes from '.';

storiesOf('Organisms|SearchExploreTypes', module)
  .add('default', () => (
    <SearchExploreTypes heading="test heading" searchParams={{ 'page-number': 2 }} />
  ));
