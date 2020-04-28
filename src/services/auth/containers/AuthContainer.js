import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { authenticateCancel, authenticateSuccess } from 'sly/store/authenticated/actions';
import { withAuth } from 'sly/services/api';
import spacing from 'sly/components/helpers/spacing';
import withNotification from 'sly/controllers/withNotification';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { email } from 'sly/services/validation';
import Modal, { HeaderWithClose } from 'sly/components/atoms/NewModal';

import ResetPasswordFormContainer from 'sly/services/auth/containers/ResetPasswordFormContainer';
import LoginFormContainer from 'sly/services/auth/containers/LoginFormContainer';
import SignupFormContainer from 'sly/services/auth/containers/SignupFormContainer';
import ProviderSignupFormContainer from 'sly/services/auth/containers/ProviderSignupFormContainer';


const ModalBody = spacing(styled.div``, { top: null });

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withRouter
@withAuth
@withNotification
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func.isRequired,
    authenticateSuccess: func.isRequired,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    sendOtpCode: func.isRequired,
    notifyError: func.isRequired,
  };

  state = { isOpen: false };

  componentDidMount() {
    this.shouldAuth();
  }

  componentDidUpdate() {
    this.shouldAuth();
  }

  shouldAuth = () => {
    const {
      authenticated,
    } = this.props;

    if (!this.state.isOpen && authenticated.loggingIn) {
      this.setState({ isOpen: true });
    } else if (this.state.isOpen && !authenticated.loggingIn) {
      this.setState({ isOpen: false });
    }
  };


  render() {
    const { isOpen } = this.state;
    const { authenticateCancel, authenticateSuccess, authenticated } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onClose={authenticateCancel}
      >
        <HeaderWithClose onClose={authenticateCancel} />
        <ModalBody>
          <WizardController
            formName="AuthForm"
            controllerKey="AuthFormControllerKey"
            initialStep={authenticated.options && authenticated.options.register ? 'Signup' : 'Login'}
            onComplete={authenticateSuccess}
          >
            {({
               goto, next, ...props
            }) => (
              <WizardSteps {...props}>
                <WizardStep
                  component={LoginFormContainer}
                  name="Login"
                  onRegisterClick={() => goto('Signup')}
                  onResetPasswordClick={() => goto('ResetPassword')}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={SignupFormContainer}
                  name="Signup"
                  onLoginClicked={() => (delete authenticated.options.register && goto('Login'))}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ProviderSignupFormContainer}
                  name="Signup"
                  onLoginClicked={() => goto('Login')}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ResetPasswordFormContainer}
                  name="ResetPassword"
                  onLoginClick={() => goto('Login')}
                  onSubmit={() => goto('Login')}
                />
              </WizardSteps>
            )}
          </WizardController>
        </ModalBody>
      </Modal>
    );
  }
}
