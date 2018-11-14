import {
  MODAL_TYPE_JOIN_SLY,
  MODAL_TYPE_LOG_IN,
  MODAL_TYPE_RESET_PASSWORD,
  MODAL_TYPE_SIGN_UP
} from 'sly/constants/authenticated';

import { initialState } from './selectors';
import { AUTHENTICATE, AUTHENTICATE_CANCEL, AUTHENTICATE_SUCCESS } from './actions';

export default (state = initialState, { type }) => {
  switch (type) {
    case AUTHENTICATE: return { step: MODAL_TYPE_JOIN_SLY };
    case AUTHENTICATE_SUCCESS:
    case AUTHENTICATE_CANCEL: return { step: null };
    default: return state;
  }
};
