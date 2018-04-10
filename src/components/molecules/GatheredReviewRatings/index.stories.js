import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GatheredReviewRatings from '.';

const reviewRatings = [
  {
    provider: 'yelp',
    providerDisplayText: 'Yelp®',
    rating: 4.5,
    url: '/yelp',
  },
  {
    provider: 'senioradvisor',
    providerDisplayText: 'SeniorAdvisor.com®',
    rating: 4.5,
    url: '/senioradvisor',
  },
  {
    provider: 'caring',
    providerDisplayText: 'Caring.com®',
    rating: 5,
    url: '/caring',
  },
  {
    provider: 'facebook',
    providerDisplayText: 'Facebook®',
    rating: 4.5,
    url: '/facebook',
  },
];

const onLeaveReview = function () {
  console.log('On Click of onLeaveReview');
};

storiesOf('Molecules|GatheredReviewRatings', module).add('default', () => (
  <GatheredReviewRatings
    reviewRatings={reviewRatings}
    onLeaveReview={onLeaveReview}
  />
));
