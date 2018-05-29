import { initialState } from './selectors';
import { COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL } from './actions';

export default (state = initialState, { type }) => {
  switch (type) {
    case COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL:
      return {
        ...state,
        modalFilterPanelVisible: !state.modalFilterPanelVisible,
      };
    default:
      return state;
  }
};
