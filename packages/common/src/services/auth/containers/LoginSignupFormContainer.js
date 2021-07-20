/* eslint-disable camelcase */
import React, { Component } from 'react';
import { reduxForm, clearSubmitErrors, SubmissionError, change, registerField } from 'redux-form';
import { func, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter  } from 'react-router';

import { createValidator, required, isEmailOrPhone, email as isEmail } from 'sly/web/services/validation';
import { withAuth } from 'sly/web/services/api';
import loadFB from 'sly/web/services/helpers/facebookSDK';
import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/common/constants/loginProviders';
import LoginSignupForm from 'sly/common/services/auth/components/LoginSignupForm';
import SlyEvent from 'sly/web/services/helpers/events';

const formName = 'LoginSignupForm';

const validate = createValidator({
  email: [isEmailOrPhone, required],
  password: [required],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(LoginSignupForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
  change: (form = formName, field, value) => change(form, field, value),
  registerField: (form = formName, field) => registerField(form, field, 'Field'),
};

@withRouter
@withAuth
@connect(null, mapDispatchToProps)

export default class LoginSignupFormContainer extends Component {
  static propTypes = {
    resendOtpCode: func.isRequired,
    onSociaLoginSuccess: func.isRequired,
    thirdPartyLogin: func.isRequired,
    loginUser: func.isRequired,
    clearSubmitErrors: func,
    change: func,
    onEmailNoPassSubmit: func,
    onPhoneNoPassSubmit: func,
    onLoginPassSubmit: func,
    form: string,
    magicLink: func.isRequired,
    onGoToSignUp: func.isRequired,
    clearAsyncError: func,
    registerField: func,
    sendOtpCode: func,
    location: object,
    redirect_to: string,
    authStart: func,
  };

  state = { socialLoginError: '' };

  sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
    category: 'third-party-login',
    action,
    label,
    value,
  });

  componentDidMount() {
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init();
        }
      });
    }
    this.getFB();
  }

  onGoogleConnected = (resp) => {
    const { thirdPartyLogin, onSociaLoginSuccess } = this.props;
    const r = resp.getAuthResponse();
    const p = resp.getBasicProfile();
    const data = {
      token: r.id_token,
      provider: LOGIN_PROVIDER_GOOGLE,
      name: p.getName(),
      email: p.getEmail(),
    };

    this.sendEvent('auth_sucess', 'google', data.name);
    thirdPartyLogin(data)
      .then(
        onSociaLoginSuccess,
        () => this.setSocialLoginError('Failed to authorize with Google. Please try again.'),
      );
  };

  onFacebookProfileFetchSucess = (accessToken, { email, name }) => {
    const { thirdPartyLogin, onSociaLoginSuccess } = this.props;

    // in case of fb accounts having unconfirmed emails api won't return it
    if (email) {
      const data = {
        token: accessToken,
        provider: LOGIN_PROVIDER_FACEBOOK,
        name,
        email,
      };
      this.sendEvent('auth_sucess', 'facebook', data.name);
      return thirdPartyLogin(data)
        .then(
          onSociaLoginSuccess,
          () => this.setSocialLoginError('Failed to authorize with Facebook. Please try again.'),
        );
    }

    return this.setSocialLoginError('Failed to fetch required info from Facebook. Please try again.');
  };

  onFacebookConnected = ({ accessToken }) => {
    this.getFB()
      .then(FB =>
        FB.api('/me', { fields: 'name, email' },
          resp => this.onFacebookProfileFetchSucess(accessToken, resp)),
      );
  };

  getFB = () => loadFB()
    .catch(() => this.setSocialLoginError("Can't load FB SDK"));

  setSocialLoginError = msg =>
    this.setState({
      socialLoginError: msg,
    });

  handleFacebookLoginClick = () => {
    this.setSocialLoginError('');
    this.sendEvent('click', 'facebook', null);
    this.getFB()
      .then(FB =>
        FB.login((response) => {
          if (response.authResponse) {
            this.onFacebookConnected(response.authResponse);
          } else {
            this.setSocialLoginError('Failed to connect with Facebook. Please try again.');
          }
        }, { scope: 'email' }),
      );
  };

  handleGoogleLoginClick = () => {
    this.setSocialLoginError('');
    this.sendEvent('click', 'google', null);
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn()
        .then(
          this.onGoogleConnected,
          () => this.setSocialLoginError('Failed to connect with Google. Please try again.'),
        );
    }
  };

  handleOnSubmit = ({ email }) => {
    const { magicLink, onEmailNoPassSubmit, onLoginPassSubmit, onPhoneNoPassSubmit, registerField, clearSubmitErrors, form, onGoToSignUp, change, sendOtpCode, location, redirect_to, authStart } = this.props;
    const payload = {};

    let onSubmit;
    let submitMethod;
    // Conditionally sets payload for login and onSubmit Function
    if (!isEmail(email)) {
      // If there's a redirect we want to keep it else we'll just have the magic link go to where the user is currently
      payload.redirect_to = location.pathname;
      if (redirect_to && redirect_to !== 'undefined') {
        payload.redirect_to = redirect_to;
      }

      payload.email = email;
      onSubmit = onEmailNoPassSubmit;
      submitMethod = magicLink;
    } else {
      payload.phone_number = email;
      onSubmit = onPhoneNoPassSubmit;
      submitMethod = sendOtpCode;
    }

    clearSubmitErrors(form);
    return authStart(payload)
      .then(({ body }) => {
        const { passwordExists } = body;
        registerField(form, 'passwordExists');
        change(form, 'passwordExists', passwordExists);
        if (!passwordExists) {
          submitMethod(payload)
            .then(onSubmit)
            .then(() => {

            }).catch((err) => {
              console.log(err);
              return Promise.reject(new SubmissionError({ _error: 'Oops! Something went wrong. Please try again' }));
            });
        } else {
          onLoginPassSubmit();
        }
        // We need to set the form phone nubmer for signup or otp since the field the user entered in was email
        if (payload.phone_number) {
          registerField(form, 'phone_number');
          change(form, 'email', '');
          change(form, 'phone_number', payload.phone_number);
        }
      })
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          onGoToSignUp();


          // We need to set the form phone nubmer for signup or otp since the field the user entered in was email
          if (payload.phone_number) {
            registerField(form, 'phone_number');
            change(form, 'email', '');
            change(form, 'phone_number', payload.phone_number);
          }
          return true;
        }
        return Promise.reject(new SubmissionError({ _error: 'Oops! Something went wrong. Please try again' }));
      });
  };

  render() {
    const { socialLoginError } = this.state;
    const { onGoToSignUp } = this.props;
    return (
      <ReduxForm
        {...this.props}
        onGoToSignUp={onGoToSignUp}
        onGoogleLoginClick={this.handleGoogleLoginClick}
        onFacebookLoginClick={this.handleFacebookLoginClick}
        socialLoginError={socialLoginError}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
