import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, string, oneOf } from 'prop-types';
import { withRouter } from 'react-router';

import { query, withAuth, withUser } from 'sly/services/newApi';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';
import { capitalize } from  'sly/services/helpers/utils';
import matchPropType from 'sly/propTypes/match';
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
    id: string.isRequired,
    user: userPropType,
    createOrUpdateUser: func.isRequired,
    postSubmit: func,
    match: matchPropType.isRequired,
    createAction: func.isRequired,
    category: oneOf(['agent', 'community']),
  };

  static defaultProps = {
    category: 'agent',
  };

  handleSubmit = (data) => {
    const {
      id, postSubmit, createAction, createOrUpdateUser, match,
      user, category,
    } = this.props;

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
          entityType: capitalize(category),
          name,
          email,
          phone,
        },
      },
    })
      .then(() => createOrUpdateUser({
        name,
        email,
        phone,
      }, { ignoreAlreadyRegistered: true }))
      .then(() => {
        const event = {
          action: 'ask_question', category, label: id,
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
