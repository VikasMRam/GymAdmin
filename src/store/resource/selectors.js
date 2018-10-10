import { objectToURLQueryParams } from 'sly/services/helpers/url';

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

export const getResourceState = (state = initialState, resource, queryParams) => {
  let resourceKey = resource;

  if (queryParams) {
    resourceKey = `${resource}_${objectToURLQueryParams(queryParams, { encode: false })}`;
  }

  return state[resourceKey] || initialResourceState;
};

export const getList = (state = initialState, resource, queryParams) =>
  getResourceState(state, resource, queryParams).list;

export const getDetail = (state = initialState, resource, queryParams) =>
  getResourceState(state, resource, queryParams).detail;
