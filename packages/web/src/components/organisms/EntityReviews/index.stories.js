import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EntityReviews from 'sly/components/organisms/EntityReviews';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propRatings, reviews } = RhodaGoldmanPlaza;
const { ratingsArray, hasSlyReviews, hasWebReviews } = propRatings;

const onLeaveReview = () => {
  action('On Click of onLeaveReview outside EntityReviews ');
};

storiesOf('Organisms|EntityReviews', module).add('default', () => (
  <EntityReviews
    hasSlyReviews={hasSlyReviews}
    hasWebReviews={hasWebReviews}
    reviews={reviews}
    reviewRatings={ratingsArray}
    onLeaveReview={onLeaveReview}
  />
));
