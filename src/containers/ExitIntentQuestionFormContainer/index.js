import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createValidator, email, required } from 'sly/services/validation';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { AGENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';
import { ASK_QUESTION } from 'sly/services/api/actions';
import ExitIntentQuestionForm from 'sly/components/organisms/ExitIntentQuestionForm/index';
import SlyEvent from 'sly/services/helpers/events';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { query } from 'sly/services/newApi';
import withServerState from 'sly/store/withServerState';

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
})(ExitIntentQuestionForm);

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});


const mapPropsToActions = () => ({
  userDetails: resourceDetailReadRequest('userAction'),
});

@withRouter

@withServerState(mapPropsToActions)

@connect(null, mapDispatchToProps)

@query('createAction', 'createUuidAction')
export default class ExitIntentQuestionFormContainer extends PureComponent {
    static propTypes = {
      createAction: func.isRequired,
      userDetails: object,
      postUserAction: func.isRequired,
      postSubmit: func,
      pathname: string,
    };

    handleSubmit = (data) => {
      const {
        createAction, postUserAction, userDetails, pathname,
      } = this.props;
      const { question } = data;
      const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
      const value = {
        question,
        user,
      };
      const payload = {
        action: ASK_QUESTION,
        value,
      };

      return Promise.all([
        postUserAction(payload),
        createAction({
          type: 'UUIDAction',
          attributes: {
            actionType: AGENT_ASK_QUESTIONS,
            actionPage: pathname,
            actionInfo: {
              // slug: id,
              question,
              entityType: 'Agent',
              name: data.full_name,
              email: data.email,
              phone: data.phone,
            },
          },
        }),
      ]).then(() => {
        const event = {
          action: 'ask_question', category: 'exit-intent', label: pathname,
        };

        SlyEvent.getInstance().sendEvent(event);
        // @todo handle post submit events
      });
    };

    render() {
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

