import { initialState } from './selectors';
import { HEADER_DROPDOWN_TOGGLE } from './actions';

export default (state = initialState, { type }) => {
  switch (type) {
    case HEADER_DROPDOWN_TOGGLE:
      return {
        ...state,
        dropdownOpen: !state.dropdownOpen,
      };
    default:
      return state;
  }
};
