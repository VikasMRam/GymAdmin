import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GatheredReviewRatings from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propRatings } = RhodaGoldmanPlaza;
const { ratingsArray } = propRatings;

const onLeaveReview = function () {
  console.log('On Click of onLeaveReview');
};

storiesOf('Molecules|GatheredReviewRatings', module).add('default', () => (
  <GatheredReviewRatings
    reviewRatings={ratingsArray}
    onLeaveReview={onLeaveReview}
  />
));
