// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
export const initialState = {};

export const initialResourceState = {
  list: {
    ids: [],
    meta: {},
  },
  detail: {
    id: null,
    ids: [],
    meta: {},
  },
};

export const getResourceState = (state = initialState, resource) =>
  state[resource] || initialResourceState;

export const getList = (state = initialState, resource) =>
  getResourceState(state, resource).list.ids;

export const getDetail = (state = initialState, resource) =>
  getResourceState(state, resource).detail;


