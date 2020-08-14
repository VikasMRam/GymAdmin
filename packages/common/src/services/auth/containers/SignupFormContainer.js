import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { withAuth } from 'sly/web/services/api';
import { createValidator, required, email, usPhone, minLength } from 'sly/web/services/validation';
import SignupForm from 'sly/common/services/auth/components/SignupForm';

const validate = createValidator({
  firstName: [required],
  email: [required, email],
  phone: [required, usPhone],
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: 'SignupForm',
  validate,
})(SignupForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('SignupForm'),
};

@withAuth

@connect(null, mapDispatchToProps)

export default class SignupFormContainer extends Component {
  static propTypes = {
    registerUser: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmit: func,
  };

  handleSubmit = (data) => {
    const { registerUser, clearSubmitErrors, onSubmit } = this.props;
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };

    clearSubmitErrors();
    return registerUser(data)
      .then(onSubmit)
      .catch((data) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(data.body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
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
