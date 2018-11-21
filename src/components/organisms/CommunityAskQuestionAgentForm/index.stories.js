import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';

const CommunityAskQuestionAgentFormContainer = reduxForm({
  form: 'CommunityAskQuestionAgentForm',
  destroyOnUnmount: false,
})(CommunityAskQuestionAgentForm);

storiesOf('Organisms|CommunityAskQuestionAgentForm', module)
  .add('default', () => (
    <CommunityAskQuestionAgentFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
