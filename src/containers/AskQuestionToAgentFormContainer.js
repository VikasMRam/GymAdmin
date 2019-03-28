import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, object, shape, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/services/newApi';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { connectController } from 'sly/controllers';
import agentPropType from 'sly/propTypes/agent';
import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { ASK_AGENT } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
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

const mapStateToProps = (state, { location }) => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails,
  pathName: location.pathname,
});

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

const mapPropsToActions = () => ({
  userDetails: resourceDetailReadRequest('userAction'),
});

@withRouter

@withServerState(mapPropsToActions)

@connectController(mapStateToProps, mapDispatchToProps)

@query('createAction', 'createUuidAction')

export default class AskQuestionToAgentFormContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    postSubmit: func,
    match: shape({
      url: string,
    }),
    createAction: func.isRequired,
  };

  handleSubmit = (data) => {
    const {
      agent, userDetails, postUserAction, postSubmit, createAction, match,
    } = this.props;

    const { question } = data;

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

    return Promise.all([
      postUserAction(payload),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType: AGENT_ASK_QUESTIONS,
          actionPage: match.url,
          actionInfo: {
            slug: id,
            question: data.question,
            entityType: 'Agent',
          },
        },
      }),
    ]).then(() => {
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
    if (!this.props.userDetails) {
      return null;
    }

    const initialValues = {
      question: '',
    };

    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

