import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import SendMessageForm from 'sly/web/components/organisms/SendMessageForm';
import { withPreventDefault } from 'sly/common/services/helpers/forms';
import participant2 from 'sly/storybook/sample-data/conversation-participant-2.json';

const SendMessageFormContainer = reduxForm({
  form: 'SendMessageForm',
})(SendMessageForm);

storiesOf('Organisms|SendMessageForm', module)
  .add('default', () => (
    <SendMessageFormContainer
      otherParticipant={participant2}
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
