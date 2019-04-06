import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsContainer from 'sly/containers/JoinSlyButtonsContainer';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';
import {
  MODAL_TYPE_LOG_IN,
  MODAL_TYPE_SIGN_UP,
  MODAL_TYPE_JOIN_SLY,
  MODAL_TYPE_RESET_PASSWORD,
} from 'sly/constants/authenticated';

import { withUser } from 'sly/services/newApi';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtonsContainer;
steps[MODAL_TYPE_LOG_IN] = LoginFormContainer;
steps[MODAL_TYPE_SIGN_UP] = SignupFormContainer;
steps[MODAL_TYPE_RESET_PASSWORD] = ResetPasswordFormContainer;

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

  static getDerivedStateFromProps({ authenticated }, state) {
    // FIXME: all this hack to convert declarative nature of react into imperative, has to be redone as it's error prone
    if (authenticated.loggingIn) {
      if (!state.currentStep) {
        return { currentStep: MODAL_TYPE_JOIN_SLY, isOpen: false };
      }
    } else {
      return { currentStep: null, isOpen: false };
    }
    return null;
  }

  state = { currentStep: null, isOpen: false };

  componentDidUpdate() {
    const {
      authenticated, authenticateCancel, showModal, hideModal,
    } = this.props;

    const { currentStep, isOpen } = this.state;

    const StepComponent = steps[currentStep];

    const componentProps = {};
    switch (currentStep) {
      case MODAL_TYPE_JOIN_SLY:
        componentProps.onLoginClicked = this.gotoLogin;
        componentProps.onEmailSignupClicked = this.gotoSignup;
        componentProps.onConnectSuccess = this.handleLoginSuccess;
        componentProps.heading = authenticated.reason;
        break;
      case MODAL_TYPE_LOG_IN:
        componentProps.onSubmitSuccess = this.handleLoginSuccess;
        componentProps.onSignupClicked = this.gotoJoin;
        componentProps.onForgotPasswordClicked = this.gotoResetPassword;
        break;
      case MODAL_TYPE_SIGN_UP:
        componentProps.onSubmitSuccess = this.handleLoginSuccess;
        componentProps.onLoginClicked = this.gotoLogin;
        break;
      case MODAL_TYPE_RESET_PASSWORD:
        componentProps.onSubmitSuccess = this.handleResetPasswordSuccess;
        componentProps.onLoginClicked = this.gotoLogin;
        break;
      default:
    }

    // FIXME: read above hack
    if (!isOpen && StepComponent) {
      this.setState({ isOpen: true });
      showModal(<StepComponent {...componentProps} />, authenticateCancel);
    } else if (isOpen && !StepComponent) {
      this.setState({ isOpen: false });
      hideModal();
    }
  }

  gotoJoin = () => this.setState({ currentStep: MODAL_TYPE_JOIN_SLY });
  gotoLogin = () => this.setState({ currentStep: MODAL_TYPE_LOG_IN });
  gotoSignup = () => this.setState({ currentStep: MODAL_TYPE_SIGN_UP });
  gotoResetPassword = () => this.setState({ currentStep: MODAL_TYPE_RESET_PASSWORD });

  handleLoginSuccess = () => {
    const { authenticateSuccess, status } = this.props;
    return status.user.refetch().then(authenticateSuccess);
  };

  handleResetPasswordSuccess = (json) => {
    const { notifyInfo } = this.props;

    if (json) {
      notifyInfo(json.message);
    }
    this.gotoLogin();
  };

  render() {
    return <div>holaaa</div>;
  }
}

