import React, { Component, Fragment } from 'react';
import { number, node, func, arrayOf, object } from 'prop-types';

export default class WizardSteps extends Component {
  static propTypes = {
    currentStepIndex: number.isRequired,
    children: arrayOf(node).isRequired,
    formOptions: object.isRequired,
    onSubmit: func,
    init: func.isRequired,
  };

  componentDidMount() {
    // NOTE: React caches the class objects, so utilizing same components can clash
    const { children, init } = this.props;
    const stepNames = children.map(c => c.props.name);

    init(stepNames);
  }

  render() {
    const { children } = this.props;
    const {
      currentStepIndex, onSubmit, formOptions,
    } = this.props;
    let newChild = children[0];
    const { form } = formOptions;

    const currentStepComponent = children.find((child, i) => i === currentStepIndex);
    if (currentStepComponent) {
      newChild =
        React.cloneElement(currentStepComponent, {
          onSubmit: currentStepComponent.props.onSubmit || onSubmit,
          form: currentStepComponent.props.form || form,
        });
    }

    return <Fragment>{newChild}</Fragment>;
  }
}
