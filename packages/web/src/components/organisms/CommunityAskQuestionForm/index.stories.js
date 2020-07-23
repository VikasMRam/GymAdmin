import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityAskQuestionForm from 'sly/web/components/organisms/CommunityAskQuestionForm';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

const CommunityAskQuestionFormContainer = reduxForm({
  form: 'CommunityAskQuestionForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
})(CommunityAskQuestionForm);

const user = {
  id: 1,
  name: 'Pranesh Kumar',
};

storiesOf('Organisms|CommunityAskQuestionForm', module).add('default', () => (
  <CommunityAskQuestionFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    user={user}
  />
)).add('Guest User', () => (
  <CommunityAskQuestionFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
