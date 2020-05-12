import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import GatheredReviewRatings from 'sly/web/components/molecules/GatheredReviewRatings';

const { propRatings } = RhodaGoldmanPlaza;
const { ratingsArray } = propRatings;

const onLeaveReview = () => {
  action('On Click of onLeaveReview');
};

storiesOf('Molecules|GatheredReviewRatings', module).add('default', () => (
  <GatheredReviewRatings
    reviewRatings={ratingsArray}
    onLeaveReview={onLeaveReview}
  />
));
