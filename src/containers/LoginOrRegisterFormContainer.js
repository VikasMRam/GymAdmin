import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { createValidator, required, email } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';
import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/constants/loginProviders';
import loadFB from 'sly/services/helpers/facebookSDK';
import LoginOrRegisterForm from 'sly/components/organisms/LoginOrRegisterForm';

const validate = createValidator({
  emailOrPhone: [required], // todo: add email or phone validation
});

const formName = 'LoginOrRegisterForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
  destroyOnUnmount: false,
})(LoginOrRegisterForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

@withAuth
@connect(null, mapDispatchToProps)

export default class LoginOrRegisterFormContainer extends Component {
  static propTypes = {
    registerUser: func.isRequired,
    thirdPartyLogin: func.isRequired,
    onSocialSigninSuccess: func,
    clearSubmitErrors: func,
    onSubmitSuccess: func,
    onUserAlreadyExists: func,
    onLoginWithPasswordClick: func,
    form: string,
  };

  state = { socialLoginError: '' };

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
    const { thirdPartyLogin, onSocialSigninSuccess } = this.props;
    const r = resp.getAuthResponse();
    const p = resp.getBasicProfile();
    const data = {
      token: r.id_token,
      provider: LOGIN_PROVIDER_GOOGLE,
      name: p.getName(),
      email: p.getEmail(),
    };

    thirdPartyLogin(data)
      .then(
        onSocialSigninSuccess,
        () => this.setSocialLoginError('Failed to authorize with Google. Please try again.'),
      );
  };

  onFacebookProfileFetchSucess = (accessToken, { email, name }) => {
    const { thirdPartyLogin, onSocialSigninSuccess } = this.props;

    // in case of fb accounts having unconfirmed emails api won't return it
    if (email) {
      const data = {
        token: accessToken,
        provider: LOGIN_PROVIDER_FACEBOOK,
        name,
        email,
      };

      return thirdPartyLogin(data)
        .then(
          onSocialSigninSuccess,
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

  handleFacebookSigninClick = () => {
    this.setSocialLoginError('');

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

  handleGoogleSigninClick = () => {
    this.setSocialLoginError('');

    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn()
        .then(
          this.onGoogleConnected,
          () => this.setSocialLoginError('Failed to connect with Google. Please try again.'),
        );
    }
  };

  handleOnSubmit = ({ emailOrPhone }) => {
    const { registerUser, onSubmitSuccess, clearSubmitErrors, onUserAlreadyExists, form } = this.props;
    let payload = {};
    if (email(emailOrPhone)) {
      payload = {
        email: emailOrPhone,
      };
    } else {
      payload = {
        phone_number: emailOrPhone,
      };
    }

    clearSubmitErrors(form);
    return registerUser(payload)
      .then(onSubmitSuccess)
      .catch((error) => {
        if (error.status === 400) {
          return Promise.reject(new SubmissionError({ _error: 'Oops! That email/phone is not valid.' }));
        } else if (error.status === 409 && onUserAlreadyExists) {
          return onUserAlreadyExists();
        }

        return Promise.reject(error);
      });
  };

  render() {
    const { socialLoginError } = this.state;
    const { onLoginWithPasswordClick, ...props } = this.props;

    return (
      <ReduxForm
        {...props}
        onSubmit={this.handleOnSubmit}
        onFacebookSigninClick={this.handleFacebookSigninClick}
        onGoogleSigninClick={this.handleGoogleSigninClick}
        socialLoginError={socialLoginError}
        onLoginWithPasswordClick={onLoginWithPasswordClick}
      />
    );
  }
}
