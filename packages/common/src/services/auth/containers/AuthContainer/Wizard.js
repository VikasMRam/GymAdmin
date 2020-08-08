import React from 'react';
import { func, string, object, bool } from 'prop-types';

import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import LoginFormContainer from 'sly/common/services/auth/containers/LoginFormContainer';
import ResetPasswordFormContainer from 'sly/common/services/auth/containers/ResetPasswordFormContainer';
import SignupFormContainer from 'sly/common/services/auth/containers/SignupFormContainer';
import CustomerSignupConfirmationContainer from 'sly/common/services/auth/containers/CustomerSignupConfirmationContainer';
import ProviderSignupFormContainer from 'sly/common/services/auth/containers/ProviderSignupFormContainer';
import ProviderFindCommunityContainer from 'sly/common/services/auth/containers/ProviderFindCommunityContainer';

const Wizard = ({
  formName, initialStep, handleAuthenticateSuccess, authenticated, onSignupSuccess,
  signUpHeading, signUpSubmitButtonText, signUpHasPassword, hasProviderSignup,
}) => (
  <WizardController
    formName={formName}
    controllerKey={`${formName}ControllerKey`}
    initialStep={initialStep}
    onComplete={handleAuthenticateSuccess}
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
          onSubmit={handleAuthenticateSuccess}
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
          onLoginClicked={() =>
            ((authenticated && authenticated.options ? delete authenticated.options.register : true) && goto('Login'))}
          onProviderClicked={() => goto('ProviderSignup')}
          onSubmit={() => onSignupSuccess ? onSignupSuccess() : goto('CustomerSignupConfirmation')}
          heading={signUpHeading}
          submitButtonText={signUpSubmitButtonText}
          hasPassword={signUpHasPassword}
          hasProviderSignup={hasProviderSignup}
        />
        <WizardStep
          component={CustomerSignupConfirmationContainer}
          name="CustomerSignupConfirmation"
          onSubmit={handleAuthenticateSuccess}
        />
        <WizardStep
          component={ProviderSignupFormContainer}
          name="ProviderSignup"
          onLoginClicked={() =>
            ((authenticated && authenticated.options ? delete authenticated.options.provider : true) && goto('Login'))}
          onSubmit={() => goto('ProviderFindCommunity')}
        />
        <WizardStep
          component={ProviderFindCommunityContainer}
          name="ProviderFindCommunity"
          onClaimApproved={() => goto('ProviderConfirmation')}
          onApprovalNeeded={() => goto('ProviderClaimNeedsApproval')}
          onNotFound={() => goto('ProviderCommunityNotFound')}
        />
      </WizardSteps>
    )}
  </WizardController>
);

Wizard.propTypes = {
  formName: string.isRequired,
  initialStep: string.isRequired,
  handleAuthenticateSuccess: func.isRequired,
  authenticated: object,
  onSignupSuccess: func,
  signUpHeading: string,
  signUpSubmitButtonText: string,
  signUpHasPassword: bool,
  hasProviderSignup: bool,
};

export default Wizard;
