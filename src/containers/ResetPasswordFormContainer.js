import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';
import withNotification from 'sly/controllers/withNotification';
import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';

const validate = createValidator({
  email: [required, email],
});

const formName = 'ResetPasswordForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(ResetPasswordForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

@withAuth
@withNotification
@connect(null, mapDispatchToProps)

export default class ResetPasswordFormContainer extends Component {
  static propTypes = {
    recoverPassword: func,
    clearSubmitErrors: func,
    form: string,
    notifyInfo: func.isRequired,
    onSuccess: func,
  };

  handleSubmit = ({ email }) => {
    const { recoverPassword, clearSubmitErrors, form, notifyInfo, onSuccess } = this.props;
    const payload = { email };

    clearSubmitErrors(form);
    return recoverPassword(payload)
      .catch((response) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(response.body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      })
      .then(onSuccess)
      .then(() => {
        notifyInfo(`A link to reset your password has been sent to ${email}.`);
      });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
