import React, { Component, Fragment } from 'react';
import { number, node, func, arrayOf } from 'prop-types';

export default class WizardSteps extends Component {
  static propTypes = {
    currentStep: number.isRequired,
    children: arrayOf(node).isRequired,
    onSubmit: func,
    setStepsSize: func,
  };

  constructor(props) {
    super(props);

    const { children, setStepsSize } = this.props;
    setStepsSize(Array.isArray(children) ? children.length : 1);
  }

  render() {
    const { children } = this.props;
    const {
      currentStep, onSubmit,
    } = this.props;
    let newChild = children;

    if (Array.isArray(children)) {
      const currentStepComponent = children.find((child, i) => i + 1 === currentStep);
      if (currentStepComponent) {
        newChild =
          React.cloneElement(currentStepComponent, {
            onSubmit: currentStepComponent.props.onSubmit || onSubmit,
          });
      }
    }

    return <Fragment>{newChild}</Fragment>;
  }
}
