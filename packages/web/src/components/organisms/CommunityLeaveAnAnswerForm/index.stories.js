import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityLeaveAnAnswerForm from 'sly/web/components/organisms/CommunityLeaveAnAnswerForm';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const CommunityLeaveAnAnswerFormContainer = reduxForm({
  form: 'CommunityLeaveAnAnswerForm',
  destroyOnUnmount: false,
  initialValues: {
    anwser: '',
  },
})(CommunityLeaveAnAnswerForm);

const questionText = 'How was your Experience in Rhoda Goldman Plaza?';

storiesOf('Organisms|CommunityLeaveAnAnswerForm', module).add('default', () => (
  <CommunityLeaveAnAnswerFormContainer
    questionText={questionText}
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
