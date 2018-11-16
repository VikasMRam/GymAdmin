import React, { Component } from 'react';
import { node, func, string, oneOfType, object } from 'prop-types';
import { reduxForm } from 'redux-form';

import { createValidator } from 'sly/services/validation';

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
    const { name } = this.props;
    if (currentWizardStepFormName !== name || !WizardStepForm) {
      const {
        name,
        component,
        onSubmit,
        validations,
        formOptions,
      } = this.props;
      const StepComponent = component;

      if (validations) {
        const validate = createValidator(validations);
        formOptions.validate = validate;
      }

      this.currentWizardStepFormName = name;
      this.WizardStepForm = reduxForm(formOptions)(({ handleSubmit, ...formProps }) => (
        <StepComponent
          onSubmit={handleSubmit(onSubmit)}
          {...formProps}
        />
      ));
    }
    ({ currentWizardStepFormName, WizardStepForm } = this);

    if (WizardStepForm) {
      return <WizardStepForm />;
    }
    return null;
  }
}
