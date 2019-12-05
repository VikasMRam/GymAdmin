import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsContainer from 'sly/containers/JoinSlyButtonsContainer';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';
import { withAuth } from 'sly/services/newApi';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withRouter
@withAuth
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func,
    authenticateSuccess: func,
    notifyInfo: func,
    showModal: func,
    hideModal: func,
    children: func,
  };

  state = { isOpen: false };

  componentDidMount() {
    this.shouldAuth();
  }

  componentDidUpdate() {
    this.shouldAuth();
  }

  shouldAuth() {
    const {
      authenticated,
      hideModal,
    } = this.props;

    // FIXME: declarative to imperative conversion could potentially be done better
    if (!this.state.isOpen && authenticated.loggingIn) {
      this.setState({ isOpen: true }, () => this.gotoLogin());
    } else if (this.state.isOpen && !authenticated.loggingIn) {
      this.setState({ isOpen: false }, () => hideModal());
    }

    return null;
  }

  gotoJoin = () => {
    const {
      authenticated, authenticateCancel, showModal,
    } = this.props;

    const props = {
      onLoginClicked: this.gotoLogin,
      onEmailSignupClicked: this.gotoSignup,
      onConnectSuccess: this.handleLoginSuccess,
      heading: authenticated.reason,
    };

    showModal(<JoinSlyButtonsContainer {...props} />, authenticateCancel);
  };

  gotoLogin = () => {
    const {
      authenticateCancel, showModal,
    } = this.props;

    const props = {
      onSubmitSuccess: this.handleLoginSuccess,
      onSignupClicked: this.gotoJoin,
      onForgotPasswordClicked: this.gotoResetPassword,
    };

    showModal(<LoginFormContainer {...props} />, authenticateCancel);
  };

  gotoSignup = () => {
    const {
      authenticateCancel, showModal,
    } = this.props;

    const props = {
      onSubmitSuccess: this.handleLoginSuccess,
      onLoginClicked: this.gotoLogin,
    };

    showModal(<SignupFormContainer {...props} />, authenticateCancel);
  };

  gotoResetPassword = () => {
    const {
      authenticateCancel, showModal,
    } = this.props;


    const props = {
      onSubmitSuccess: this.handleResetPasswordSuccess,
      onLoginClicked: this.gotoLogin,
    };

    showModal(<ResetPasswordFormContainer {...props} />, authenticateCancel);
  };

  handleLoginSuccess = () => {
    const { authenticateSuccess } = this.props;
    return authenticateSuccess();
  };

  handleResetPasswordSuccess = (response) => {
    const { notifyInfo } = this.props;

    if (response && response.body) {
      notifyInfo(response.body.message);
      this.gotoLogin();
    }
  };

  render() {
    const { children } = this.props;
    if (typeof children === 'function') {
      return children(this);
    }
    return null;
  }
}

