// https://github.com/diegohaz/arc/wiki/Reducers
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

import {
  initialState,
  getResourceState,
  getList,
  getDetail,
} from './selectors';

import {
  RESOURCE_CREATE_SUCCESS,
  RESOURCE_LIST_READ_REQUEST,
  RESOURCE_LIST_READ_SUCCESS,
  RESOURCE_DETAIL_READ_REQUEST,
  RESOURCE_DETAIL_READ_SUCCESS,
  RESOURCE_UPDATE_SUCCESS,
  RESOURCE_DELETE_SUCCESS,
} from './actions';

const updateOrDeleteReducer = (state, { type, payload, meta }) => {
  const resource = get(meta, 'resource');
  const resourceKey = get(meta, 'resourceKey');
  const needle = get(meta, 'request.needle');
  const needleIsObject = typeof needle === 'object';
  const list = getList(state, resource);
  const index = needleIsObject ? findIndex(list.ids, needle) : list.ids.indexOf(needle);

  if (index < 0) {
    return state;
  }

  let newIds = [...list.ids.slice(0, index)];
  if (needleIsObject) {
    newIds = [...newIds, ...list.ids[index], ...payload.ids];
  } else if (payload) {
    newIds = [...newIds, ...payload.ids];
  }
  newIds = [...newIds, ...list.ids.slice(index + 1)];

  switch (type) {
    case RESOURCE_UPDATE_SUCCESS:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          list: {
            ids: newIds,
          },
        },
      };
    case RESOURCE_DELETE_SUCCESS:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          list: {
            ids: [...list.ids.slice(0, index), ...list.ids.slice(index + 1)],
          },
        },
      };
    // istanbul ignore next
    default:
      return state;
  }
};

export default (state = initialState, { type, payload, meta }) => {
  const resource = get(meta, 'resource');
  const resourceKey = get(meta, 'resourceKey');

  if (!resource) {
    return state;
  }

  switch (type) {
    case RESOURCE_CREATE_SUCCESS:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          detail: {
            ...payload,
            id: payload.ids[0],
          },
        },
      };

    case RESOURCE_LIST_READ_REQUEST:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          list: getList(initialState, resource),
        },
      };
    case RESOURCE_LIST_READ_SUCCESS:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          list: payload,
        },
      };

    case RESOURCE_DETAIL_READ_REQUEST:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          detail: getDetail(initialState, resource),
        },
      };
    case RESOURCE_DETAIL_READ_SUCCESS:
      return {
        ...state,
        [resourceKey]: {
          ...getResourceState(state, resource),
          detail: {
            ...payload,
            id: payload.ids[0],
          },
        },
      };

    case RESOURCE_UPDATE_SUCCESS:
    case RESOURCE_DELETE_SUCCESS: {
      return updateOrDeleteReducer(state, { type, payload, meta });
    }
    default:
      return state;
  }
};
