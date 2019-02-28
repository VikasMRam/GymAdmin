import {
  get,
  post,
  patch,
  put,
  destroy,

  getEntity,
  getRelationship,
  getRequestResult,
  isRequestLoading,
  hasRequestStarted,
  getRequestError,
  getRequestHeaders,
  getRequestMeta,
  getRequestInfo,

  invalidateRequests,

  reducer,
} from 'redux-bees';

export {
  get,
  post,
  patch,
  put,
  destroy,

  getEntity,
  getRelationship,
  getRequestResult,
  isRequestLoading,
  hasRequestStarted,
  getRequestError,
  getRequestHeaders,
  getRequestMeta,
  getRequestInfo,

  invalidateRequests,

  reducer,
};

export createApi from './createApi';
export query from './query';
export middleware from './middleware';

export ApiProvider from './ApiProvider';
export withApi from './withApi';
