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
      return onSubmit(data).catch(e => {
        throw new SubmissionError({ _error: e.message });
      });
    }
    this.next();

    if (onStepChange) {
      const args = {
        currentStep,
        data,
        next,
        previous,
        goto,
        doSubmit,
      };
      return onStepChange(args);
    }

    return null;
  };

  render() {
    const {
      formOptions, next, previous, goto, handleSubmit, setStepsSize,
      isFinalStep,
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
