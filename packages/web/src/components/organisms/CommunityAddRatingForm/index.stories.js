import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityAddRatingForm from 'sly/web/components/organisms/CommunityAddRatingForm';
import { withPreventDefault } from 'sly/web/services/helpers/forms';


const CommunityAskQuestionFormContainer = reduxForm({
  form: 'CommunityAddRatingForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
})(CommunityAddRatingForm);

const user = {
  id: 1,
  name: 'Pranesh Kumar',
};

const communityName = 'Rhoda Goldman Plaza';

storiesOf('Organisms|CommunityAddRatingForm', module).add('default', () => (
  <CommunityAskQuestionFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    communityName={communityName}
    user={user}
  />
)).add('Guest User', () => (
  <CommunityAskQuestionFormContainer
    communityName={communityName}
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
