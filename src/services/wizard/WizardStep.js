import React from 'react';
import { node, func, oneOfType } from 'prop-types';

const WizardStep = ({ component, ...props }) => {
  const WizardStepForm = component;

  if (WizardStepForm) {
    return <WizardStepForm {...props} />;
  }
  return null;
};

WizardStep.propTypes = {
  component: oneOfType([node, func]).isRequired,
};

WizardStep.defaultProps = {
  component: null,
};

export default WizardStep;
