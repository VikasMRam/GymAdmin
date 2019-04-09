import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/constants/loginProviders';
import loadFB from 'sly/services/helpers/facebookSDK';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';
import { withAuth } from 'sly/services/newApi';


const mapStateToProps = (state, { history, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
});

@withAuth

@connect(mapStateToProps)

export default class JoinSlyButtonsContainer extends Component {
  static propTypes = {
    setQueryParams: func,
    onSubmitSuccess: func,
    onLoginClicked: func,
    onEmailSignupClicked: func,
    thirdpartyLogin: func,
    onConnectSuccess: func,
    heading: string,
    children: func,
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
    this.getFB().then(() => {
      // do nothing
      console.log('FB loaded');
    });
  }

  onGoogleConnected = (resp) => {
    const { thirdpartyLogin, onConnectSuccess } = this.props;
    const r = resp.getAuthResponse();
    const p = resp.getBasicProfile();
    const data = {
      token: r.id_token,
      provider: LOGIN_PROVIDER_GOOGLE,
      name: p.getName(),
      email: p.getEmail(),
    };

    thirdpartyLogin(data).then(
      onConnectSuccess,
      () => this.setSocialLoginError('Failed to authorize with Google. Please try again.')
    );
  };

  onFacebookConnected = (resp) => {
    const { thirdpartyLogin, onConnectSuccess } = this.props;
    const { accessToken } = resp;

    this.getFB().then((FB) => {
      FB.api('/me', { fields: 'name, email' }, (resp) => {
        // in case of fb accounts having unconfirmed emails api won't return it
        if (resp.email) {
          const data = {
            token: accessToken,
            provider: LOGIN_PROVIDER_FACEBOOK,
            name: resp.name,
            email: resp.email,
          };

          thirdpartyLogin(data)
            .then(
              onConnectSuccess,
              () => this.setSocialLoginError('Failed to authorize with Facebook. Please try again.')
            );
        } else {
          this.setSocialLoginError('Failed to fetch required info from Facebook. Please try again.');
        }
      });
    });
  };

  getFB = () => loadFB().catch(() => {
    this.setSocialLoginError('Can\'t load FB SDK');
  });

  setSocialLoginError = (msg) => {
    this.setState({
      socialLoginError: msg,
    });
  };

  handleContinueWithFacebookClick = () => {
    this.setSocialLoginError('');
    this.getFB().then((FB) => {
      FB.login((response) => {
        if (response.authResponse) {
          this.onFacebookConnected(response.authResponse, this.setSocialLoginError);
        } else {
          this.setSocialLoginError('Failed to connect with Facebook. Please try again.');
        }
      }, { scope: 'email' });
    });
  };

  handleContinueWithGoogleClick = () => {
    this.setSocialLoginError('');
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then(
        this.onGoogleConnected,
        () => this.setSocialLoginError('Failed to connect with Google. Please try again.')
      );
    }
  };

  render() {
    const {
      onLoginClicked, onEmailSignupClicked, heading,
    } = this.props;

    const { socialLoginError } = this.state;

    return (
      <JoinSlyButtons
        onContinueWithFacebookClicked={this.handleContinueWithFacebookClick}
        onContinueWithGoogleClicked={this.handleContinueWithGoogleClick}
        onLoginClicked={onLoginClicked}
        onEmailSignupClicked={onEmailSignupClicked}
        socialLoginError={socialLoginError}
        heading={heading}
      />
    );
  }
}
