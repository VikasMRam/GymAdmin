import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { ASK_QUESTION } from 'sly/services/api/actions';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import {
  createValidator,
  required,
} from 'sly/services/validation';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';

const validate = createValidator({
  question: [required],
});
const formName = 'CommunityAskQuestionAgentForm';
const ReduxForm = reduxForm({
  form: formName,
  validate,
})(CommunityAskQuestionAgentForm);

class CommunityAskQuestionAgentFormContainer extends Component {
  static propTypes = {
    postUserAction: func.isRequired,
    notifyInfo: func.isRequired,
    clearSubmitErrors: func.isRequired,
    toggleAskAgentQuestionModal: func.isRequired,
    community: communityPropType,
    heading: string,
    description: string,
    agentImageUrl: string,
    placeholder: string,
  };

  handleOnSubmit = (data) => {
    const {
      postUserAction, notifyInfo, clearSubmitErrors, toggleAskAgentQuestionModal,
      community,
    } = this.props;
    const { id } = community;

    const value = {
      question: data.question,
      slug: id,
    };

    const body = {
      action: ASK_QUESTION,
      value,
    };

    clearSubmitErrors();
    return postUserAction(body)
      .then(() => {
        const event = {
          action: 'ask-question', category: 'BAT',
        };
        SlyEvent.getInstance().sendEvent(event);
        toggleAskAgentQuestionModal();
        notifyInfo('Question sent successfully.');
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to send question. Please try again.' });
      });
  };

  render() {
    const {
      heading, description, agentImageUrl, placeholder,
    } = this.props;

    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        placeholder={placeholder}
        heading={heading}
        description={description}
        agentImageUrl={agentImageUrl}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommunityAskQuestionAgentFormContainer);
