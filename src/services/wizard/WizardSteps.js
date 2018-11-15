import React, { Component, Fragment } from 'react';
import { number, node, func, arrayOf, object } from 'prop-types';

export default class WizardSteps extends Component {
  static propTypes = {
    currentStep: number.isRequired,
    children: arrayOf(node).isRequired,
    onComplete: func,
    onSubmit: func,
    formOptions: object,
    setStepsSize: func,
  };

  constructor(props) {
    super(props);

    const { children, setStepsSize } = this.props;
    this.stepsSize = Array.isArray(children) ? children.length : 1;

    setStepsSize(this.stepsSize);
  }

  render() {
    const { stepsSize } = this;
    const {
      children, currentStep, onComplete, onSubmit, formOptions,
    } = this.props;
    let newChildren = children;

    if (Array.isArray(children)) {
      newChildren = children.map((child, i) =>
        React.cloneElement(child, {
          step: i + 1,
          key: i,
          currentStep,
          onComplete,
          onSubmit: child.props.onSubmit || onSubmit,
          stepsSize,
          formOptions,
        }));
    }

    return <Fragment>{newChildren}</Fragment>;
  }
}
