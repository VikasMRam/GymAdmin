import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { connect } from 'react-redux';

import { LOGIN_PROVIDER_GOOGLE, LOGIN_PROVIDER_FACEBOOK } from 'sly/constants/loginProviders';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';

class JoinSlyButtonsContainer extends Component {
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
  }

  onGoogleConnected = (resp, setSocialLoginError) => {
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
      () => setSocialLoginError('Failed to authorize with Google. Please try again.')
    );
  };

  onFacebookConnected = (resp, setSocialLoginError) => {
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
          () => setSocialLoginError('Failed to authorize with Facebook. Please try again.')
        );
      } else {
        setSocialLoginError('Failed to fetch required info from Facebook. Please try again.');
      }
    });
  };

  setSocialLoginError = (msg) => {
    this.setState({
      socialLoginError: msg,
    });
  };

  handleContinueWithFacebookClick = (setSocialLoginError) => {
    setSocialLoginError('');
    if (window.FB) {
      window.FB.login((response) => {
        if (response.authResponse) {
          this.onFacebookConnected(response.authResponse, setSocialLoginError);
        } else {
          setSocialLoginError('Failed to connect with Facebook. Please try again.');
        }
      }, { scope: 'email' });
    }
  };

  handleContinueWithGoogleClick = (setSocialLoginError) => {
    setSocialLoginError('');
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then(
        resp => this.onGoogleConnected(resp, setSocialLoginError),
        () => setSocialLoginError('Failed to connect with Google. Please try again.')
      );
    }
  };

  render() {
    const {
      onLoginClicked, onEmailSignupClicked, heading,
    } = this.props;
    const { socialLoginError } = this.state;
    const {
      handleContinueWithFacebookClick, handleContinueWithGoogleClick,
      setSocialLoginError,
    } = this;

    return (
      <JoinSlyButtons
        onContinueWithFacebookClicked={() => handleContinueWithFacebookClick(setSocialLoginError)}
        onContinueWithGoogleClicked={() => handleContinueWithGoogleClick(setSocialLoginError)}
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

const mapStateToProps = (state, { history, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinSlyButtonsContainer);
