import { initialState } from './selectors';
import { AUTHENTICATE, AUTHENTICATE_CANCEL, AUTHENTICATE_SUCCESS } from './actions';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE: return { loggingIn: true, reason: payload.reason };
    case AUTHENTICATE_SUCCESS:
    case AUTHENTICATE_CANCEL: return { loggingIn: false };
    default: return state;
  }
};
