import { initialState } from './selectors';
import { SEARCH_BOX_CHANGE_ADDRESS } from './actions';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_BOX_CHANGE_ADDRESS:
      return {
        ...state,
        address: payload,
      };
    default:
      return state;
  }
};
