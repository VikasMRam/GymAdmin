import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createValidator, email, required } from 'sly/services/validation';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { EXIT_INTENT_ASK_QUESTIONS } from 'sly/services/newApi/constants';
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
        createAction, userDetails, pathname, showModal,
      } = this.props;
      const { question } = data;
      const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });

      console.log('\n\nform: ', user);

      clearSubmitErrors();

      return Promise.all([
        createAction({
          type: 'UUIDAction',
          attributes: {
            actionType: EXIT_INTENT_ASK_QUESTIONS,
            actionPage: pathname,
            actionInfo: {
              question,
              name: user.full_name,
              email: user.email,
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

