import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { isBrowser } from 'sly/config';

import { setModal } from 'sly/services/helpers/url';
import { getSearchParams } from 'sly/services/helpers/search';
import { MODAL_TYPE_LOG_IN, MODAL_TYPE_SIGN_UP, MODAL_TYPE_JOIN_SLY }
  from 'sly/constants/modalType';

import JoinSlyButtons from 'sly/components/molecules/JoinSlyButtons';
import Modal from 'sly/components/molecules/Modal';
import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';

const steps = {};
steps[MODAL_TYPE_JOIN_SLY] = JoinSlyButtons;
steps[MODAL_TYPE_LOG_IN] = LoginFormContainer;
steps[MODAL_TYPE_SIGN_UP] = SignupFormContainer;
const defaultStep = MODAL_TYPE_JOIN_SLY;
const modalTypes = {
  landing: MODAL_TYPE_JOIN_SLY,
  login: MODAL_TYPE_LOG_IN,
  signup: MODAL_TYPE_SIGN_UP,
};
const appElement = isBrowser && document.querySelector('#app');

export class AuthController extends Component {
  static propTypes = {
    searchParams: object,
    history: object,
    location: object,
  };

  handleLoginClick = () => {
    const { history, location } = this.props;

    setModal(history, location, modalTypes.login);
  }

  handleSignupClick = () => {
    const { history, location } = this.props;

    setModal(history, location, modalTypes.signup);
  }

  handleLoginSubmit = () => {

  }

  handleSignupSubmit = () => {

  }

  render() {
    const { searchParams, history, location } = this.props;
    const currentStep = searchParams.modal || defaultStep;

    const StepComponent = steps[currentStep];
    if (!StepComponent) {
      return null;
    }

    const componentProps = {};
    switch (currentStep) {
      case modalTypes.landing:
        componentProps.onLoginClicked = this.handleLoginClick;
        componentProps.onEmailSignupClicked = this.handleSignupClick;
        break;
      case modalTypes.login:
        componentProps.submit = this.handleLoginSubmit;
        componentProps.onSignupClicked = this.handleSignupClick;
        break;
      case modalTypes.signup:
        componentProps.submit = this.handleSignupSubmit;
        componentProps.onLoginClicked = this.handleLoginClick;
        break;
      default:
    }

    return (
      <Modal
        closeable
        appElement={appElement}
        isOpen={Object.values(modalTypes).includes(searchParams.modal)}
        onClose={() => setModal(history, location)}
      >
        <StepComponent {...componentProps} />
      </Modal>
    );
  }
}

const mapStateToProps = (state, { match, location }) => ({
  searchParams: getSearchParams(match, location),
});

export default withRouter(connect(mapStateToProps)(AuthController));
