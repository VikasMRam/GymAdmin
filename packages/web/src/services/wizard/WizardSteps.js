import React, { Component, Children, isValidElement } from 'react';
import { number, node, func, arrayOf, object } from 'prop-types';

export default class WizardSteps extends Component {
  static propTypes = {
    currentStepIndex: number.isRequired,
    children: arrayOf(node).isRequired,
    formOptions: object.isRequired,
    onSubmit: func,
    init: func.isRequired,
  };

  initSteps() {
    // NOTE: React caches the class objects, so utilizing same components can clash
    const { data, children, init } = this.props;

    // filter to remove children that are falsy values and not react elements
    // children that in conditions which evaluate to fasly values
    const stepNames = Children.map(children,
      child => isValidElement(child) && child.props.name)
      .filter(c => c);

    init(stepNames);
  }

  componentDidMount() {
    this.initSteps();
  }

  // componentDidUpdate() {
  //   this.initSteps();
  // }

  render() {
    const {
      currentStepIndex, onSubmit, formOptions, children,
    } = this.props;
    // remove children that are falsy values and not react elements
    // children that in conditions which evaluate to fasly values
    const filteredChildren = Children.toArray(children).filter(c => isValidElement(c));
    let newChild = filteredChildren[0];
    const { form } = formOptions;

    const currentStepComponent = filteredChildren.find((child, i) => i === currentStepIndex);
    if (currentStepComponent) {
      const props = {
        onSubmit: currentStepComponent.props.onSubmit || onSubmit,
        form: currentStepComponent.props.form || form,
      };
      newChild =
        React.cloneElement(currentStepComponent, props);
    }

    return <>{newChild}</>;
  }
}
