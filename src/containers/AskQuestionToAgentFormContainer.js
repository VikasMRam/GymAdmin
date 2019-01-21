import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, object } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import { ASK_AGENT } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import SlyEvent from 'sly/services/helpers/events';

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

class AskQuestionToAgentFormContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    postSubmit: func,
  };
  handleSubmit = (data) => {
    const { question } = data;
    const {
      agent, userDetails, postUserAction, postSubmit,
    } = this.props;
    const { id } = agent;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      question,
      slug: id,
      user,
    };
    const payload = {
      action: ASK_AGENT,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        const event = {
          action: 'ask_question', category: 'agent', label: id,
        };
        SlyEvent.getInstance().sendEvent(event);
        if (postSubmit) {
          postSubmit();
        }
      });
  }

  render() {
    const { ...props } = this.props;
    const initialValues = {
      question: '',
    };
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}

export default AskQuestionToAgentFormContainer;
