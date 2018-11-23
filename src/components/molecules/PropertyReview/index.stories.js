import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import PropertyReview from '.';

const { reviews } = RhodaGoldmanPlaza;
const review = reviews[0];

storiesOf('Molecules|PropertyReview', module).add('default', () => (
  <PropertyReview
    value={review.value}
    comments={review.comments}
    author={review.author}
    createdAt={review.createdAt}
  />
));
