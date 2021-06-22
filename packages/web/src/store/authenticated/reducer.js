import { AUTHENTICATE, AUTHENTICATE_CANCEL, AUTHENTICATE_SUCCESS } from './actions';

export const initialState = {
  loggingIn: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE: return { loggingIn: true, reason: payload.reason, options: payload.options };
    case AUTHENTICATE_SUCCESS:
    case AUTHENTICATE_CANCEL: return { ...state, loggingIn: false };
    default: return state;
  }
};

export default reducer;
