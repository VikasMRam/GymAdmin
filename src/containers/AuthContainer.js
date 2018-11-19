import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getDetail } from 'sly/store/selectors';
import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';

import Modal from 'sly/components/molecules/Modal';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsController from 'sly/controllers/JoinSlyButtonsController';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';

import {
  MODAL_TYPE_LOG_IN,
  MODAL_TYPE_SIGN_UP,
  MODAL_TYPE_JOIN_SLY,
  MODAL_TYPE_RESET_PASSWORD,
} from 'sly/constants/authenticated';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtonsController;
steps[MODAL_TYPE_LOG_IN] = LoginFormContainer;
steps[MODAL_TYPE_SIGN_UP] = SignupFormContainer;
steps[MODAL_TYPE_RESET_PASSWORD] = ResetPasswordFormContainer;

class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    user: object,
    authenticateCancel: func,
    authenticateSuccess: func,
    fetchUser: func,
    notifyInfo: func,
  };

  static getDerivedStateFromProps({ authenticated }, state) {
    if (authenticated.loggingIn) {
      if (!state.currentStep) {
        return { currentStep: MODAL_TYPE_JOIN_SLY };
      }
    } else {
      return { currentStep: null };
    }
    return null;
  }

  state = { currentStep: null };

  gotoJoin = () => this.setState({ currentStep: MODAL_TYPE_JOIN_SLY });
  gotoLogin = () => this.setState({ currentStep: MODAL_TYPE_LOG_IN });
  gotoSignup = () => this.setState({ currentStep: MODAL_TYPE_SIGN_UP });
  gotoResetPassword = () => this.setState({ currentStep: MODAL_TYPE_RESET_PASSWORD });

  handleLoginSuccess = () => {
    const { authenticateSuccess, fetchUser } = this.props;
    fetchUser().then((user) => {
      authenticateSuccess(user);
    });
  };

  handleResetPasswordSuccess = (json) => {
    const { notifyInfo } = this.props;

    if (json) {
      notifyInfo(json.message);
    }
    this.gotoLogin();
  };

  render() {
    const { authenticated, authenticateCancel } = this.props;
    const { currentStep } = this.state;

    if (!currentStep) {
      return null;
    }

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

    return (
      <Modal
        closeable
        isOpen
        onClose={authenticateCancel}
      >
        <StepComponent {...componentProps} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user: getDetail(state, 'user', 'me'),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me')),
  authenticateCancel: () => dispatch(authenticateCancel()),
  authenticateSuccess: user => dispatch(authenticateSuccess(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));
