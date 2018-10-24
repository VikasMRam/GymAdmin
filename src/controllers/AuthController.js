import React, { Component, Fragment } from 'react';
import { object, func, string } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getSearchParams } from 'sly/services/helpers/search';

import { MODAL_TYPE_LOG_IN, MODAL_TYPE_SIGN_UP, MODAL_TYPE_JOIN_SLY, MODAL_TYPE_RESET_PASSWORD }
  from 'sly/constants/modalType';
import { ACTIONS_ADD_TO_FAVOURITE, ACTIONS_REMOVE_FROM_FAVOURITE } from 'sly/constants/actions';
import { getDetail } from 'sly/store/selectors';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { connectController } from 'sly/controllers';

import Modal from 'sly/components/molecules/Modal';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsController from 'sly/controllers/JoinSlyButtonsController';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';
import ToastNotification from 'sly/components/molecules/ToastNotification';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtonsController;
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
    history: object,
  };

  setToastMessage = (toastMessage) => {
    const { set } = this.props;
    set({ toastMessage });
  }

  gotoLogin = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_LOG_IN });
  }

  gotoSignup = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_SIGN_UP });
  }

  gotoResetPassword = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: MODAL_TYPE_RESET_PASSWORD });
  }

  handleLoginSuccess = () => {
    const {
      setQueryParams, fetchUser, searchParams, history,
    } = this.props;
    const { redirectTo } = searchParams;
    fetchUser().then(() => {
      if (redirectTo) {
        history.push(redirectTo);
      } else {
        setQueryParams({ modal: null });
      }
    });
  }

  handleResetPasswordSuccess = (json) => {
    if (json) {
      this.setToastMessage(json.message);
    }
    this.gotoLogin();
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
      <Fragment>
        <Modal
          closeable
          isOpen={Object.keys(steps).includes(searchParams.modal)}
          onClose={() => setQueryParams({ modal: null })}
        >
          <StepComponent {...componentProps} />
        </Modal>
        <ToastNotification
          isOpen={toastMessage !== ''}
          onClose={() => this.setToastMessage('')}
        >
          {toastMessage}
        </ToastNotification>
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
