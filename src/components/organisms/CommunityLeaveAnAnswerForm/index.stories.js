import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import CommunityLeaveAnAnswerForm from '.';

const CommunityLeaveAnAnswerFormContainer = reduxForm({
  form: 'CommunityLeaveAnAnswerForm',
  destroyOnUnmount: false,
  initialValues: {
    anwser: '',
  },
})(CommunityLeaveAnAnswerForm);

storiesOf('Organisms|CommunityLeaveAnAnswerForm', module).add('default', () => (
  <CommunityLeaveAnAnswerFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
