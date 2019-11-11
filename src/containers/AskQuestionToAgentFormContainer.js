import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, object, shape, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query, withAuth } from 'sly/services/newApi';
import agentPropType from 'sly/propTypes/agent';
import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import SlyEvent from 'sly/services/helpers/events';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';

const form = 'AskQuestionToAgentForm';
const validate = createValidator({
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
  question: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(AskQuestionToAgentForm);

@withRouter
@withAuth
@query('createAction', 'createUuidAction')

export default class AskQuestionToAgentFormContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    createOrUpdateUser: func.isRequired,
    postSubmit: func,
    match: shape({
      url: string,
    }),
    createAction: func.isRequired,
  };

  handleSubmit = (data) => {
    const {
      agent, postSubmit, createAction, createOrUpdateUser, match,
    } = this.props;

    const { id } = agent;

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: AGENT_ASK_QUESTIONS,
        actionPage: match.url,
        actionInfo: {
          slug: id,
          question: data.question,
          entityType: 'Agent',
          name: data.full_name,
          email: data.email,
          phone: data.phone,
        },
      },
    }).then(() => createOrUpdateUser({
      name: data.full_name,
      email: data.email,
      phone: data.phone,
    })).then(() => {
      const event = {
        action: 'ask_question', category: 'agent', label: id,
      };

      SlyEvent.getInstance().sendEvent(event);

      if (postSubmit) {
        postSubmit();
      }
    });
  };

  render() {
    return (
      <ReduxForm
        initialValues={{ question: '' }}
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

