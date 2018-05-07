// https://github.com/diegohaz/arc/wiki/Actions
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
export const RESOURCE_CREATE_REQUEST = 'RESOURCE_CREATE_REQUEST';
export const RESOURCE_CREATE_SUCCESS = 'RESOURCE_CREATE_SUCCESS';
export const RESOURCE_CREATE_FAILURE = 'RESOURCE_CREATE_FAILURE';


export const resourceCreateRequest = (request, data) => ({
  type: RESOURCE_CREATE_REQUEST,
  payload: { ...request, data },
  meta: {
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    thunk: `${resource}Create`,
  },
});

export const resourceCreateSuccess = (request, detail, thunk) => ({
  type: RESOURCE_CREATE_SUCCESS,
  payload: detail,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const resourceCreateFailure = (request, error, thunk) => ({
  type: RESOURCE_CREATE_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const RESOURCE_LIST_READ_REQUEST = 'RESOURCE_LIST_READ_REQUEST';
export const RESOURCE_LIST_READ_SUCCESS = 'RESOURCE_LIST_READ_SUCCESS';
export const RESOURCE_LIST_READ_FAILURE = 'RESOURCE_LIST_READ_FAILURE';

export const resourceListReadRequest = request => ({
  type: RESOURCE_LIST_READ_REQUEST,
  payload: { ...request },
  meta: {
    thunk: `${request.resource}ListRead`,
  },
});

export const resourceListReadSuccess = (request, list, thunk) => ({
  type: RESOURCE_LIST_READ_SUCCESS,
  payload: list,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const resourceListReadFailure = (request, error, thunk) => ({
  type: RESOURCE_LIST_READ_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const RESOURCE_DETAIL_READ_REQUEST = 'RESOURCE_DETAIL_READ_REQUEST';
export const RESOURCE_DETAIL_READ_SUCCESS = 'RESOURCE_DETAIL_READ_SUCCESS';
export const RESOURCE_DETAIL_READ_FAILURE = 'RESOURCE_DETAIL_READ_FAILURE';

export const resourceDetailReadRequest = request => ({
  type: RESOURCE_DETAIL_READ_REQUEST,
  payload: { ...request },
  meta: {
    thunk: `${request.resource}DetailRead`,
  },
});

export const resourceDetailReadSuccess = (
  request,
  detail,
  thunk
) => ({
  type: RESOURCE_DETAIL_READ_SUCCESS,
  payload: detail,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const resourceDetailReadFailure = (request, error, thunk) => ({
  type: RESOURCE_DETAIL_READ_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const RESOURCE_UPDATE_REQUEST = 'RESOURCE_UPDATE_REQUEST';
export const RESOURCE_UPDATE_SUCCESS = 'RESOURCE_UPDATE_SUCCESS';
export const RESOURCE_UPDATE_FAILURE = 'RESOURCE_UPDATE_FAILURE';

export const resourceUpdateRequest = (request, data) => ({
  type: RESOURCE_UPDATE_REQUEST,
  payload: { ...request, data },
  meta: {
    thunk: `${resource}Update`,
  },
});

export const resourceUpdateSuccess = (request, detail, thunk) => ({
  type: RESOURCE_UPDATE_SUCCESS,
  payload: detail,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const resourceUpdateFailure = (request, error, thunk) => ({
  type: RESOURCE_UPDATE_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const RESOURCE_DELETE_REQUEST = 'RESOURCE_DELETE_REQUEST';
export const RESOURCE_DELETE_SUCCESS = 'RESOURCE_DELETE_SUCCESS';
export const RESOURCE_DELETE_FAILURE = 'RESOURCE_DELETE_FAILURE';

export const resourceDeleteRequest = (request) => ({
  type: RESOURCE_DELETE_REQUEST,
  payload: { ...request },
  meta: {
    thunk: `${resource}Delete`,
  },
});

export const resourceDeleteSuccess = (request, thunk) => ({
  type: RESOURCE_DELETE_SUCCESS,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});

export const resourceDeleteFailure = (request, error, thunk) => ({
  type: RESOURCE_DELETE_FAILURE,
  error: true,
  payload: error,
  meta: {
    request,
    thunk,
    resource: request.resource,
  },
});
