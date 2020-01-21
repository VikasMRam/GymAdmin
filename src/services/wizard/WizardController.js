import { Component } from 'react';
import { arrayOf, any, func, object, bool, string, number } from 'prop-types';
import { isValid, isSubmitting, reset, SubmissionError } from 'redux-form';

import { connectController } from 'sly/controllers';
import { selectFormData } from 'sly/services/helpers/forms';

const mapStateToProps = (state, { controller, ...ownProps }) => {
  isValid(ownProps.formName)(state);
  return {
    steps: controller.steps || [],
    progressPath: controller.progressPath || [0],
    currentStepIndex: controller.currentStepIndex || 0,
    data: selectFormData(state, ownProps.formName, {}),
    submitEnabled: isValid(ownProps.formName)(state) && !isSubmitting(ownProps.formName)(state),
  };
};

const mapDispatchToProps = {
  resetForm: reset,
};

@connectController(mapStateToProps, mapDispatchToProps)

export default class WizardController extends Component {
  static propTypes = {
    progressPath: arrayOf(number).isRequired,
    children: any,
    set: func.isRequired,
    resetController: func,
    currentStepIndex: number.isRequired,
    steps: arrayOf(string).isRequired,
    onComplete: func,
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

  init = (steps) => {
    const { set } = this.props;

    set({
      steps,
    });
  };

  reset = () => {
    const { resetForm, formName, resetController } = this.props;
    resetForm(formName);
    resetController();
  };

  isFinalStep = () => {
    const { currentStepIndex, steps } = this.props;
    return currentStepIndex === steps.length - 1;
  };

  goto = (nextStep) => {
    if (nextStep === null) {
      return;
    }
    const { set, steps, progressPath } = this.props;
    const nextStepIndex = steps.indexOf(nextStep);
    // Checking if we had already visited the step
    if (!progressPath.includes(nextStepIndex)) {
      progressPath.push(nextStepIndex);
    }

    set({
      currentStepIndex: nextStepIndex,
      progressPath,
    });
  };

  next = () => {
    const { currentStepIndex, steps } = this.props;
    const nextStep = steps[currentStepIndex + 1];

    this.goto(nextStep);
  };

  previous = () => {
    const { set, progressPath, currentStepIndex } = this.props;
    let prevStepIndex = 0;
    if (currentStepIndex > 1) {
      prevStepIndex = progressPath.pop();
    }

    set({
      currentStepIndex: prevStepIndex,
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

  handleSubmit = (params = {}) => {
    const {
      next, previous, doSubmit, isFinalStep,
    } = this;
    const {
      onStepChange, data, currentStepIndex, steps,
    } = this.props;
    const currentStep = steps[currentStepIndex];

    if (isFinalStep()) {
      return doSubmit(params);
    }

    // if onStepChange returns a promise then wait for it to resolve before
    // moving to next step

    let wasGotoCalled = false;
    const goto = (step) => {
      wasGotoCalled = true;
      return this.goto(step);
    };
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
        .then(() => {
          if (!wasGotoCalled) {
            return this.next();
          }
          return null;
        })
        .catch((e) => {
          throw new SubmissionError({ _error: e.message });
        });
    }
    this.next();

    return null;
  };

  render() {
    const {
      formOptions, next, previous, goto, handleSubmit, init,
      isFinalStep, reset,
    } = this;
    const {
      children, currentStepIndex, data, submitEnabled, steps,
    } = this.props;
    const currentStep = steps[currentStepIndex];

    return children({
      onSubmit: handleSubmit,
      isFinalStep: isFinalStep(),
      init,
      currentStep,
      currentStepIndex,
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
