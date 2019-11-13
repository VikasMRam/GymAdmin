import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';
import { withAuth } from 'sly/services/newApi';

const validate = createValidator({
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'ResetPasswordForm',
  validate,
})(ResetPasswordForm);

const mapDispatchToProps = dispatch => ({
  clearSubmitErrors: () => dispatch(clearSubmitErrors('ResetPasswordForm')),
});

@withAuth

@connect(null, mapDispatchToProps)

export default class ResetPasswordFormContainer extends Component {
  static propTypes = {
    recoverPassword: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmitSuccess: func,
  };

  handleSubmit = (data) => {
    const { recoverPassword, clearSubmitErrors, onSubmitSuccess } = this.props;
    clearSubmitErrors();

    return recoverPassword(data).then(onSubmitSuccess).catch((response) => {
      // TODO: Need to set a proper way to handle server side errors
      const errorMessage = Object.values(response.body.errors).join('. ');
      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return <ReduxForm onSubmit={this.handleSubmit} {...this.props} />;
  }
}
