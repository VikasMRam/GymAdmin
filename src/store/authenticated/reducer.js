import { initialState } from './selectors';
import { AUTHENTICATE, AUTHENTICATE_CANCEL, AUTHENTICATE_SUCCESS } from './actions';

export default (state = initialState, { type }) => {
  switch (type) {
    case AUTHENTICATE: return { loggingIn: true };
    case AUTHENTICATE_SUCCESS:
    case AUTHENTICATE_CANCEL: return { loggingIn: false };
    default: return state;
  }
};
