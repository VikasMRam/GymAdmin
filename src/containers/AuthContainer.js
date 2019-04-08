import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsContainer from 'sly/containers/JoinSlyButtonsContainer';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';

import { withUser } from 'sly/services/newApi';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
  authenticateCancel: () => dispatch(authenticateCancel()),
  authenticateSuccess: user => dispatch(authenticateSuccess(user)),
});


@withUser()

@connect(mapStateToProps, mapDispatchToProps)

export default class AuthContainer extends Component {
  static propTypes = {
    status: object.isRequired,
    authenticated: object,
    authenticateCancel: func,
    authenticateSuccess: func,
    notifyInfo: func,
    showModal: func,
    hideModal: func,
  };

  state = { isOpen: false };

  componentDidUpdate() {
    const {
      authenticated, hideModal,
    } = this.props;

    const { isOpen } = this.state;

    // FIXME: declarative to imperative conversion could potentially be done better
    if (!isOpen && authenticated.loggingIn) {
      this.setState({ isOpen: true });
      this.gotoJoin();
    } else if (isOpen && !authenticated.loggingIn) {
      this.setState({ isOpen: false });
      hideModal();
    }
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
    const { authenticateSuccess, status } = this.props;
    return status.user.refetch().then(authenticateSuccess);
  };

  handleResetPasswordSuccess = (response) => {
    const { notifyInfo } = this.props;

    if (response.body) {
      notifyInfo(response.body.message);
    }

    this.gotoLogin();
  };

  render() {
    return null;
  }
}

