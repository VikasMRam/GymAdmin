import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getSearchParams } from 'sly/services/helpers/search';
import { MODAL_TYPE_LOG_IN, MODAL_TYPE_SIGN_UP, MODAL_TYPE_JOIN_SLY }
  from 'sly/constants/modalType';
import { getDetail } from 'sly/store/selectors';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';
import Modal from 'sly/components/molecules/Modal';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtons;
steps[MODAL_TYPE_LOG_IN] = LoginFormContainer;
steps[MODAL_TYPE_SIGN_UP] = SignupFormContainer;
const modalTypes = {
  landing: MODAL_TYPE_JOIN_SLY,
  login: MODAL_TYPE_LOG_IN,
  signup: MODAL_TYPE_SIGN_UP,
};

export class AuthController extends Component {
  static propTypes = {
    searchParams: object,
    user: object,
    setQueryParams: func,
  };

  handleLoginClick = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: modalTypes.login });
  }

  handleSignupClick = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: modalTypes.signup });
  }

  handleLoginSubmit = () => {

  }

  handleSignupSuccess = () => {
    this.handleLoginClick();
  }

  handleContinueWithFacebookClick = () => {
    if (window.FB) {
      window.FB.login((response) => {
        console.log(response);
      }, { scope: 'public_profile,email' });
    }
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
      case modalTypes.landing:
        componentProps.onLoginClicked = this.handleLoginClick;
        componentProps.onEmailSignupClicked = this.handleSignupClick;
        componentProps.onContinueWithFacebookClicked = this.handleContinueWithFacebookClick;
        break;
      case modalTypes.login:
        componentProps.submit = this.handleLoginSubmit;
        componentProps.onSignupClicked = this.handleSignupClick;
        break;
      case modalTypes.signup:
        componentProps.onSubmitSuccess = this.handleSignupSuccess;
        componentProps.onLoginClicked = this.handleLoginClick;
        break;
      default:
    }

    return (
      <Modal
        closeable
        isOpen={Object.values(modalTypes).includes(searchParams.modal)}
        onClose={() => setQueryParams({ modal: null })}
      >
        <StepComponent {...componentProps} />
      </Modal>
    );
  }
}

const mapStateToProps = (state, { match, history, location }) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  user: getDetail(state, 'user', 'me'),
  searchParams: getSearchParams(match, location),
});

export default withRouter(connect(mapStateToProps)(AuthController));
