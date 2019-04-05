import {
  get,
  post,
  patch,
  put,
  destroy,

  invalidateRequests,

  reducer,
} from 'redux-bees';

import {
  getEntity,
  getRelationship,
  getRequestResult,
  isRequestLoading,
  hasRequestStarted,
  getRequestError,
  getRequestHeaders,
  getRequestMeta,
  getRequestInfo,
} from './selectors';

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
export prefetch from './prefetch';
export middleware from './middleware';

export withApi from './withApi';
export withUser from './withUser';
