import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import CommunityAskQuestionForm from '.';

const CommunityAskQuestionFormContainer = reduxForm({
  form: 'CommunityAskQuestionForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
})(CommunityAskQuestionForm);

storiesOf('Organisms|CommunityAskQuestionForm', module).add('default', () => (
  <CommunityAskQuestionFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
