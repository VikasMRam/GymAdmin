import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, bool } from 'prop-types';
import { reduxForm, SubmissionError, clearSubmitErrors, reset } from 'redux-form';

import { query } from 'sly/services/newApi';
import { CONVERSATION_DATA_TYPE_TEXT, CONVERSATION_MEDIUM_INAPP, CONVERSATION_MEDIUM_SMS, CONVERSATION_MEDIUM_EMAIL } from 'sly/constants/conversations';
import { CONVERSTION_PARTICIPANT_RESOURCE_TYPE, CONVERSTION_MESSAGE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import SendMessageForm from 'sly/components/organisms/SendMessageForm';
import { createValidator, required } from 'sly/services/validation';
import conversationPropType from 'sly/propTypes/conversation/conversation';

const formName = 'SendMessageForm';

const validate = createValidator({
  message: [required],
});

const afterSubmit = (result, dispatch) =>
  dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit,
})(SendMessageForm);

const mapDispatchToProps = dispatch => ({
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
});
@query('updateClient', 'updateClient')
@query('createConversationParticipant', 'createConversationParticipant')
@query('createConversationMessage', 'createConversationMessage')

@connect(null, mapDispatchToProps)

export default class SendMessageFormContainer extends Component {
  static propTypes = {
    conversation: conversationPropType,
    canCreateParticipant: bool,
    otherParticipantId: string,
    otherParticipantType: string,
    createConversation: func,
    createConversationParticipant: func,
    createConversationMessage: func,
    onSuccess: func,
    onCreateConversationSuccess: func,
    clearSubmitErrors: func,
  };

  handleOnSubmit = (formData) => {
    const {
      conversation,
      canCreateParticipant,
      otherParticipantId,
      otherParticipantType,
      createConversationParticipant,
      createConversationMessage,
      clearSubmitErrors,
      onSuccess,
      onCreateConversationSuccess,
    } = this.props;
    const { id: conversationId } = conversation;
    if (canCreateParticipant) {
      const participantPayload = {
        type: CONVERSTION_PARTICIPANT_RESOURCE_TYPE,
        attributes: {
          conversationID: conversationId,
          participantID: otherParticipantId,
          participantType: otherParticipantType,
        },
      };
      return createConversationParticipant(participantPayload).then(({ body }) => {
        const { data } = body;
        const { id: participantId } = data;
        const messagePayload = {
          type: CONVERSTION_MESSAGE_RESOURCE_TYPE,
          attributes: {
            conversationID: conversationId,
            participantID: participantId,
            data: {
              value: formData.message,
            },
          },
        };
        return createConversationMessage(messagePayload).then(onCreateConversationSuccess);
      })
        .catch(() => {
          throw new SubmissionError({ _error: 'Failed to create conversation. Please try again.' });
        });
    }
    const data = {
      type: CONVERSATION_DATA_TYPE_TEXT,
      value: formData.message,
    };
    const payload = {
      type: CONVERSTION_MESSAGE_RESOURCE_TYPE,
      attributes: {
        data,
        conversationID: conversationId,
        medium: CONVERSATION_MEDIUM_INAPP,
        sendingMedium: [CONVERSATION_MEDIUM_INAPP, CONVERSATION_MEDIUM_SMS, CONVERSATION_MEDIUM_EMAIL],
      },
    };
    clearSubmitErrors();
    return createConversationMessage(payload)
      .then(onSuccess)
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to send message. Please try again.' });
      });
  };

  render() {
    const { ...props } = this.props;

    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        {...props}
      />
    );
  }
}

