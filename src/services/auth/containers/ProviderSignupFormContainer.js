import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { PROVIDER_OD_ROLE } from 'sly/constants/roles';
import { withAuth } from 'sly/services/api';
import { createValidator, required, email, minLength, usPhone } from 'sly/services/validation';
import ProviderSignupForm from 'sly/services/auth/components/ProviderSignupForm';

const validate = createValidator({
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: 'ProviderSignupForm',
  validate,
})(ProviderSignupForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('ProviderSignupForm'),
};

@withAuth
@connect(null, mapDispatchToProps)

export default class ProviderSignupFormContainer extends Component {
  static propTypes = {
    registerUser: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmit: func,
  };

  handleSubmit = (data) => {
    const { registerUser, clearSubmitErrors, onSubmit } = this.props;
    clearSubmitErrors();
    data.role_id = PROVIDER_OD_ROLE.toString();
    return registerUser(data)
      .then(onSubmit)
      .catch((data) => {
      // TODO: Need to set a proper way to handle server side errors
      const errorMessage = Object.values(data.body.errors).join('. ');
      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return <ReduxForm
      {...this.props}
      onSubmit={this.handleSubmit}  />;
  }
}
