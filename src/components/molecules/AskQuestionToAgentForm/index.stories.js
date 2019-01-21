import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { withPreventDefault } from 'sly/services/helpers/forms';

const AskQuestionToAgentFormContainer = reduxForm({
  form: 'AskQuestionToAgentForm',
  destroyOnUnmount: false,
})(AskQuestionToAgentForm);


storiesOf('Organisms|AskQuestionToAgentForm', module).add('default', () => (
  <AskQuestionToAgentFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    heading="Ask Stephen a question"
    firstName="Stephen"
  />
));
