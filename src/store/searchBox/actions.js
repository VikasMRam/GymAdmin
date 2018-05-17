// https://github.com/diegohaz/arc/wiki/Actions
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#modal
export const SEARCH_BOX_CHANGE_ADDRESS = 'SEARCH_BOX_CHANGE_ADDRESS';
export const SEARCH_BOX_SET_LOCATION = 'SEARCH_BOX_SET_LOCATION';
export const SEARCH_BOX_CLEAR_LOCATION = 'SEARCH_BOX_CLEAR_LOCATION';

export const changeAddress = value => ({
  type: SEARCH_BOX_CHANGE_ADDRESS,
  payload: value,
});

export const setLocation = value => ({
  type: SEARCH_BOX_SET_LOCATION,
  payload: value,
});

export const clearLocation = () => ({
  type: SEARCH_BOX_CLEAR_LOCATION,
});
