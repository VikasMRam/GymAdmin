import React, { Component } from 'react';
import { func } from 'prop-types';

// todo: should go to common
import { withRedirectTo } from 'sly/web/services/redirectTo';
import AuthContainer from 'sly/common/services/auth/containers/AuthContainer';

@withRedirectTo

export default class LoginScreen extends Component {
  static propTypes = {
    redirectTo: func.isRequired,
  };

  handleAuthSuccess = () => {
    const { redirectTo } = this.props;

    return redirectTo('/dashboard');
  };

  render() {
    return (
      <AuthContainer
        type="inline"
        onAuthenticateSuccess={this.handleAuthSuccess}
      />
    );
  }
}
