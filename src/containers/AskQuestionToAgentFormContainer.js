import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func } from 'prop-types';
import { withRouter } from 'react-router';

import { query, withAuth, withUser } from 'sly/services/newApi';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';
import matchPropType from 'sly/propTypes/match';
import agentPropType from 'sly/propTypes/agent';
import userPropType from 'sly/propTypes/user';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import SlyEvent from 'sly/services/helpers/events';

const form = 'AskQuestionToAgentForm';
const validate = createValidator({
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

@withRouter
@withAuth
@withUser
@query('createAction', 'createUuidAction')

export default class AskQuestionToAgentFormContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    user: userPropType,
    createOrUpdateUser: func.isRequired,
    postSubmit: func,
    match: matchPropType.isRequired,
    createAction: func.isRequired,
  };

  handleSubmit = (data) => {
    const {
      agent, postSubmit, createAction, createOrUpdateUser, match,
      user,
    } = this.props;

    const { id } = agent;
    const { message } = data;
    let { phone, email, name } = data;
    if (user) {
      if (user.phoneNumber) {
        ({ phoneNumber: phone } = user);
      }
      if (user.email) {
        ({ email } = user);
      }
      if (user.name) {
        ({ name } = user);
      }
    }

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: AGENT_ASK_QUESTIONS,
        actionPage: match.url,
        actionInfo: {
          slug: id,
          question: message,
          entityType: 'Agent',
          name,
          email,
          phone,
        },
      },
    }).then(() => createOrUpdateUser({
      name,
      email,
      phone,
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
        onSubmit={this.handleSubmit}
        hasEmail
        {...this.props}
      />
    );
  }
}
