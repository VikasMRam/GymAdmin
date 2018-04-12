import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PropertyReview from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { propRatings } = RhodaGoldmanPlaza;
const { ratingsArray } = propRatings;
const reviews = RhodaGoldmanPlaza.reviews[0];
const review = reviews[0];

storiesOf('Molecules|PropertyReview', module).add('default', () => (
  <PropertyReview
    value={review.value}
    comments={review.comments}
    author={review.author}
    date="Sept 10, 2018"
  />
));
