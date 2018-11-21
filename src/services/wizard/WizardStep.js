import React, { Component } from 'react';
import { node, func, string, oneOfType, object } from 'prop-types';

export default class WizardStep extends Component {
  static propTypes = {
    name: string,
    component: oneOfType([node, func]).isRequired,
    onSubmit: func,
    formOptions: object,
    validations: object,
  };

  static defaultProps = {
    name: `Step_${+new Date()}`,
    component: null,
    onSubmit: () => null,
  };

  render() {
    let { currentWizardStepFormName, WizardStepForm } = this;
    const { name, ...props } = this.props;
    if (currentWizardStepFormName !== name || !WizardStepForm) {
      const {
        name,
        component,
      } = this.props;
      const StepComponent = component;

      this.currentWizardStepFormName = name;
      this.WizardStepForm = StepComponent;
    }
    ({ currentWizardStepFormName, WizardStepForm } = this);

    if (WizardStepForm) {
      return <WizardStepForm {...props} />;
    }
    return null;
  }
}
