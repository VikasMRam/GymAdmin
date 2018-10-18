import React, { Component } from 'react';
import { func, string } from 'prop-types';

import { LOGIN_PROVIDER_GOOGLE } from 'sly/constants/loginProviders';
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
  }

  setSocialLoginError = (msg) => {
    const { set } = this.props;
    set({
      socialLoginError: msg,
    });
  }

  handleContinueWithFacebookClick = () => {
    this.setSocialLoginError('');
    if (window.FB) {
      window.FB.login((response) => {
        console.log(response);
      }, { scope: 'public_profile,email' });
    }
  }

  handleContinueWithGoogleClick = () => {
    this.setSocialLoginError('');
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then(
        this.onGoogleConnected,
        () => this.setSocialLoginError('Failed to connect with Google. Please try again.')
      );
    }
  }

  render() {
    const { onLoginClicked, onEmailSignupClicked, socialLoginError } = this.props;

    return (
      <JoinSlyButtons
        onContinueWithFacebookClicked={this.handleContinueWithFacebookClick}
        onContinueWithGoogleClicked={this.handleContinueWithGoogleClick}
        onLoginClicked={onLoginClicked}
        onEmailSignupClicked={onEmailSignupClicked}
        socialLoginError={socialLoginError}
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
