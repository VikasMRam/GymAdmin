import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { func } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import { ASK_QUESTION } from 'sly/services/api/actions';

import { resourceCreateRequest } from 'sly/store/resource/actions';
import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';

const validate = createValidator({
  question: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionAgentForm',
  validate,
})(CommunityAskQuestionAgentForm);

class CommunityAskQuestionAgentFormContainer extends Component {
  static propTypes = {
    postUserAction: func,
    notifyInfo: func,
  };

  handleOnSubmit = (data) => {
    const { postUserAction, notifyInfo } = this.prop;

    const value = {
      question: data.question,
    };

    const body = {
      action: ASK_QUESTION,
      value,
    };

    return postUserAction(body)
      .then(() => {
        const event = {
          action: 'ask-question', category: 'BAT',
        };
        SlyEvent.getInstance().sendEvent(event);
        notifyInfo('Question sent successfully.');
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to send question. Please try again.' });
      });
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommunityAskQuestionAgentFormContainer);
