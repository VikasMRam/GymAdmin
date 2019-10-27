import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, object, shape, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/services/newApi';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { connectController } from 'sly/controllers';
import AskQuestionToAgentForm from 'sly/components/molecules/AskQuestionToAgentForm';
import { createValidator, required, email } from 'sly/services/validation';
import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';

const form = 'ExitIntentQuestionForm';
const validate = createValidator({
  name: [required],
  email: [required, email],
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
  pathName: location.pathname,
});

@withRouter

@connectController(mapStateToProps)

@query('createAction', 'createUuidAction')
export default class ExitIntentQuestionFormContainer extends Component {
    static propTypes = {
      createAction: func.isRequired,
    };

    handleSubmit = (data) => {
      const {
        createAction,
      } = this.props;

      const { question } = data;

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
              name: data.full_name,
              email: data.email,
              phone: data.phone,
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

