import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { clearSubmitErrors, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createValidator, email, required } from 'sly/services/validation';
import userPropType from 'sly/propTypes/user';
import { EXIT_INTENT_ASK_QUESTIONS } from 'sly/services/api/constants';
import ExitIntentQuestionForm from 'sly/components/organisms/ExitIntentQuestionForm';
import Thankyou from 'sly/components/molecules/Thankyou';
import { query } from 'sly/services/api';
import SlyEvent from 'sly/services/helpers/events';
import withAuth from 'sly/services/api/withAuth';
import withUser from 'sly/services/api/withUser';

const formName = 'ExitIntentQuestionForm';
const validate = createValidator({
  name: [required],
  email: [required, email],
  question: [required],
});

const sendEvent = (action, label) => SlyEvent.getInstance().sendEvent({
  category: 'exit-intent',
  action,
  label,
});
const afterSubmit = (result, dispatch) => dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit,
})(ExitIntentQuestionForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors(formName),
};

@withRouter
@withUser
@withAuth
@connect(null, mapDispatchToProps)
@query('createAction', 'createUuidAction')

export default class ExitIntentQuestionFormContainer extends PureComponent {
  static propTypes = {
    createAction: func.isRequired,
    location: object,
    user: userPropType,
    showModal: func.isRequired,
    createOrUpdateUser: func.isRequired,
  };

  componentDidMount() {
    sendEvent('question-form-open', this.props.location.pathname);
  }

  componentWillUnmount() {
    sendEvent('question-form-close', this.props.location.pathname);
  }

  handleSubmit = (data) => {
    const {
      createAction, createOrUpdateUser, location: { pathname }, showModal, user,
    } = this.props;

    const {
      name = (user && user.name) || undefined,
      email = (user && user.email) || undefined,
    } = data;

    clearSubmitErrors();

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: EXIT_INTENT_ASK_QUESTIONS,
        actionPage: pathname,
        actionInfo: {
          question: data.question,
          name,
          email,
        },
      },
    }).then(() => createOrUpdateUser({
      name,
      email,
    })).then(() => {
      sendEvent('question-form-send', pathname);
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

