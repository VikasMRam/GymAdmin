import React, { Component } from 'react';
import { object, func, oneOf, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { authenticateCancel, authenticateSuccess } from 'sly/web/store/authenticated/actions';
import { withAuth } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { Block } from 'sly/common/components/atoms';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Wrapper } from 'sly/common/services/auth/components/Template';
import ResetPasswordFormContainer from 'sly/common/services/auth/containers/ResetPasswordFormContainer';
import LoginFormContainer from 'sly/common/services/auth/containers/LoginFormContainer';
import SignupFormContainer from 'sly/common/services/auth/containers/SignupFormContainer';
import ProviderSignupFormContainer from 'sly/common/services/auth/containers/ProviderSignupFormContainer';
import AgentSignupFormContainer from 'sly/common/services/auth/containers/AgentSignupFormContainer';
import CustomerSignupConfirmationContainer from 'sly/common/services/auth/containers/CustomerSignupConfirmationContainer';
import ProviderFindCommunityContainer  from 'sly/common/services/auth/containers/ProviderFindCommunityContainer';
import ProviderConfirmation from 'sly/common/services/auth/components/ProviderConfirmation';
import ThirdPartyPromptFormContainer from 'sly/common/services/auth/containers/ThirdPartyPromptFormContainer';


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
    onSignupSuccess: func,
    sendOtpCode: func.isRequired,
    type: oneOf(['modal', 'inline']).isRequired,
    initialStep: string.isRequired,
    signUpHeading: string,
    signUpSubmitButtonText: string,
    signUpHasPassword: bool.isRequired,
    hasProviderSignup: bool.isRequired,
    formName: string.isRequired,
  };

  static defaultProps = {
    type: 'modal',
    initialStep: 'Login',
    formName: 'AuthForm',
    signUpHasPassword: true,
    hasProviderSignup: true,
  };

  state = { isOpen: false, title: '' };

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
      this.setState({ title: '' });
    }

    if (authenticated.loggingIn && this.state.title === '') {
      this.setState({ title: 'Login' });
      if (authenticated.options && authenticated.options.register) {
        this.setState({ title: 'Sign Up' });
      }
      if (authenticated.options && authenticated.options.provider) {
        this.setState({ title: 'Create a community manager account' });
      }
      if (authenticated.options && authenticated.options.agent) {
        this.setState({ title: 'Create a partner agent account' });
      }
    }
  };

  handleAuthenticateSuccess = () => {
    const { onAuthenticateSuccess, authenticateSuccess } = this.props;
    // authenticateSuccess is not a promise, hence call success event callback immediately
    authenticateSuccess();
    if (onAuthenticateSuccess) {
      onAuthenticateSuccess();
    }
  };

  render() {
    const { isOpen, title } = this.state;
    const {
      authenticateCancel, authenticated, type, signUpHeading, signUpSubmitButtonText, signUpHasPassword, onSignupSuccess,
      hasProviderSignup, formName,
    } = this.props;
    let { initialStep } = this.props;

    if (authenticated.options && authenticated.options.register) {
      initialStep = 'Signup';
    }
    if (authenticated.options && authenticated.options.provider) {
      initialStep = 'ProviderSignup';
    }
    if (authenticated.options && authenticated.options.agent) {
      initialStep = 'AgentSignup';
    }

    const wizard = (
      <WizardController
        formName={formName}
        controllerKey={`${formName}ControllerKey`}
        initialStep={initialStep}
        onComplete={this.handleAuthenticateSuccess}
      >
        {({
          goto, reset, next, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={LoginFormContainer}
              name="Login"
              onRegisterClick={() => this.setState({ title: 'Sign Up' }, () => goto('Signup'))}
              onResetPasswordClick={() => this.setState({ title: 'Having trouble logging in?' }, () => goto('ResetPassword'))}
              onSociaLoginSuccess={() => this.setState({ title: 'One more thing...' }, () => goto('ThirdPartyPromptForm'))}
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ResetPasswordFormContainer}
              name="ResetPassword"
              onLoginClick={() => this.setState({ title: 'Login' }, () => goto('Login'))}
              onSubmit={() => this.setState({ title: 'Login' }, () => goto('Login'))}
            />
            <WizardStep
              component={SignupFormContainer}
              name="Signup"
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.register : true) && this.setState({ title: 'Login' }, () => goto('Login')))}
              onProviderClicked={() => this.setState({ title: 'Create a community manager account' }, () => goto('ProviderSignup'))}
              onSubmit={() => onSignupSuccess ? onSignupSuccess() : goto('CustomerSignupConfirmation')}
              onSocialSignupSuccess={() => this.setState({ title: 'One more thing...' }, () => goto('ThirdPartyPromptForm'))}
              heading={signUpHeading}
              submitButtonText={signUpSubmitButtonText}
              hasPassword={signUpHasPassword}
              hasProviderSignup={hasProviderSignup}
            />
            <WizardStep
              component={ThirdPartyPromptFormContainer}
              name="ThirdPartyPromptForm"
              onSubmit={() => {
                onSignupSuccess ? onSignupSuccess() : goto('CustomerSignupConfirmation');
              }}
            />


            <WizardStep
              component={CustomerSignupConfirmationContainer}
              name="CustomerSignupConfirmation"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderSignupFormContainer}
              name="ProviderSignup"
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.provider : true) && this.setState({ title: 'Login' }, () => goto('Login')))}
              onSubmit={() => this.setState({ title: 'What is the name of the community you want to manage?' }, () => goto('ProviderFindCommunity'))}
            />
            <WizardStep
              component={AgentSignupFormContainer}
              name="AgentSignup"
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.agent : true) && this.setState({ title: 'Login' }, () => goto('Login')))}
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderFindCommunityContainer}
              name="ProviderFindCommunity"
              onClaimApproved={() => this.setState({ title: '' }, () => goto('ProviderConfirmation'))}
              onApprovalNeeded={() => this.setState({ title: '' }, () => goto('ProviderClaimNeedsApproval'))}
              onNotFound={() => this.setState({ title: '' }, () => goto('ProviderCommunityNotFound'))}
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
        <Wrapper>
          {wizard}
        </Wrapper>
      );
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={authenticateCancel}
      >
        <HeaderWithClose onClose={authenticateCancel}>
          {title}
        </HeaderWithClose>
        <Block padding="xLarge">
          {wizard}
        </Block>
      </Modal>
    );
  }
}
