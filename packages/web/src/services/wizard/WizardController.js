import { Component } from 'react';
import { arrayOf, any, func, object, bool, string, number } from 'prop-types';
import { isValid, isSubmitting, reset, initialize, SubmissionError } from 'redux-form';

import { connectController } from 'sly/web/controllers';
import { selectFormData } from 'sly/common/services/helpers/forms';

const mapStateToProps = (state, { controller, ...ownProps }) => {
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
  initializeForm: initialize,
};

@connectController(mapStateToProps, mapDispatchToProps)

export default class WizardController extends Component {
  static propTypes = {
    useLocalStorage: bool,
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

  state = {
    localStorageKey: `wizardForm_${this.props.formName}`,
  };

  constructor(props) {
    super(props);

    const { formName } = props;

    this.formOptions = {
      form: formName,
      destroyOnUnmount: false,
    };
  }

  componentDidMount() {
    const { formName, initializeForm, useLocalStorage } = this.props;
    if (useLocalStorage) {
      let formData;
      try {
        formData = JSON.parse(localStorage.getItem(this.state.localStorageKey)) || {};
      } catch(e) {
        formData = {};
      }

      if (Object.keys(formData).length) {
        initializeForm(formName, formData);
      }
    }
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
      return set({
        steps,
      });
    }
  };

  reset = () => {
    const { resetForm, formName, resetController } = this.props;
    resetForm(formName);
    return resetController();
  };

  isFinalStep = () => {
    const { currentStepIndex, steps } = this.props;
    return currentStepIndex === steps.length - 1;
  };

  goto = (nextStep) => {
    if (nextStep === null || typeof nextStep === 'undefined') {
      return Promise.resolve();
    }
    const { set, steps, progressPath } = this.props;
    const nextStepIndex = steps.indexOf(nextStep);
    // Checking if we had already visited the step
    if (!progressPath.includes(nextStepIndex)) {
      progressPath.push(nextStepIndex);
    }

    return set({
      currentStepIndex: nextStepIndex,
      progressPath,
    });
  };

  gotoNext = () => {
    const { currentStepIndex, steps } = this.props;
    const nextStep = steps[currentStepIndex + 1];

    return this.goto(nextStep);
  };

  next = () => {
    const { currentStepIndex, steps, onNext } = this.props;
    const nextStep = steps[currentStepIndex + 1];

    return this.gotoNext().then(async (data) => {
      if (onNext) {
        const args = {
          from: steps[currentStepIndex],
          to: nextStep,
        };

        await onNext(args);
      }

      return data;
    });
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

    return set({
      currentStepIndex: prevStepIndex,
      progressPath,
    }).then(async (data) => {
      if (onPrevious) {
        const args = {
          from: steps[currentStepIndex],
          to: steps[prevStepIndex],
        };
        await onPrevious(args);
      }
      return data;
    });
  };

  doCompleteSubmit = (params = {}) => {
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

  handleStepSubmit = (params = {}) => {
    const {
      next, previous, reset, doCompleteSubmit, isFinalStep,
    } = this;
    const {
      onStepChange, data, currentStepIndex, steps, useLocalStorage,
    } = this.props;
    const currentStep = steps[currentStepIndex];

    if (useLocalStorage) {
      localStorage.setItem(this.state.localStorageKey, JSON.stringify(data));
    }

    if (isFinalStep()) {
      return doCompleteSubmit(params);
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
        reset,
        doSubmit: doCompleteSubmit,
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

    return this.gotoNext();
  };

  render() {
    const {
      formOptions, next, previous, goto, handleStepSubmit, init,
      isFinalStep, reset,
    } = this;
    const {
      children, currentStepIndex, data, submitEnabled, steps,
    } = this.props;
    const currentStep = steps[currentStepIndex];

    return children({
      onSubmit: handleStepSubmit,
      isFinalStep: isFinalStep(),
      init,
      currentStep,
      currentStepIndex,
      steps,
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
