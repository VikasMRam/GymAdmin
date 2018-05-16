export const GET_DETAILED_PRICING = 'GET_DETAILED_PRICING';
export const getDetailedPricing = ({ callbackRequested, advancedInfoSent }) => ({
  type: GET_DETAILED_PRICING,
  payload: { callbackRequested, advancedInfoSent },
});

export const NEXT = 'concierge/NEXT';
export const next = () => ({ type: NEXT });

export const CLOSE = 'concierge/CLOSE';
export const close = () => ({ type: CLOSE });

export const GOTO_STEP = 'concierge/GOTO_STEP';
export const gotoStep = step => ({ step, type: GOTO_STEP });

