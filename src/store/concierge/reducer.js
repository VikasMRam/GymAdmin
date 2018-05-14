import { GET_DETAILED_PRICING, NEXT, CLOSE } from './actions';

import {
  CONVERSION_FORM,
  ADVANCED_INFO,
  SIMILAR_COMMUNITIES,
  THANKYOU,
} from './constants';

const steps = [
  CONVERSION_FORM,
  ADVANCED_INFO,
  SIMILAR_COMMUNITIES,
  THANKYOU,
];

const initialState = {
  currentStep: CONVERSION_FORM,
  modalIsOpen: false,
};

export default (state = initialState, { type, payload }) => {
  if (type === GET_DETAILED_PRICING) {
    console.log('hererere');
    return {
      ...state,
      modalIsOpen: true,
      currentStep: ADVANCED_INFO,
    };
  } else if (type === NEXT) {
    const { currentStep } = state;
    const stepIndex = steps.indexOf(currentStep);
    const nextStepIndex = stepIndex + 1;
    if(nextStepIndex < steps.length) {
      return {
        ...state,
        currentStep: steps[nextStepIndex],
        modalIsOpen: true,
      };
    } else {
      return {
        ...state,
        modalIsOpen: false,
      };
    }
  } else if(type === CLOSE) {
      return {
        ...state,
        modalIsOpen: false,
      };
  }

  return state;
};
