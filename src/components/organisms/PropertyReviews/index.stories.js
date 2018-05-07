import React from 'react';
import { storiesOf } from '@storybook/react';

import PropertyReviews from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propRatings, reviews } = RhodaGoldmanPlaza;
const { ratingsArray, hasSlyReviews, hasWebReviews } = propRatings;

const onLeaveReview = function () {
  console.log('On Click of onLeaveReview outside PropertyReviews ');
};

storiesOf('Organisms|PropertyReviews', module).add('default', () => (
  <PropertyReviews
    hasSlyReviews={hasSlyReviews}
    hasWebReviews={hasWebReviews}
    reviews={reviews}
    reviewRatings={ratingsArray}
    onLeaveReview={onLeaveReview}
  />
));
