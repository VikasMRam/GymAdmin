import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityRating from '.';

storiesOf('Molecules|CommunityRating', module)
  .add('default', () => (
    <CommunityRating rating={3.6} numReviews={50} />
  ))
  .add('with description', () => (
    <CommunityRating rating={3.6} numReviews={50} description="Average rating" />
  ));
