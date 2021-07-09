import React, { Component } from 'react';
import { object, func, oneOf, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter  } from 'react-router';

import { withAuth } from 'sly/web/services/api';
import { withHydration } from 'sly/web/services/partialHydration';
import { authenticateCancel, authenticateSuccess } from 'sly/web/store/authenticated/actions';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { Block } from 'sly/common/components/atoms';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Wrapper } from 'sly/common/services/auth/components/Template';
import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { AGENTSIGNUP, CUSTOMERSIGNUPCONFIRMATION, LOGINSINGUP, RESETPASSWORD, THIRDPARTYINFOPROMPT, PROIVDERSIGNUP, MAGICLINKEXPIRED, SIGNUP, OTPLOGIN, MAGICLINKSUCCESS, LOGINWITHPASSWORD, PROVIDERFINDCOMMUNITY, PROVIDERCONFIRMATION, PROVIDERCLAIMNEEDSAPPROVAL, PROVIDERCOMMUNITYNOTFOUND } from 'sly/common/services/auth/containers/AuthContainer/constants';

const ResetPasswordFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "resetPasswordContainer" */ import('sly/common/services/auth/containers/ResetPasswordFormContainer'));
const LoginSignupFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "loginFormContainer" */ import('sly/common/services/auth/containers/LoginSignupFormContainer'));
const ProviderSignupFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "providerSignupFormContainer" */ import('sly/common/services/auth/containers/ProviderSignupFormContainer'));
const SignupFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "signUpContainer" */ import('sly/common/services/auth/containers/SignupFormContainer'));
const AgentSignupFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "agentSignupFormContainer" */ import('sly/common/services/auth/containers/AgentSignupFormContainer'));
const CustomerSignupConfirmationContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "customerSignupConfirmationContainer" */ import('sly/common/services/auth/containers/CustomerSignupConfirmationContainer'));
const ProviderFindCommunityContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "providerFindCommunityContainer" */ import('sly/common/services/auth/containers/ProviderFindCommunityContainer'));
const ProviderConfirmation = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "providerConfirmation" */ import('sly/common/services/auth/components/ProviderConfirmation'));
const ThirdPartyPromptFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "thirdPartyPromptFormContainer" */ import('sly/common/services/auth/containers/ThirdPartyPromptFormContainer'));
const OtpLoginFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "otpLoginFormContainer" */ import('sly/common/services/auth/containers/OtpLoginFormContainer'));
const LoginWithPasswordFormContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "loginWithPasswordFormContainer" */ import('sly/common/services/auth/containers/LoginWithPasswordFormContainer'));


const MagicLinkExpired = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "magicLinkExpired" */ import('sly/common/services/auth/components/MagicLink/MagicLinkExpired'));
const MagicLinkSuccessContainer = withHydration(/* #__LOADABLE__ */ () => /* webpackChunkName: "magicLinkSuccessContainer" */ import('sly/common/services/auth/containers/MagicLinkSuccessContainer'));


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
    location: object,
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
    initialStep: LOGINSINGUP,
    formName: 'AuthForm',
    signUpHasPassword: true,
    hasProviderSignup: true,
  };

  state = { isOpen: false, title: '', noBorder: false };

  componentDidMount() {
    this.shouldAuth();
  }

  componentDidUpdate() {
    this.shouldAuth();
  }

  shouldAuth = () => {
    const {
      authenticated,
      location,
    } = this.props;


    if (!this.state.isOpen && authenticated.loggingIn) {
      this.setState({ isOpen: true, title: 'Log in or sign up' });

      if (authenticated.options && authenticated.options.register) {
        this.setState({ title: 'Log in or sign up' });
      }

      if (location.pathname === '/partners/communities') {
        this.setState({ title: 'Create a community manager account' });
      }
      if (location.pathname === '/partners/agents') {
        this.setState({ title: 'Create a partner agent account' });
      }
    } else if (this.state.isOpen && !authenticated.loggingIn) {
      this.setState({ isOpen: false });
      this.setState({ title: '' });
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
    const { isOpen, title, noBorder } = this.state;
    const {
      authenticateCancel, authenticated, type, signUpHeading, signUpSubmitButtonText, signUpHasPassword, onSignupSuccess,
      hasProviderSignup, formName, location,
    } = this.props;
    let { initialStep } = this.props;


    const { search } = location;
    const { loginRedirect, status } = parseURLQueryParams(search);

    if (authenticated.options && authenticated.options.register && initialStep !== THIRDPARTYINFOPROMPT) {
      initialStep = LOGINSINGUP;
    }
    if (authenticated.options && authenticated.options.provider) {
      initialStep = PROIVDERSIGNUP;
    }
    if (authenticated.options && authenticated.options.agent) {
      initialStep = AGENTSIGNUP;
    }
    if (loginRedirect && (status === 'expired' || status === 'error')) {
      initialStep = MAGICLINKEXPIRED;
      this.setState({ noBorder: true });
    }

    const wizard = (
      <WizardController
        formName={formName}
        controllerKey={`${formName}ControllerKey`}
        initialStep={initialStep}
        onComplete={this.handleAuthenticateSuccess}
      >
        {({
          goto, reset, data, next, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={LoginSignupFormContainer}
              name={LOGINSINGUP}
              onGoToSignUp={() => this.setState({ title: 'Create an account' }, () => goto(SIGNUP))}
              onSociaLoginSuccess={() => this.setState({ title: 'One more thing...' }, () => goto(THIRDPARTYINFOPROMPT))}
              onEmailSubmit={() => {
                this.setState({ title: '', noBorder: true });
                goto(MAGICLINKSUCCESS);
                }}
              onPhoneSumbit={() => {
                  this.setState({ title: 'Confirm your phone number' });
                  goto(OTPLOGIN);
                }}
            />
            <WizardStep
              component={ResetPasswordFormContainer}
              name={RESETPASSWORD}
              onLoginClick={() => this.setState({ title: 'Log in' }, () => goto(LOGINSINGUP))}
              onSubmit={() => this.setState({ title: 'Log in' }, () => goto(LOGINWITHPASSWORD))}
            />
            <WizardStep
              component={SignupFormContainer}
              name={SIGNUP}
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.register : true) && this.setState({ title: 'Log in' }, () => goto(LOGINSINGUP)))}
              onProviderClicked={() => this.setState({ title: 'Create a community manager account' }, () => goto(PROIVDERSIGNUP))}
              onSubmit={() => onSignupSuccess ? onSignupSuccess() : goto(CUSTOMERSIGNUPCONFIRMATION)}
              onSocialSignupSuccess={() => this.setState({ title: 'One more thing...' }, () => goto(THIRDPARTYINFOPROMPT))}
              handleOtpClick={() => {
                this.setState({ title: 'Log in to your account' });
                goto(OTPLOGIN);
              }}
              heading={signUpHeading}
              submitButtonText={signUpSubmitButtonText}
              hasPassword={signUpHasPassword}
              hasProviderSignup={hasProviderSignup}
            />
            <WizardStep
              component={ThirdPartyPromptFormContainer}
              name={THIRDPARTYINFOPROMPT}
              onSubmit={() => {
                if (authenticated.options && authenticated.options.register) { onSignupSuccess ? onSignupSuccess() : goto(CUSTOMERSIGNUPCONFIRMATION); } else {
                  this.handleAuthenticateSuccess();
                }
                this.setState({ title: '' });
              }}
            />
            <WizardStep
              component={MagicLinkSuccessContainer}
              name={MAGICLINKSUCCESS}
              email={data?.email}
              redirect_to={data?.redirect_to}
              passwordExists={data?.passwordExists}
              onPasswordLoginClick={() => {
                this.setState({ title: 'Log in', noBorder: false });
                goto(LOGINWITHPASSWORD);
              }}
            />
            <WizardStep
              component={MagicLinkExpired}
              name="MagicLinkExpired"
              status={status}
              onLoginClick={() => {
                this.setState({ title: 'Log in or signup', noBorder: false });
                goto(LOGINSINGUP);
              }}
            />
            <WizardStep
              component={LoginWithPasswordFormContainer}
              name={LOGINWITHPASSWORD}
              onResetPasswordClick={() => this.setState({ title: 'Having trouble logging in?' }, () => goto(RESETPASSWORD))}
              emailOrPhone={data?.email}
              onSubmitSuccess={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={CustomerSignupConfirmationContainer}
              name={CUSTOMERSIGNUPCONFIRMATION}
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={OtpLoginFormContainer}
              name={OTPLOGIN}
              phone_number={data?.phone_number}
              passwordExists={data?.passwordExists}
              onPasswordLoginClick={() => {
                  this.setState({ title: 'Log in' });
                  goto(LOGINWITHPASSWORD);
                }}
              setOtpTitle={() =>
                this.setState({ title: 'Log in with passcode' })
                }
              onSubmit={() => {
                this.handleAuthenticateSuccess();
                reset();
                }}
              onEditPhoneNumberClick={() => {
                  this.setState({ title: 'Log in or signup' });
                  goto(LOGINSINGUP);
                }}
            />
            <WizardStep
              component={ProviderSignupFormContainer}
              name={PROIVDERSIGNUP}
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.provider : true) && this.setState({ title: 'Log in' }, () => goto(LOGINSINGUP)))}
              onSubmit={() => this.setState({ title: 'What is the name of the community you want to manage?' }, () => goto(PROVIDERFINDCOMMUNITY))}
            />
            <WizardStep
              component={AgentSignupFormContainer}
              name="AgentSignup"
              onLoginClicked={() => ((authenticated && authenticated.options ? delete authenticated.options.agent : true) && this.setState({ title: 'Log in' }, () => goto(LOGINSINGUP)))}
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderFindCommunityContainer}
              name={PROVIDERFINDCOMMUNITY}
              onClaimApproved={() => this.setState({ title: '' }, () => goto(PROVIDERCONFIRMATION))}
              onApprovalNeeded={() => this.setState({ title: '' }, () => goto(PROVIDERCLAIMNEEDSAPPROVAL))}
              onNotFound={() => this.setState({ title: '' }, () => goto(PROVIDERCOMMUNITYNOTFOUND))}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCONFIRMATION}
              mode="Approved"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCOMMUNITYNOTFOUND}
              mode="NotFound"
              onSubmit={this.handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCLAIMNEEDSAPPROVAL}
              mode="NeedApproval"
              onSubmit={this.handleAuthenticateSuccess}
            />
          </WizardSteps>)}
      </WizardController>
    );

    if (type === 'inline') {
      return (
        <Wrapper>
          {wizard}
        </Wrapper>
      );
    }

    if (!isOpen) {
      return null;
    }

    return (
      <>
        {isOpen &&
        <Modal
          isOpen={isOpen}
          onClose={authenticateCancel}
        >
          <HeaderWithClose noBorder={noBorder} onClose={authenticateCancel}>
            {title}
          </HeaderWithClose>
          <Block padding="xLarge">
            {wizard}
          </Block>
        </Modal>}
      </>
    );
  }
}
