import React, { Component, Fragment } from 'react';
import { number, node, func, arrayOf, object } from 'prop-types';

export default class WizardSteps extends Component {
  static propTypes = {
    currentStep: number.isRequired,
    children: arrayOf(node).isRequired,
    formOptions: object.isRequired,
    onSubmit: func,
    setStepsSize: func,
  };

  componentDidMount() {
    // NOTE: React caches the class objects, so utilizing same components can clash
    const { children, setStepsSize } = this.props;
    setStepsSize(Array.isArray(children) ? children.length : 1);
  }

  render() {
    const { children } = this.props;
    const {
      currentStep, onSubmit, formOptions,
    } = this.props;
    let newChild = children;
    const { form } = formOptions;

    if (Array.isArray(children)) {
      const currentStepComponent = children.find((child, i) => i + 1 === currentStep);
      if (currentStepComponent) {
        newChild =
          React.cloneElement(currentStepComponent, {
            onSubmit: currentStepComponent.props.onSubmit || onSubmit,
            form: currentStepComponent.props.form || form,
          });
      }
    }

    return <Fragment>{newChild}</Fragment>;
  }
}
