// https://github.com/diegohaz/arc/wiki/Reducers
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#modal
import { initialState } from './selectors';
import { MODAL_SHOW, MODAL_HIDE } from './actions';

const reducer = (state = initialState, { type, payload = {} }) => {
  // #CONSOLE. LOG
  // console.log('Seeing modal and state',state);
  // console.log('Seeing modal type',type);
  // console.log('Seeing modal payload',payload);
  switch (type) {
    case MODAL_SHOW:
      return {
        ...state,
        [payload.name]: true,
      };
    case MODAL_HIDE:
      if (payload.name) {
        return {
          ...state,
          [payload.name]: false,
        };
      }
      return initialState;
    default:
      return state;
  }
};

export default reducer;
