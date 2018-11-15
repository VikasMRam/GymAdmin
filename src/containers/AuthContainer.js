import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSearchParams } from 'sly/services/helpers/search';

import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getDetail } from 'sly/store/selectors';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
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
    searchParams: object,
    user: object,
    authenticateCancel: func,
    authenticateSuccess: func,
    setQueryParams: func,
    fetchUser: func,
    history: object,
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

  gotoLogin = () => this.setState({ currentStep: MODAL_TYPE_LOG_IN });
  gotoSignup = () => this.setState({ currentStep: MODAL_TYPE_SIGN_UP });
  gotoResetPassword = () => this.setState({ currentStep: MODAL_TYPE_RESET_PASSWORD });

  handleLoginSuccess = () => {
    const {
      authenticateSuccess, fetchUser, searchParams, history,
    } = this.props;
    const { redirectTo } = searchParams;
    fetchUser().then((user) => {
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        authenticateSuccess(user);
      }
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
    const {
      searchParams,
      authenticateCancel,
    } = this.props;

    const { currentStep } = this.state;

    if (!currentStep) {
      return null;
    }

    const StepComponent = steps[currentStep];
    let heading;
    if (searchParams.redirectTo && (searchParams.redirectTo.indexOf(ACTIONS_ADD_TO_FAVOURITE) > -1 ||
      searchParams.redirectTo.indexOf(ACTIONS_REMOVE_FROM_FAVOURITE) > -1)) {
      heading = 'Sign up to add to your favorites list';
    }

    const componentProps = {};
    switch (currentStep) {
      case MODAL_TYPE_JOIN_SLY:
        componentProps.onLoginClicked = this.gotoLogin;
        componentProps.onEmailSignupClicked = this.gotoSignup;
        componentProps.onConnectSuccess = this.handleLoginSuccess;
        componentProps.heading = heading;
        break;
      case MODAL_TYPE_LOG_IN:
        componentProps.onSubmitSuccess = this.handleLoginSuccess;
        componentProps.onSignupClicked = this.gotoSignup;
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

const mapStateToProps = (state, {
  history, match, location,
}) => ({
  authenticated: state.authenticated,
  setQueryParams: getQueryParamsSetter(history, location),
  user: getDetail(state, 'user', 'me'),
  searchParams: getSearchParams(match, location),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me')),
  authenticateCancel: () => dispatch(authenticateCancel()),
  authenticateSuccess: user => dispatch(authenticateSuccess(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));
