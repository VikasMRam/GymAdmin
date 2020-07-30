import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/web/services/helpers/events';
import { query, withUser } from 'sly/web/services/api';
import {
  createValidator,
  required,
  usPhone,
  email,
} from 'sly/web/services/validation';
import userPropType from 'sly/common/propTypes/user';
import matchPropType from 'sly/common/propTypes/match';
import { community as communityPropType } from 'sly/common/propTypes/community';
import CommunityAskQuestionAgentForm from 'sly/web/components/organisms/CommunityAskQuestionAgentForm';
import { AGENT_ASK_QUESTIONS } from 'sly/web/services/api/constants';

const validate = createValidator({
  full_name: [required],
  email: [required, email],
  phone: [required, usPhone],
  question: [required],
});
const formName = 'CommunityAskQuestionAgentForm';
const ReduxForm = reduxForm({
  form: formName,
  validate,
})(CommunityAskQuestionAgentForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors(formName),
};

@withUser

@withRouter

@connect(null, mapDispatchToProps)

@query('createAction', 'createUuidAction')

export default class CommunityAskQuestionAgentFormContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    clearSubmitErrors: func.isRequired,
    toggleAskAgentQuestionModal: func.isRequired,
    community: communityPropType,
    createAction: func.isRequired,
    match: matchPropType,
    heading: string,
    description: string,
    placeholder: string,
    user: userPropType,
    question: string,
    type: string,
  };

  handleOnSubmit = (data) => {
    const {
      notifyInfo, clearSubmitErrors, toggleAskAgentQuestionModal,
      community, createAction, match, type
    } = this.props;
    const { id } = community;

    clearSubmitErrors();

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: AGENT_ASK_QUESTIONS,
        actionPage: match.url,
        actionInfo: {
          slug: id,
          question: data.question,
          entityType: 'Property',
          name: data.full_name,
          phone: data.phone,
        },
      },
    }).then(() => {
      const c = `Community-${type}`;
      const event = {
        action: 'ask-question', category: c, label: id,
      };
      SlyEvent.getInstance().sendEvent(event);
      toggleAskAgentQuestionModal();
      notifyInfo('Question sent successfully.');
    }).catch(() => {
      throw new SubmissionError({ _error: 'Failed to send question. Please try again.' });
    });
  };

  render() {
    const {
      heading, description, placeholder, user, question,
    } = this.props;

    let initialValues = {
      question,
    };
    if (user) {
      initialValues = {
        ...initialValues,
        full_name: user.name,
        phone: user.phoneNumber,
      };
    }

    return (
      <ReduxForm
        initialValues={initialValues}
        user={user}
        onSubmit={this.handleOnSubmit}
        placeholder={placeholder}
        heading={heading}
        description={description}
      />
    );
  }
}

