// https://github.com/diegohaz/arc/wiki/Actions
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#modal
export const SEARCH_BOX_CHANGE_ADDRESS = 'SEARCH_BOX_CHANGE_ADDRESS';

export const changeAddress = value => ({
  type: SEARCH_BOX_CHANGE_ADDRESS,
  payload: value,
});
