import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createValidator, email, required } from 'sly/services/validation';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { EXIT_INTENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';
import { ASK_QUESTION } from 'sly/services/api/actions';
import ExitIntentQuestionForm from 'sly/components/organisms/ExitIntentQuestionForm';
import SlyEvent from 'sly/services/helpers/events';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { query } from 'sly/services/newApi';
import withServerState from 'sly/store/withServerState';
import Thankyou from 'sly/components/molecules/Thankyou';

const formName = 'ExitIntentQuestionForm';
const validate = createValidator({
  name: [required],
  email: [required, email],
  question: [required],
});


const ReduxForm = reduxForm({
  form: formName,
  validate,
})(ExitIntentQuestionForm);

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
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
      pathname: string,
      showModal: func.isRequired,
    };

    handleSubmit = (data) => {
      const {
        createAction, postUserAction, userDetails, pathname, showModal,
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

      clearSubmitErrors();

      return Promise.all([
        postUserAction(payload),
        createAction({
          type: 'UUIDAction',
          attributes: {
            actionType: EXIT_INTENT_ASK_QUESTIONS,
            actionPage: pathname,
            actionInfo: {
              // slug: id,
              question,
              entityType: 'Agent',
              name: data.full_name,
              email: data.email,
            },
          },
        }),
      ]).then(() => {
        const event = {
          action: 'ask_question', category: 'exit-intent', label: pathname,
        };

        SlyEvent.getInstance().sendEvent(event);
        showModal(<Thankyou />);
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

