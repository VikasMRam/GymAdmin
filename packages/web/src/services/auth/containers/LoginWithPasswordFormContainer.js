import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, minLength, email } from 'sly/web/services/validation';
import { withAuth } from 'sly/web/services/api';
import LoginWithPasswordForm from 'sly/web/services/auth/components/LoginWithPasswordForm';

const formName = 'LoginWithPasswordForm';

const validate = createValidator({
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(LoginWithPasswordForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

@withAuth
@connect(null, mapDispatchToProps)

export default class LoginWithPasswordFormContainer extends Component {
  static propTypes = {
    loginUser: func.isRequired,
    clearSubmitErrors: func,
    onSubmitSuccess: func,
    form: string,
  };

  handleOnSubmit = ({ emailOrPhone, password }) => {
    const { loginUser, onSubmitSuccess, clearSubmitErrors, form } = this.props;
    const payload = { password };
    let username;
    if (!email(emailOrPhone)) {
      payload.email = emailOrPhone;
      username = 'email';
    } else {
      payload.phone_number = emailOrPhone;
      username = 'phone number';
    }

    clearSubmitErrors(form);
    return loginUser(payload)
      .then(onSubmitSuccess)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: `Oops! That ${username} / password combination is not valid.` }));
        }

        return Promise.reject(error);
      });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
