import React from 'react';
import { func, string } from 'prop-types';

import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import LoginFormContainer from 'sly/common/services/auth/containers/LoginFormContainer';
import ResetPasswordFormContainer from 'sly/common/services/auth/containers/ResetPasswordFormContainer';

const Wizard = ({ formName, initialStep, handleAuthenticateSuccess }) => (
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
      </WizardSteps>
    )}
  </WizardController>
);

Wizard.propTypes = {
  formName: string.isRequired,
  initialStep: string.isRequired,
  handleAuthenticateSuccess: func.isRequired,
};

export default Wizard;
