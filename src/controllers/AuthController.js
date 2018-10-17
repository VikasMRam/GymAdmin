import React, { Component, Fragment } from 'react';
import { object, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getSearchParams } from 'sly/services/helpers/search';

import { MODAL_TYPE_LOG_IN, MODAL_TYPE_SIGN_UP, MODAL_TYPE_JOIN_SLY, MODAL_TYPE_RESET_PASSWORD }
  from 'sly/constants/modalType';
import { getDetail } from 'sly/store/selectors';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';

import Modal from 'sly/components/molecules/Modal';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsContainer from 'sly/containers/JoinSlyButtonsContainer';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';
import ToastNotification from 'sly/components/molecules/ToastNotification';
import { connectController } from './index';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtonsContainer;
steps[MODAL_TYPE_LOG_IN] = LoginFormContainer;
steps[MODAL_TYPE_SIGN_UP] = SignupFormContainer;
steps[MODAL_TYPE_RESET_PASSWORD] = ResetPasswordFormContainer;

export class AuthController extends Component {
  static propTypes = {
    searchParams: object,
    user: object,
    setQueryParams: func,
    fetchUser: func,
    set: func,
    toastMessage: string,
  };

  setToastMessage = (toastMessage) => {
    const { set } = this.props;
    set({ toastMessage });
  }

  handleLoginClick = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_LOG_IN });
  }

  handleSignupClick = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_SIGN_UP });
  }

  gotoResetPassword = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_RESET_PASSWORD });
  }

  handleLoginSuccess = () => {
    const { setQueryParams, fetchUser } = this.props;
    fetchUser();
    setQueryParams({ modal: null });
  }

  handleSignupSuccess = () => {
    this.handleLoginClick();
  }

  render() {
    const {
      searchParams, setQueryParams, user, toastMessage,
    } = this.props;
    const currentStep = searchParams.modal;

    const StepComponent = steps[currentStep];
    if (!StepComponent || user) {
      return null;
    }

    const componentProps = {};
    componentProps.setToastMessage = this.setToastMessage;
    switch (currentStep) {
      case MODAL_TYPE_JOIN_SLY:
        componentProps.onLoginClicked = this.handleLoginClick;
        componentProps.onEmailSignupClicked = this.handleSignupClick;
        break;
      case MODAL_TYPE_LOG_IN:
        componentProps.onSubmitSuccess = this.handleLoginSuccess;
        componentProps.onSignupClicked = this.handleSignupClick;
        componentProps.onForgotPasswordClicked = this.gotoResetPassword;
        break;
      case MODAL_TYPE_SIGN_UP:
        componentProps.onSubmitSuccess = this.handleLoginClick;
        componentProps.onLoginClicked = this.handleLoginClick;
        break;
      case MODAL_TYPE_RESET_PASSWORD:
        componentProps.onSubmitSuccess = this.handleLoginClick;
        componentProps.onLoginClicked = this.handleLoginClick;
        break;
      default:
    }

    return (
      <Fragment>
        <Modal
          closeable
          isOpen={Object.keys(steps).includes(searchParams.modal)}
          onClose={() => setQueryParams({ modal: null })}
        >
          <StepComponent {...componentProps} />
        </Modal>
        <ToastNotification isOpen={toastMessage !== ''} onClose={() => this.setToastMessage('')}>{toastMessage}</ToastNotification>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, {
  controller, history, match, location,
}) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  user: getDetail(state, 'user', 'me'),
  searchParams: getSearchParams(match, location),
  toastMessage: controller.toastMessage || '',
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me')),
});

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(AuthController));
