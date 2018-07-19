import { Step1, Step2, Step3, Step4, Step5, Step6 } from './steps';

export const getStepComponent = (step) => {
  let currentStepComponent = null;
  switch (step) {
    case 1:
      currentStepComponent = Step1;
      break;
    case 2:
      currentStepComponent = Step2;
      break;
    case 3:
      currentStepComponent = Step3;
      break;
    case 4:
      currentStepComponent = Step4;
      break;
    case 5:
      currentStepComponent = Step5;
      break;
    case 6:
      currentStepComponent = Step6;
      break;
    default:
      currentStepComponent = Step1;
  }
  return currentStepComponent;
};
