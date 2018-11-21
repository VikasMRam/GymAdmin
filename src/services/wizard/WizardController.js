import { Component } from 'react';
import { arrayOf, any, func, number, object, bool, string } from 'prop-types';
import { isValid, isSubmitting, reset } from 'redux-form';

import { connectController } from 'sly/controllers';
import { selectFormData } from 'sly/services/helpers/forms';

class WizardController extends Component {
  static propTypes = {
    progressPath: arrayOf(number).isRequired,
    children: any,
    set: func,
    resetController: func,
    currentStep: number,
    stepSize: number,
    onComplete: func,
    onSubmit: func,
    data: object,
    submitEnabled: bool,
    resetForm: func,
    onStepChange: func,
    formName: string.isRequired,
  };

  static defaultProps = {
    formName: 'WizardForm',
  };

  constructor(props) {
    super(props);
    const { formName } = props;

    this.formOptions = {
      form: formName,
      destroyOnUnmount: false,
    };
  }

  componentWillUnmount() {
    const { resetForm, resetController } = this.props;
    resetForm();
    resetController();
  }

  setStepsSize = (stepSize) => {
    const { set } = this.props;

    set({
      stepSize,
    });
  }

  isFinalStep = () => {
    const { currentStep, stepSize } = this.props;
    return currentStep === stepSize;
  }

  goto = (step) => {
    const { set, progressPath, currentStep } = this.props;

    // first step will already be present
    if (currentStep > 2) {
      progressPath.push(currentStep);
    }
    set({
      currentStep: step,
      progressPath,
    });
  }

  next = () => {
    const { currentStep } = this.props;
    const nextStep = currentStep + 1;

    this.goto(nextStep);
  }

  previous = () => {
    const { currentStep, set, progressPath } = this.props;

    if (currentStep > 1) {
      const prevStep = progressPath.pop();

      set({
        currentStep: prevStep,
        progressPath,
      });
    }
  };

  handleSubmit = () => {
    const {
      onSubmit, onComplete, onStepChange, data, currentStep,
    } = this.props;

    if (this.isFinalStep()) {
      return onComplete(data);
    }
    if (onSubmit) {
      return onSubmit(data);
    }
    if (onStepChange) {
      onStepChange(currentStep + 1, data);
    }
    return this.next();
  };

  render() {
    const { formOptions } = this;
    const {
      children, currentStep, data, submitEnabled,
    } = this.props;

    return children({
      next: this.next,
      previous: this.previous,
      goto: this.goto,
      onSubmit: this.handleSubmit,
      setStepsSize: this.setStepsSize,
      currentStep,
      isFinalStep: this.isFinalStep(),
      formOptions,
      data,
      submitEnabled,
    });
  }
}

const mapStateToProps = (state, { controller, ...ownProps }) => {
  isValid(ownProps.formName)(state);
  return {
    progressPath: controller.progressPath || [1],
    currentStep: controller.currentStep || ownProps.currentStep || 1,
    stepSize: controller.stepSize || 0,
    data: selectFormData(state, ownProps.formName, {}),
    submitEnabled: isValid(ownProps.formName)(state) && !isSubmitting(ownProps.formName)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetForm: () => dispatch(reset(ownProps.formName)),
});

export default connectController(mapStateToProps, mapDispatchToProps)(WizardController);
