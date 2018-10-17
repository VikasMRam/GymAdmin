import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
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
  };

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

  render() {
    const {
      searchParams, setQueryParams, user,
    } = this.props;
    const currentStep = searchParams.modal;

    const StepComponent = steps[currentStep];
    if (!StepComponent || user) {
      return null;
    }

    const componentProps = {};
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
      <Modal
        closeable
        isOpen={Object.keys(steps).includes(searchParams.modal)}
        onClose={() => setQueryParams({ modal: null })}
      >
        <StepComponent {...componentProps} />
      </Modal>
    );
  }
}

const mapStateToProps = (state, { history, match, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  user: getDetail(state, 'user', 'me'),
  searchParams: getSearchParams(match, location),
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me')),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthController));
