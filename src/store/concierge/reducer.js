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
  switch(type) {
    case GET_DETAILED_PRICING: {
      const { conversionSubmitted, advancedInfoSubmitted } = payload;
      let currentStep = CONVERSION_FORM;
      if ( conversionSubmitted && advancedInfoSubmitted ) {
        currentStep = THANKYOU;
      } else if ( conversionSubmitted ) {
        currentStep = ADVANCED_INFO;
      }
      return {
        ...state,
        modalIsOpen: true,
        currentStep,
      };
    }
    case NEXT: {
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
    }
    case CLOSE: {
      return {
        ...state,
        modalIsOpen: false,
      };
    }
    default: return state;
  }
};
