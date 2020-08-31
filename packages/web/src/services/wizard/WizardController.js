import { Component } from 'react';
import { arrayOf, any, func, object, bool, string, number } from 'prop-types';
import { isValid, isSubmitting, reset, SubmissionError } from 'redux-form';

import { connectController } from 'sly/web/controllers';
import { selectFormData } from 'sly/common/services/helpers/forms';

const mapStateToProps = (state, { controller, ...ownProps }) => {
  isValid(ownProps.formName)(state);
  const steps = controller.steps || [];
  const initialStepIndex = steps.findIndex(s => s === ownProps.initialStep);
  const defaultInitialStepIndex = initialStepIndex > -1 ? initialStepIndex : 0;

  return {
    steps,
    progressPath: controller.progressPath || [0],
    // zero is equated to false, hence current step as first step along with initialStep prop won't work without number type check
    currentStepIndex: Number.isInteger(controller.currentStepIndex) ? controller.currentStepIndex : defaultInitialStepIndex,
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
    onNext: func,
    onPrevious: func,
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
    const { steps: propSteps, set } = this.props;
    // on reset, steps will be empty array, and init will be called on each update in WizardSteps.
    // We set the steps, only when the steps are empty(reset happened) so that we dont want to
    // set steps unnecessarily on each update.
    if (propSteps.length === 0) {
      set({
        steps,
      });
    }
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

  gotoNext = () => {
    const { currentStepIndex, steps } = this.props;
    const nextStep = steps[currentStepIndex + 1];

    this.goto(nextStep);
  };

  next = () => {
    const { currentStepIndex, steps, onNext } = this.props;
    const nextStep = steps[currentStepIndex + 1];

    this.gotoNext();
    if (onNext) {
      const args = {
        from: steps[currentStepIndex],
        to: nextStep,
      };

      onNext({ ...args });
    }
  };

  previous = () => {
    const { set, progressPath, currentStepIndex, onPrevious, steps } = this.props;
    let prevStepIndex = 0;
    if (currentStepIndex > 1) {
      prevStepIndex = progressPath.pop();
      if (prevStepIndex > 1) {
        prevStepIndex -= 1;
      }
    }

    set({
      currentStepIndex: prevStepIndex,
      progressPath,
    });
    if (onPrevious) {
      const args = {
        from: steps[currentStepIndex],
        to: steps[prevStepIndex],
      };
      onPrevious({ ...args });
    }
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
            return this.gotoNext();
          }
          return null;
        })
        .catch((e) => {
          throw new SubmissionError({ _error: e.message });
        });
    }
    this.gotoNext();

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
