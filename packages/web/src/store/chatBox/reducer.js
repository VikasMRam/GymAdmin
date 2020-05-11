import { initialState } from './selectors';
import { CHAT_BOX_FOOTER_REACHED_TOGGLE } from './actions';

export default (state = initialState, { type }) => {
  switch (type) {
    case CHAT_BOX_FOOTER_REACHED_TOGGLE:
      return {
        ...state,
        footerReached: !state.footerReached,
      };
    default:
      return state;
  }
};
