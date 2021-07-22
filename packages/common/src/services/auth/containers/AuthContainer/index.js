import React, { useState, useEffect } from 'react';
import { object, func, oneOf, string, bool } from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useLocation  } from 'react-router';
import { stringify } from 'query-string';

import { useAuth } from 'sly/web/services/api';
import { withHydration } from 'sly/web/services/partialHydration';
import { authenticateCancel, authenticateSuccess } from 'sly/web/store/authenticated/actions';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import { Block } from 'sly/common/components/atoms';
import Modal, { HeaderWithClose } from 'sly/web/components/atoms/NewModal';
import { Wrapper } from 'sly/common/services/auth/components/Template';
import { parseURLQueryParams, removeQueryParamFromURL } from 'sly/web/services/helpers/url';
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


const AuthContainer = (props) => {
  const [title, setTitle] = useState('');
  const [noBorder, setNoBorder] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [redirectStatus, setRedirectStatus] = useState(null);
  const { ensureAuthenticated } = useAuth();
  const history = useHistory();
  const location = useLocation();


  const {
    authenticateCancel, authenticated, type, signUpHeading, signUpSubmitButtonText, signUpHasPassword, onSignupSuccess,
    hasProviderSignup, formName,
  } = props;
  let { initialStep } = props;


  const cancelAuthAndDestroyState = () => {
    setRedirectStatus(null);
    setRedirectAfterLogin(null);
    authenticateCancel();
  };


  const shouldAuth = () => {
    if (authenticated.loggingIn) {
      setTitle('Log in or sign up');

      if (authenticated.options && authenticated.options.register) {
        setTitle('Log in or sign up');
      }

      if (location.pathname === '/partners/communities') {
        setTitle('Create a community manager account');
      }
      if (location.pathname === '/partners/agents') {
        setTitle('Create a partner agent account');
      }
      if (location.search.includes('expired')) {
        setTitle('');
        setNoBorder(true);
      }
    } else if (!authenticated.loggingIn) {
      setTitle('');
    }
  };

  const { pathname, search, hash } = location;
  const { loginRedirect, status } = parseURLQueryParams(search);

  useEffect(() => {
    shouldAuth();

    if (loginRedirect) {
      const params = removeQueryParamFromURL('loginRedirect', search);
      const finalParams = removeQueryParamFromURL('status', params);
      history.replace(`${pathname}${stringify(finalParams)}${hash}`);
      setRedirectAfterLogin(loginRedirect);
      setRedirectStatus(status);
    }

    if (!authenticated.loggingIn && redirectAfterLogin) {
      ensureAuthenticated()
        .then(() => {
          history.go(0);
          history.push(redirectAfterLogin);
        })
        .catch(() => {

        });
    }
  }, [authenticated.loggingIn, redirectAfterLogin]);


  if (authenticated.options && authenticated.options.register && initialStep !== THIRDPARTYINFOPROMPT) {
    initialStep = LOGINSINGUP;
  }
  if (authenticated.options && authenticated.options.provider) {
    initialStep = PROIVDERSIGNUP;
  }
  if (authenticated.options && authenticated.options.agent) {
    initialStep = AGENTSIGNUP;
  }
  if (redirectAfterLogin && (redirectStatus === 'expired' || redirectStatus === 'error')) {
    initialStep = MAGICLINKEXPIRED;
  }


  const handleAuthenticateSuccess = () => {
    const { onAuthenticateSuccess, authenticateSuccess } = props;
    // authenticateSuccess is not a promise, hence call success event callback immediately
    authenticateSuccess();
    if (onAuthenticateSuccess) {
      onAuthenticateSuccess();
    }
  };


  const wizard = (
    <WizardController
      formName={formName}
      controllerKey={`${formName}ControllerKey`}
      initialStep={initialStep}
      onComplete={handleAuthenticateSuccess}
    >
      {({
          goto, reset, data, next, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={LoginSignupFormContainer}
              name={LOGINSINGUP}
              redirect_to={redirectAfterLogin}
              onGoToSignUp={() => {
              setTitle('Create an account');
              goto(SIGNUP);
              }}
              onEmailNoPassSubmit={() => {
                setTitle('');
                setNoBorder(true);
                goto(MAGICLINKSUCCESS);
                }}
              onPhoneNoPassSubmit={() => {
                  setTitle('Confirm your phone number');
                  goto(OTPLOGIN);
              }}
              onSociaLoginSuccess={() => { setTitle('One more thing...'); goto(THIRDPARTYINFOPROMPT); }}
              onLoginPassSubmit={() => {
                setTitle('Log in');
                goto(LOGINWITHPASSWORD);
              }}
            />

            <WizardStep
              component={LoginWithPasswordFormContainer}
              name={LOGINWITHPASSWORD}
              onResetPasswordClick={() => { setTitle('Having trouble logging in?'); goto(RESETPASSWORD); }}
              onOtpSubmit={() => {
                setTitle('Confirm your phone number');
                goto(OTPLOGIN);
              }}
              onMagicLinkSubmit={() => {
                setTitle('');
                setNoBorder(true);
                goto(MAGICLINKSUCCESS);
              }}
              emailOrPhone={data?.email || data?.phone_number}
              isEmail={!!data?.email}
              onSubmitSuccess={handleAuthenticateSuccess}
            />


            <WizardStep
              component={ResetPasswordFormContainer}
              name={RESETPASSWORD}
              onLoginClick={() => { setTitle('Log in'); goto(LOGINSINGUP); }}
              onSubmit={() => { setTitle('Log in'); goto(LOGINWITHPASSWORD); }}
            />
            <WizardStep
              component={SignupFormContainer}
              name={SIGNUP}
              onLoginClicked={() => {
                if ((authenticated && authenticated.options ? delete authenticated.options.register : true)) {
                 setTitle('Log in');
                  goto(LOGINSINGUP);
                }
              }}
              onProviderClicked={() => {
              setTitle('Create a community manager account');
              goto(PROIVDERSIGNUP);
              }}
              onSubmit={() => onSignupSuccess ? onSignupSuccess() : goto(CUSTOMERSIGNUPCONFIRMATION)}
              onSocialSignupSuccess={() => setTitle('One more thing...')}
              handleOtpClick={() => {
                setTitle('Log in to your account');
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
                  handleAuthenticateSuccess();
                }
                setTitle('');
              }}
            />
            <WizardStep
              component={MagicLinkSuccessContainer}
              name={MAGICLINKSUCCESS}
              email={data?.email}
              redirect_to={redirectAfterLogin}
              passwordExists={data?.passwordExists}
              onPasswordLoginClick={() => {
                setTitle('Log in');
                setNoBorder(false);
                goto(LOGINWITHPASSWORD);
              }}
            />
            <WizardStep
              component={MagicLinkExpired}
              name="MagicLinkExpired"
              status={status}
              onLoginClick={() => {
                setTitle('Log in or signup');
                setNoBorder(false);
                goto(LOGINSINGUP);
              }}
            />
            <WizardStep
              component={CustomerSignupConfirmationContainer}
              name={CUSTOMERSIGNUPCONFIRMATION}
              onSubmit={handleAuthenticateSuccess}
            />
            <WizardStep
              component={OtpLoginFormContainer}
              name={OTPLOGIN}
              phone_number={data?.phone_number}
              passwordExists={data?.passwordExists}
              onPasswordLoginClick={() => {
                  setTitle('Log in');
                  goto(LOGINWITHPASSWORD);
                }}
              setOtpTitle={() =>
                setTitle('Log in with passcode')
                }
              onSubmit={() => {
                handleAuthenticateSuccess();
                reset();
                }}
              onEditPhoneNumberClick={() => {
                  setTitle('Log in or signup');
                  goto(LOGINSINGUP);
                }}
            />
            <WizardStep
              component={ProviderSignupFormContainer}
              name={PROIVDERSIGNUP}
              onLoginClicked={() => {
              if (authenticated && authenticated.options ? delete authenticated.options.provider : true) {
                setTitle('Log in');
                goto(LOGINSINGUP);
                }
              }}
              onSubmit={() => { setTitle('What is the name of the community you want to manage?'); goto(PROVIDERFINDCOMMUNITY); }}
            />
            <WizardStep
              component={AgentSignupFormContainer}
              name="AgentSignup"
              onLoginClicked={() => {
              if (authenticated && authenticated.options ? delete authenticated.options.agent : true) {
                setTitle('Log in');
                goto(LOGINSINGUP);
                }
              }}
              onSubmit={handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderFindCommunityContainer}
              name={PROVIDERFINDCOMMUNITY}
              onClaimApproved={() => { setTitle(''); goto(PROVIDERCONFIRMATION); }}
              onApprovalNeeded={() => { setTitle(''); goto(PROVIDERCLAIMNEEDSAPPROVAL); }}
              onNotFound={() => { setTitle(''); goto(PROVIDERCOMMUNITYNOTFOUND); }}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCONFIRMATION}
              mode="Approved"
              onSubmit={handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCOMMUNITYNOTFOUND}
              mode="NotFound"
              onSubmit={handleAuthenticateSuccess}
            />
            <WizardStep
              component={ProviderConfirmation}
              name={PROVIDERCLAIMNEEDSAPPROVAL}
              mode="NeedApproval"
              onSubmit={handleAuthenticateSuccess}
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

  if (!authenticated.loggingIn) {
    return null;
  }

  return (
    <Modal
      isOpen={authenticated.loggingIn}
      onClose={cancelAuthAndDestroyState}
    >
      <HeaderWithClose noBorder={noBorder} onClose={cancelAuthAndDestroyState}>
        {title}
      </HeaderWithClose>
      <Block padding="xLarge">
        {wizard}
      </Block>
    </Modal>
  );
};


AuthContainer.propTypes = {
  location: object,
  authenticated: object,
  authenticateCancel: func.isRequired,
  authenticateSuccess: func.isRequired,
  onAuthenticateSuccess: func,
  onSignupSuccess: func,
  type: oneOf(['modal', 'inline']).isRequired,
  initialStep: string.isRequired,
  signUpHeading: string,
  signUpSubmitButtonText: string,
  signUpHasPassword: bool.isRequired,
  hasProviderSignup: bool.isRequired,
  formName: string.isRequired,
};

AuthContainer.defaultProps = {
  type: 'modal',
  initialStep: LOGINSINGUP,
  formName: 'AuthForm',
  signUpHasPassword: true,
  hasProviderSignup: true,
};


const mapStateToProps = state => ({
  authenticated: state.authenticated,
});


export default  connect(mapStateToProps, {
  authenticateCancel,
  authenticateSuccess,
})(AuthContainer);
