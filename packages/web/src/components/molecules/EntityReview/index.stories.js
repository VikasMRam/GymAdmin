import React from 'react';
import { storiesOf } from '@storybook/react';

import EntityReview from 'sly/web/components/molecules/EntityReview';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { reviews } = RhodaGoldmanPlaza;
const review = reviews[0];

storiesOf('Molecules|EntityReview', module).add('default', () => (
  <EntityReview
    value={review.value}
    comments={review.comments}
    author={review.author}
    createdAt={review.createdAt}
  />
));
