import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import CommunityTourBookedAskQuestionForm from 'sly/components/organisms/CommunityTourBookedAskQuestionForm';

const CommunityTourBookedAskQuestionFormContainer = reduxForm({
  form: 'CommunityTourBookedAskQuestionForm',
  destroyOnUnmount: false,
})(CommunityTourBookedAskQuestionForm);

storiesOf('Organisms|CommunityTourBookedAskQuestionForm', module)
  .add('default', () => (
    <CommunityTourBookedAskQuestionFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
