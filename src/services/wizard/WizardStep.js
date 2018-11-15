import React, { Component } from 'react';
import { node, func, number, string, oneOfType, object } from 'prop-types';
import { reduxForm } from 'redux-form';

import { createValidator } from 'sly/services/validation';

export default class WizardStep extends Component {
  static propTypes = {
    name: string,
    currentStep: number.isRequired,
    step: number.isRequired,
    stepsSize: number.isRequired,
    component: oneOfType([node, func]).isRequired,
    onSubmit: func,
    onComplete: func,
    formOptions: object,
    validations: object,
  };

  static defaultProps = {
    name: `Step_${+new Date()}`,
    currentStep: 1,
    step: 1,
    stepsSize: 1,
    component: null,
    onSubmit: () => null,
    onComplete: () => null,
  };

  constructor(props) {
    super(props);

    const {
      component,
      onSubmit,
      onComplete,
      stepsSize,
      step,
      validations,
      formOptions,
    } = props;
    const StepComponent = component;

    if (validations) {
      const validate = createValidator(validations);
      formOptions.validate = validate;
    }

    this.WizardStepForm = reduxForm(formOptions)(({ handleSubmit, ...formProps }) => (
      <StepComponent
        onSubmit={handleSubmit(step === stepsSize ? onComplete : onSubmit)}
        {...formProps}
      />
    ));
  }

  render() {
    const { WizardStepForm } = this;
    const { currentStep, step } = this.props;

    if (currentStep === step) {
      return <WizardStepForm />;
    }

    return null;
  }
}
