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
import CustomerSignupConfirmationContainer from 'sly/services/auth/containers/CustomerSignupConfirmationContainer';
import ProviderFindCommunityContainer  from 'sly/services/auth/containers/ProviderFindCommunityContainer';
import ProviderConfirmation from 'sly/services/auth/components/ProviderConfirmation'

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

    let initialStep = 'Login';
    if (authenticated.options && authenticated.options.register) {
      initialStep = 'Signup';
    }
    if (authenticated.options && authenticated.options.provider) {
      initialStep = 'ProviderSignup';
    }


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
            initialStep={initialStep}
            onComplete={authenticateSuccess}
          >
            {({
               goto, next, ...props
            }) => (
              <WizardSteps {...props}>
                <WizardStep
                  component={LoginFormContainer}
                  name="Login"
                  onRegisterClick={() => goto('ProviderFindCommunity')}
                  onResetPasswordClick={() => goto('ResetPassword')}
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ResetPasswordFormContainer}
                  name="ResetPassword"
                  onLoginClick={() => goto('Login')}
                  onSubmit={() => goto('Login')}
                />
                <WizardStep
                  component={SignupFormContainer}
                  name="Signup"
                  onLoginClicked={() => (delete authenticated.options.register && goto('Login'))}
                  onProviderClicked={() => (delete authenticated.options.register && goto('ProviderSignupFormContainer'))}
                  onSubmit={() => goto('CustomerSignupConfirmation')}
                />
                <WizardStep
                  component={CustomerSignupConfirmationContainer}
                  name="CustomerSignupConfirmation"
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ProviderSignupFormContainer}
                  name="ProviderSignup"
                  onLoginClicked={() => (delete authenticated.options.provider && goto('Login'))}
                  onSubmit={() => (goto('ProviderFindCommunity'))}
                />
                <WizardStep
                  component={ProviderFindCommunityContainer}
                  name="ProviderFindCommunity"
                  onClaimApproved={() => (goto('ProviderConfirmation'))}
                  onApprovalNeeded={() => (goto('ProviderClaimNeedsApproval'))}
                  onNotFound={() => (goto('ProviderClaimNeedsApproval'))}
                />
                <WizardStep
                  component={ProviderConfirmation}
                  name="ProviderConfirmation"
                  mode="Approved"
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ProviderConfirmation}
                  name="ProviderCommunityNotFound"
                  mode="NotFound"
                  onSubmit={authenticateSuccess}
                />
                <WizardStep
                  component={ProviderConfirmation}
                  name="ProviderClaimNeedsApproval"
                  mode="NeedApproval"
                  onSubmit={authenticateSuccess}
                />
              </WizardSteps>
            )}
          </WizardController>
        </ModalBody>
      </Modal>
    );
  }
}
