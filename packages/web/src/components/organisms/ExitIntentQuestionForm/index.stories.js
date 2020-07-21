import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ExitIntentQuestionForm from '.';

import Modal from 'sly/web/components/molecules/Modal';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ExitIntentQuestionFormContainer = reduxForm({
  form: 'ExitIntentQuestionForm',
  destroyOnUnmount: false,
})(ExitIntentQuestionForm);

storiesOf('Organisms|ExitIntentQuestionForm', module)
  .add('default', () => (
    <ExitIntentQuestionFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  )).add('within modal', () => (
    <Modal
      onClose={action('closed')}
      isOpen
      layout="noPadding"
    >
      <ExitIntentQuestionFormContainer handleSubmit={withPreventDefault(action('form submitted'))} />
    </Modal>
  ));
