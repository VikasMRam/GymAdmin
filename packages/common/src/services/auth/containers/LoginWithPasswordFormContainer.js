import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string, bool } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, minLength } from 'sly/web/services/validation';
import { withAuth } from 'sly/web/services/api';
import withNotification from 'sly/web/components/helpers/notification';
import LoginWithPasswordForm from 'sly/common/services/auth/components/LoginWithPasswordForm';

const formName = 'LoginWithPasswordForm';

const validate = createValidator({
  password: [minLength(8), required],
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
@withNotification
@connect(null, mapDispatchToProps)

export default class LoginWithPasswordFormContainer extends Component {
  static propTypes = {
    loginUser: func.isRequired,
    clearSubmitErrors: func,
    onSubmitSuccess: func,
    emailOrPhone: string.isRequired,
    form: string,
    isEmail: bool,
    sendOtpCode: func,
    magicLink: func,
    onMagicLinkSubmit: func,
    onOtpSubmit: func,
    notifyError: func,
  };

  handleOnSubmit = ({  password }) => {
    const { loginUser, onSubmitSuccess, clearSubmitErrors, form, emailOrPhone, isEmail } = this.props;
    const payload = { password };
    let method;
    if (isEmail) {
      payload.email = emailOrPhone;
      method = 'email';
    } else {
      payload.phone_number = emailOrPhone;
      method = 'phone number';
    }

    clearSubmitErrors(form);
    return loginUser(payload)
      .then(onSubmitSuccess)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: `Oops! That ${method} / password combination is not valid.` }));
        }

        return Promise.reject(error);
      });
  };


  handlePasswordLessOption=() => {
    const { magicLink, sendOtpCode, emailOrPhone, isEmail, onMagicLinkSubmit, onOtpSubmit, notifyError } = this.props;

    const payload = {};
    let submitMethod;
    let submitSuccess;

    if (isEmail) {
      payload.email = emailOrPhone;
      submitMethod = magicLink;
      submitSuccess = onMagicLinkSubmit;
    } else {
      payload.phone_number = emailOrPhone;
      submitMethod = sendOtpCode;
      submitSuccess = onOtpSubmit;
    }

    return submitMethod(payload)
      .then(submitSuccess)
      .catch((error) => {
        console.log(error);
        // TODO: Need to set a proper way to handle server side errors
        notifyError('Oops! There waas an error sending you link or code');
      });
  }


  render() {
    return (
      <ReduxForm
        {...this.props}
        passwordlessClick={this.handlePasswordLessOption}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
