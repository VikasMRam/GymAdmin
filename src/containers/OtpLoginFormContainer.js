import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string, object } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';
import withNotification from 'sly/controllers/withNotification';
import OtpLoginForm from 'sly/components/organisms/OtpLoginForm';

const formName = 'OtpLoginForm';

const validate = createValidator({
  code: [required],
});

const ReduxForm = reduxForm({
  form: formName,
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
    onSubmitSuccess: func,
    form: string,
    formState: object,
  };

  handleOnSubmit = ({ emailOrPhone, code }) => {
    const { otpLoginUser, onSubmitSuccess, clearSubmitErrors, form } = this.props;
    const payload = { email: emailOrPhone, otp: code };

    clearSubmitErrors(form);
    return otpLoginUser(payload)
      .then(onSubmitSuccess)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: 'Invalid code. Please try again.' }));
        }

        return Promise.reject(error);
      });
  };

  resendCode = () => {
    const { formState, resendOtpCode, notifyError, notifyInfo } = this.props;
    const { emailOrPhone } = formState;
    const payload = { email: emailOrPhone };

    return resendOtpCode(payload)
      .then(() => {
        notifyInfo(`Code resent to ${emailOrPhone}`);
      })
      .catch(() => {
        notifyError('Failed to resend code. Please try again.');
      });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleOnSubmit}
        onResendCodeClick={this.resendCode}
      />
    );
  }
}
