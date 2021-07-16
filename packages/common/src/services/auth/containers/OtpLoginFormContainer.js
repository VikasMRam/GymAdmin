/* eslint-disable camelcase */
import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string, object } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/web/services/validation';
import { withAuth } from 'sly/web/services/api';
import withNotification from 'sly/web/controllers/withNotification';
import OtpLoginForm from 'sly/common/services/auth/components/OtpLoginForm';

const formName = 'OtpLoginForm';

const validate = createValidator({
  email: [required, email],
  code: [required],
});

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate,
})(OtpLoginForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

const mapStateToProps = (state, props) => ({
  formState: state.form && state.form[props.form || formName] ? state.form[props.form || formName].values : {},
});

@withAuth
@withNotification
@connect(mapStateToProps, mapDispatchToProps)

export default class OtpLoginFormContainer extends Component {
  static propTypes = {
    resendOtpCode: func.isRequired,
    otpLoginUser: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    clearSubmitErrors: func,
    onSubmit: func,
    form: string,
    formState: object,
    sendOtpCode: func,
    setOtpTitle: func,
    phone_number: string,
  };


  state={
    error: null,
  }


  handleOtpClick=() => {
    const { sendOtpCode, notifyInfo, formState, clearSubmitErrors, setOtpTitle } = this.props;
    const { email } = formState;

    sendOtpCode({ email }).then(() => {
      notifyInfo(`A one time passcode has been sent to ${email}.`);
      setOtpTitle();
      clearSubmitErrors();
    }).catch((error) => {
      // TODO: Need to set a proper way to handle server side errors
      const errorMessage = Object.values(error.body.errors).join('. ');
      throw new SubmissionError({ _error: errorMessage });
    });
  }

  handleOnSubmit = (code) => {
    const { otpLoginUser, onSubmit, clearSubmitErrors, form, phone_number } = this.props;
    const payload = { otp: code, phone_number };

    clearSubmitErrors(form);
    return otpLoginUser(payload)
      .then(onSubmit)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          this.setState({ error: 'That code wasn’t valid. Please try again.' });
        } else {
          this.setState({ error: 'There was a problem submitting your code' });
        }

        return Promise.reject(error);
      });
  };

  resendCode = () => {
    const { resendOtpCode, notifyError, notifyInfo, phone_number } = this.props;
    const payload = { phone_number };


    return resendOtpCode(payload)
      .then(() => {
        notifyInfo('New code sent.');
      })
      .catch(() => {
        notifyError('Failed to resend code. Please try again.');
      });
  };

  render() {
    const { error } = this.state;

    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleOnSubmit}
        onResendCodeClick={this.resendCode}
        submitError={error}
        handleOtpClick={this.handleOtpClick}
      />
    );
  }
}
