import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/web/services/validation';
import { withAuth } from 'sly/web/services/api';
import loadFB from 'sly/web/services/helpers/facebookSDK';
import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/common/constants/loginProviders';
import LoginForm from 'sly/common/services/auth/components/LoginForm';
import SlyEvent from 'sly/web/services/helpers/events';

const formName = 'LoginForm';

const validate = createValidator({
  email: [email, required],
  password: [required],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(LoginForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

@withAuth
@connect(null, mapDispatchToProps)

export default class LoginFormContainer extends Component {
  static propTypes = {
    resendOtpCode: func.isRequired,
    onSociaLoginSuccess: func.isRequired,
    thirdPartyLogin: func.isRequired,
    loginUser: func.isRequired,
    clearSubmitErrors: func,
    onSubmit: func,
    form: string,
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

  handleOnSubmit = ({ email, password }) => {
    const { loginUser, onSubmit, clearSubmitErrors, form } = this.props;
    const payload = { email, password };

    clearSubmitErrors(form);
    return loginUser(payload)
      .then(onSubmit)
      .catch((error) => {
        // TODO: Need to set a proper way to handle server side errors
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: 'Oops! That email / password combination is not valid.' }));
        }

        return Promise.reject(error);
      });
  };

  render() {
    const { socialLoginError } = this.state;
    return (
      <ReduxForm
        {...this.props}
        onGoogleLoginClick={this.handleGoogleLoginClick}
        onFacebookLoginClick={this.handleFacebookLoginClick}
        socialLoginError={socialLoginError}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
