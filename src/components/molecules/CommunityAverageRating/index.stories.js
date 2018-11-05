import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAverageRating from 'sly/components/molecules/CommunityAverageRating';

storiesOf('Molecules|CommunityAverageRating', module)
  .add('default', () => (
    <CommunityAverageRating rating={3.6} />
  ));
