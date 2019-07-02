import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { reduxForm, SubmissionError, clearSubmitErrors, reset } from 'redux-form';

import { query } from 'sly/services/newApi';
import { CONVERSATION_DATA_TYPE_TEXT, CONVERSATION_MEDIUM_INAPP } from 'sly/constants/conversations';
import { CONVERSTION_MESSAGE_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import participantPropType from 'sly/propTypes/conversation/conversationParticipant';
import SendMessageForm from 'sly/components/organisms/SendMessageForm';
import { createValidator, required } from 'sly/services/validation';

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

@query('createConversationMessage', 'createConversationMessage')

@connect(null, mapDispatchToProps)

export default class SendMessageFormContainer extends Component {
  static propTypes = {
    createConversationMessage: func,
    onSuccess: func,
    clearSubmitErrors: func,
    otherParticipant: participantPropType.isRequired,
  };

  handleOnSubmit = (formData) => {
    const {
      otherParticipant,
      createConversationMessage,
      clearSubmitErrors,
      onSuccess,
    } = this.props;
    const { conversationID } = otherParticipant;
    const data = {
      type: CONVERSATION_DATA_TYPE_TEXT,
      value: formData.message,
    };
    const payload = {
      type: CONVERSTION_MESSAGE_RESOURCE_TYPE,
      attributes: {
        data,
        conversationID,
        medium: CONVERSATION_MEDIUM_INAPP,
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

