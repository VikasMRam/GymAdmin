import { Component } from 'react';
import { arrayOf, any, func, number, object, bool, string } from 'prop-types';
import { isValid, isSubmitting, reset, SubmissionError } from 'redux-form';

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
    this.reset();
  }

  setStepsSize = (stepSize) => {
    const { set } = this.props;

    set({
      stepSize,
    });
  }

  reset = () => {
    const { resetForm, resetController } = this.props;
    resetForm();
    resetController();
  }

  isFinalStep = () => {
    const { currentStep, stepSize } = this.props;
    return currentStep === stepSize;
  }

  goto = (step) => {
    const { set, progressPath, currentStep } = this.props;
    // Checking if we had already visited the step
    if (progressPath.indexOf(currentStep) === -1) {
      progressPath.push(currentStep);
    }
    set({
      currentStep: step,
      progressPath,
    });
  }

  next = () => {
    const { goto } = this;
    const { currentStep } = this.props;
    const nextStep = currentStep + 1;

    goto(nextStep);
  }

  previous = () => {
    const { currentStep, set, progressPath } = this.props;
    let prevStep = 1;

    if (currentStep > 1) {
      prevStep = progressPath.pop();
    }

    set({
      currentStep: prevStep,
      progressPath,
    });
  };

  doSubmit = (params = {}) => {
    const { onComplete, data } = this.props;
    const { reset, next, previous } = this;
    params = {
      ...params,
      reset,
      next,
      previous,
    };
    return onComplete(data, params);
  };

  handleSubmit = () => {
    const {
      next, previous, goto, doSubmit, isFinalStep,
    } = this;
    const {
      onSubmit, onStepChange, data, currentStep,
    } = this.props;

    if (isFinalStep()) {
      return doSubmit();
    }
    if (onSubmit) {
      return onSubmit(data).catch((e) => {
        throw new SubmissionError({ _error: e.message });
      });
    }

    // if onStepChange returns a promise then wait for it to resolve before
    // moving to next step
    if (onStepChange) {
      const args = {
        currentStep,
        data,
        next,
        previous,
        goto,
        doSubmit,
      };
      const returnVal = onStepChange(args);
      return Promise.resolve(returnVal)
        .then(this.next)
        .catch((e) => {
          throw new SubmissionError({ _error: e.message });
        });
    }
    this.next();

    return null;
  };

  render() {
    const {
      formOptions, next, previous, goto, handleSubmit, setStepsSize,
      isFinalStep, reset,
    } = this;
    const {
      children, currentStep, data, submitEnabled,
    } = this.props;

    return children({
      onSubmit: handleSubmit,
      isFinalStep: isFinalStep(),
      setStepsSize,
      currentStep,
      next,
      previous,
      goto,
      formOptions,
      data,
      submitEnabled,
      reset,
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
