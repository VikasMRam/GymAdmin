import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';
import SimilarCommunitiesForm from '.';

const SimilarCommunitiesFormContainer = reduxForm({
  form: 'SimilarCommunitiesForm',
  initialValues: {
    similar_communities: [],
  },
})(SimilarCommunitiesForm);

const community = {
  id: 'rhoda-goldman-plaza',
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
  picture:
    'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
  rating: 3.5,
  startingRate: 4500,
  numReviews: 50,
};

const communities = [community, community, community, community];

const tags = ['shared room', "alzheirmer's", 'san francisco'];

storiesOf('Organisms|SimilarCommunitiesForm', module).add('default', () => (
  <SimilarCommunitiesFormContainer
    handleSubmit={action('submit!')}
    tags={tags}
    communities={communities}
  />
));
