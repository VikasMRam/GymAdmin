import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';
import SimilarCommunitiesForm from '.';

import community from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const SimilarCommunitiesFormContainer = reduxForm({
  form: 'SimilarCommunitiesForm',
  initialValues: {
    similar_tags: [],
    similar_communities: ['rhoda-goldman-plaza_1'],
  },
})(SimilarCommunitiesForm);

storiesOf('Organisms|SimilarCommunitiesForm', module).add('default', () => (
  <SimilarCommunitiesFormContainer
    handleSubmit={action('submit!')}
    community={community}
  />
));
