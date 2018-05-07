import { GET_DETAILED_PRICING, NEXT, CLOSE } from './actions';

const steps = [
  'conversionForm',
  'advancedInfo',
  'similarCommunities',
  'thankyou',
];

const initialState = {
  currentStep: 'conversionForm',
  modalIsOpen: false,
};

export default (state = initialState, { type, payload }) => {
  if (type === GET_DETAILED_PRICING) {
    return {
      ...state,
      modalIsOpen: true,
      currentStep: 'advancedInfo', 
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
