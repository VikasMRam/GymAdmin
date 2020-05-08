import { initialState } from './selectors';
import { AUTHENTICATE, AUTHENTICATE_CANCEL, AUTHENTICATE_SUCCESS } from './actions';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE: return { loggingIn: true, reason: payload.reason, options: payload.options };
    case AUTHENTICATE_SUCCESS:
    case AUTHENTICATE_CANCEL: return { ...state, loggingIn: false };
    default: return state;
  }
};
