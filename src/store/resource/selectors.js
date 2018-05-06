// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
export const initialState = {};

export const initialResourceState = {
  list: [],
  detail: null,
};

export const getResourceState = (state = initialState, resource) =>
  state[resource] || initialResourceState;

export const getList = (state = initialState, { resource, path, queryString }) => {
  const resourceState = getResourceState(state, resource).list;

  if (!(resourceState && resourceState[path] && resourceState[path][queryString])) {
    // TODO: this is needed because we are not resetting the state in 
    // the resources reducer
    return { list: [], meta: {} };
  }

  const { data, meta } = resourceState[path][queryString];

  return {
    list: data,
    meta,
  };
};



export const getDetail = (state = initialState, { resource, path, queryString }) => {
  const resourceState = getResourceState(state, resource).detail;

  if (!(resourceState && resourceState[path] && resourceState[path][queryString])) {
    // TODO: this is needed because we are not resetting the state in 
    // the resources reducer
    return { id: null, meta: {} };
  }

  const { data, meta } = resourceState[path][queryString];

  return {
    ...data[0],
    meta,
  };
};



