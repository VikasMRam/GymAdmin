import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';
import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';
import Modal from 'sly/components/molecules/Modal';

const CommunityAskQuestionAgentFormContainer = reduxForm({
  form: 'CommunityAskQuestionAgentForm',
  destroyOnUnmount: false,
})(CommunityAskQuestionAgentForm);

const component = (
  <CommunityAskQuestionAgentFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    placeholder="Rhoda"
    heading="We&apos;ve received your tour request."
    description="Your advisor will reach out to you soon. Feel free to ask them any questions in the meantime."
  />
);

storiesOf('Organisms|CommunityAskQuestionAgentForm', module)
  .add('default', () => component)
  .add('Within Modal', () => (
    <Modal
      onClose={action('closed')}
      isOpen
      closeable
    >
      {component}
    </Modal>
  ));
