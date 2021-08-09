import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors, untouch } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool, object, string } from 'prop-types';
import * as immutable from 'object-path-immutable';

import loadFB from 'sly/web/services/helpers/facebookSDK';
import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/common/constants/loginProviders';
import { withAuth, query, prefetch } from 'sly/web/services/api';
import withNotification from 'sly/web/components/helpers/notification';
import { createValidator, required, email, usPhone, minLength } from 'sly/web/services/validation';
import SignupForm from 'sly/common/services/auth/components/SignupForm';
import SlyEvent from 'sly/web/services/helpers/events';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  email: [required, email],
  phone_number: [required, usPhone],
  password: [required, minLength(8)],
});

const ReduxForm = reduxForm({
  form: 'SignupForm',
  validate,
  destroyOnUnmount: false,
})(SignupForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('SignupForm'),
  untouch: (form = 'SignupForm', field) => untouch(form, field),
};

@withNotification
@withAuth
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@connect(null, mapDispatchToProps)
@query('updateUuidAux', 'updateUuidAux')

export default class SignupFormContainer extends Component {
  static propTypes = {
    registerUser: func,
    thirdPartyLogin: func.isRequired,
    onSocialSignupSuccess: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmit: func,
    status: object,
    updateUuidAux: func,
    handleExistingAccount: func,
    form: string,
    untouch: func,
    notifyError: func,
  };

  state = { socialSignupError: '' };

  sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
    category: 'third-party-signup',
    action,
    label,
    value,
  });

  componentDidMount() {
    const { untouch, form } = this.props;
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init();
        }
      });
    }
    this.getFB();

    // Since this field is touched in the login form we need to untouch so there's no error
    untouch(form, 'email');
  }

  onGoogleConnected = (resp) => {
    const { thirdPartyLogin, onSocialSignupSuccess } = this.props;
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
        onSocialSignupSuccess,
        () => this.setSocialSignupError('Failed to authorize with Google. Please try again.'),
      );
  };

  onFacebookProfileFetchSucess = (accessToken, { email, name }) => {
    const { thirdPartyLogin, onSocialSignupSuccess } = this.props;

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
          onSocialSignupSuccess,
          () => this.setSocialSignupError('Failed to authorize with Facebook. Please try again.'),
        );
    }
    this.sendEvent('auth_fail', 'facebook', null);
    return this.setSocialSignupError('Failed to fetch required info from Facebook. Please try again.');
  };

  onFacebookConnected = ({ accessToken }) => {
    this.getFB()
      .then(FB =>
        FB.api('/me', { fields: 'name, email' },
          resp => this.onFacebookProfileFetchSucess(accessToken, resp)),
      );
  };

  getFB = () => loadFB()
    .catch(() => this.setSocialSignupError("Can't load FB SDK"));

  setSocialSignupError = msg =>
    this.setState({
      socialSignupError: msg,
    });

  handleFacebookSignUpClick = () => {
    this.setSocialSignupError('');
    this.sendEvent('click', 'facebook', null);
    this.getFB()
      .then(FB =>
        FB.login((response) => {
          if (response.authResponse) {
            this.onFacebookConnected(response.authResponse);
          } else {
            this.setSocialSignupError('Failed to connect with Facebook. Please try again.');
          }
        }, { scope: 'email' }),
      );
  };

  handleGoogleSignUpClick = () => {
    this.setSocialSignupError('');
    this.sendEvent('click', 'google', null);
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn()
        .then(
          this.onGoogleConnected,
          () => this.setSocialSignupError('Failed to connect with Google. Please try again.'),
        );
    }
  };

  updatePhoneContactPreference = (phonePreference) => {
    const { updateUuidAux, status } = this.props;
    if (phonePreference) {
      const { uuidAux: { result: rawUuidAux } } =  status;
      const sendUuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.contactInfo.phonePreference', phonePreference);
      return updateUuidAux({ id: sendUuidAux.id }, sendUuidAux);
    }
    return Promise.resolve();
  };

  handleSubmit = ({ phonePreference, email, ...data }) => {
    const { registerUser, clearSubmitErrors, onSubmit, handleExistingAccount, notifyError } = this.props;
    data = { ...data, email: email.trim(), name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };

    clearSubmitErrors();
    return Promise.all([registerUser(data), this.updatePhoneContactPreference(phonePreference)])
      .then(() => onSubmit(data))
      .catch((data) => {
        if (data.status === 409) {
          notifyError('An account already exists, please log in to continue');
          handleExistingAccount();
        } else {
          const errors = data?.body?.errors;
          if (typeof errors === 'undefined') {
            console.error(data);
            throw data;
          }
          const errorMessage = Object.values(errors).join('. ');
          throw new SubmissionError({ _error: errorMessage });
        }
      });
  };

  render() {
    const { socialSignupError } = this.state;
    return (
      <ReduxForm
        {...this.props}
        onFacebookSignUpClick={this.handleFacebookSignUpClick}
        onGoogleSignUpClick={this.handleGoogleSignUpClick}
        socialSignupError={socialSignupError}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
