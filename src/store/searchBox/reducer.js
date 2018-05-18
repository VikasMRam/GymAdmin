import { initialState } from './selectors';
import {
  SEARCH_BOX_CHANGE_ADDRESS,
  SEARCH_BOX_SET_LOCATION,
  SEARCH_BOX_CLEAR_LOCATION,
} from './actions';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_BOX_CHANGE_ADDRESS:
      return {
        ...state,
        address: payload,
        location: null,
      };
    case SEARCH_BOX_SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case SEARCH_BOX_CLEAR_LOCATION:
      return {
        ...state,
        location: null,
        address: '',
      };
    default:
      return state;
  }
};
