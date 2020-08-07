import React from 'react';
import { func, string } from 'prop-types';

import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import LoginFormContainer from 'sly/common/services/auth/containers/LoginFormContainer';

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
          component={LoginFormContainer}
          name="ResetPassword"
          onRegisterClick={() => goto('Signup')}
          onResetPasswordClick={() => goto('ResetPassword')}
          onSubmit={handleAuthenticateSuccess}
        />
        {!!handleAuthenticateSuccess && false}
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
