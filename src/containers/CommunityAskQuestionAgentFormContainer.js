import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string, object, shape } from 'prop-types';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/services/helpers/events';
import { query } from 'sly/services/newApi';
import { ASK_QUESTION } from 'sly/services/api/actions';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import {
  createValidator,
  required,
  usPhone,
  email,
} from 'sly/services/validation';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';
import { getDetail } from 'sly/store/selectors';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';

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

const mapStateToProps = (state, ownProps) => {
  const { question } = ownProps;
  return {
    // todo: hack for this to not error till it's moved to new api and selector
    userAction: getDetail(state, 'userAction') || {},
    initialValues: {
      question,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
});

@withRouter

@connect(
  mapStateToProps,
  mapDispatchToProps,
)

@query('createAction', 'createUuidAction')

export default class CommunityAskQuestionAgentFormContainer extends Component {
  static propTypes = {
    postUserAction: func.isRequired,
    notifyInfo: func.isRequired,
    clearSubmitErrors: func.isRequired,
    toggleAskAgentQuestionModal: func.isRequired,
    community: communityPropType,
    createAction: func.isRequired,
    match: shape({ url: string }),
    heading: string,
    description: string,
    agentImageUrl: string,
    placeholder: string,
    userAction: object,
    initialValues: object,
  };

  handleOnSubmit = (data) => {
    const {
      postUserAction, notifyInfo, clearSubmitErrors, toggleAskAgentQuestionModal,
      community, createAction, match,
    } = this.props;
    const { id } = community;

    const value = {
      question: data.question,
      user: {
        full_name: data.full_name,
        phone: data.phone,
      },
      slug: id,
    };

    const body = {
      action: ASK_QUESTION,
      value,
    };

    clearSubmitErrors();

    return Promise.all([
      postUserAction(body),
      createAction({
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
      }),
    ])

      .then(() => {
        const event = {
          action: 'ask-question', category: 'BAT', label: id,
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
      heading, description, agentImageUrl, placeholder, userAction,
    } = this.props;
    let { initialValues } = this.props;
    const { userDetails } = userAction;
    if (userDetails) {
      initialValues = {
        ...initialValues,
        full_name: userDetails.fullName,
        phone: userDetails.phone,
      };
    }
    return (
      <ReduxForm
        initialValues={initialValues}
        userDetails={userDetails}
        onSubmit={this.handleOnSubmit}
        placeholder={placeholder}
        heading={heading}
        description={description}
        agentImageUrl={agentImageUrl}
      />
    );
  }
}

