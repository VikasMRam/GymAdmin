import React, { Component } from 'react';
import { func, string } from 'prop-types';

import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/constants/loginProviders';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import { connectController } from 'sly/controllers';

import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';

class JoinSlyButtonsController extends Component {
  static propTypes = {
    setQueryParams: func,
    onSubmitSuccess: func,
    onLoginClicked: func,
    onEmailSignupClicked: func,
    thirdpartyLogin: func,
    socialLoginError: string,
    onConnectSuccess: func,
    set: func,
    heading: string,
  };

  componentDidMount() {
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init();
        }
      });
    }
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

    window.FB.api('/me', { fields: 'name, email' }, (resp) => {
      // in case of fb accounts having unconfirmed emails api won't return it
      if (resp.email) {
        const data = {
          token: accessToken,
          provider: LOGIN_PROVIDER_FACEBOOK,
          name: resp.name,
          email: resp.email,
        };

        thirdpartyLogin(data).then(
          onConnectSuccess,
          () => this.setSocialLoginError('Failed to authorize with Facebook. Please try again.')
        );
      } else {
        this.setSocialLoginError('Failed to fetch required info from Facebook. Please try again.');
      }
    });
  }

  setSocialLoginError = (msg) => {
    const { set } = this.props;
    set({
      socialLoginError: msg,
    });
  };

  handleContinueWithFacebookClick = () => {
    this.setSocialLoginError('');
    if (window.FB) {
      window.FB.login((response) => {
        if (response.authResponse) {
          this.onFacebookConnected(response.authResponse);
        } else {
          this.setSocialLoginError('Failed to connect with Facebook. Please try again.');
        }
      }, { scope: 'email' });
    }
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
      onLoginClicked, onEmailSignupClicked, socialLoginError, heading,
    } = this.props;

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

const mapDispatchToProps = dispatch => ({
  thirdpartyLogin: data => dispatch(resourceCreateRequest('thirdpartyLogin', data)),
});

const mapStateToProps = (state, { controller, history, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  socialLoginError: controller.socialLoginError || '',
});

export default connectController(mapStateToProps, mapDispatchToProps)(JoinSlyButtonsController);
