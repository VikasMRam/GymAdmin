import React, { Component } from 'react';
import { object, func, oneOf, string } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import { authenticateCancel, authenticateSuccess } from 'sly/web/store/authenticated/actions';
import { withAuth } from 'sly/web/services/api';
import spacing from 'sly/web/components/helpers/spacing';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { Box } from 'sly/web/components/atoms';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import ResetPasswordFormContainer from 'sly/web/services/auth/containers/ResetPasswordFormContainer';
import LoginFormContainer from 'sly/web/services/auth/containers/LoginFormContainer';
import SignupFormContainer from 'sly/web/services/auth/containers/SignupFormContainer';
import ProviderSignupFormContainer from 'sly/web/services/auth/containers/ProviderSignupFormContainer';
import CustomerSignupConfirmationContainer from 'sly/web/services/auth/containers/CustomerSignupConfirmationContainer';
import ProviderFindCommunityContainer  from 'sly/web/services/auth/containers/ProviderFindCommunityContainer';
import ProviderConfirmation from 'sly/web/services/auth/components/ProviderConfirmation';

const ModalBody = spacing(styled.div``, { top: null });

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

@withRouter
@withAuth
@connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})

export default class AuthContainer extends Component {
  static propTypes = {
    authenticated: object,
    authenticateCancel: func.isRequired,
    authenticateSuccess: func.isRequired,
    onAuthenticateSuccess: func,
    sendOtpCode: func.isRequired,
    type: oneOf(['modal', 'inline']),
    initialStep: string,
  };

  static defaultProps = {
    type: 'modal',
    initialStep: 'Login',
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

  handleAuthenticateSuccess = () => {
    const { onAuthenticateSuccess, authenticateSuccess } = this.props;

    return authenticateSuccess().then(onAuthenticateSuccess);
  };

  render() {
    const { isOpen } = this.state;
    const { authenticateCancel, authenticated, type } = this.props;
    let { initialStep } = this.props;

    if (authenticated.options && authenticated.options.register) {
      initialStep = 'Signup';
    }
    if (authenticated.options && authenticated.options.provider) {
      initialStep = 'ProviderSignup';
    }

    const wizard = (
      <WizardController
        formName="AuthForm"
        controllerKey="AuthFormControllerKey"
        initialStep={initialStep}
        onComplete={this.handleAuthenticateSuccess}
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
              onSubmit={this.handleAuthenticateSuccess}
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
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.register : true) && goto('Login'))}
              onProviderClicked={() => goto('ProviderSignup')}
              onSubmit={() => goto('CustomerSignupConfirmation')}
            />
            <WizardStep
              component={CustomerSignupConfirmationContainer}
              name="CustomerSignupConfirmation"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderSignupFormContainer}
              name="ProviderSignup"
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.provider : true) && goto('Login'))}
              onSubmit={() => (goto('ProviderFindCommunity'))}
            />
            <WizardStep
              component={ProviderFindCommunityContainer}
              name="ProviderFindCommunity"
              onClaimApproved={() => (goto('ProviderConfirmation'))}
              onApprovalNeeded={() => (goto('ProviderClaimNeedsApproval'))}
              onNotFound={() => (goto('ProviderCommunityNotFound'))}
            />
            <WizardStep
              component={ProviderConfirmation}
              name="ProviderConfirmation"
              mode="Approved"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name="ProviderCommunityNotFound"
              mode="NotFound"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name="ProviderClaimNeedsApproval"
              mode="NeedApproval"
              onSubmit={this.handleAuthenticateSuccess}
            />
          </WizardSteps>
        )}
      </WizardController>
    );

    if (type === 'inline') {
      return (
        <Box>
          {wizard}
        </Box>
      );
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={authenticateCancel}
      >
        <HeaderWithClose onClose={authenticateCancel} />
        <ModalBody>
          {wizard}
        </ModalBody>
      </Modal>
    );
  }
}
