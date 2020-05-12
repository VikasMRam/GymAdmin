import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ExitIntentQuestionForm from './index';

import Modal from 'sly/components/molecules/Modal';
import { withPreventDefault } from 'sly/services/helpers/forms';

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
