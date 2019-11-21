import 'isomorphic-fetch';

export {
  get,
  post,
  patch,
  put,
  destroy,
} from './httpMethods';

export { invalidateRequests } from './actions';

export reducer from './reducer';

export {
  getEntity,
  getRelationship,
  getRequestResult,
  isRequestLoading,
  hasRequestStarted,
  getRequestHeaders,
  getRequestMeta,
  getRequestInfo,
  createMemoizedRequestInfoSelector,
} from './selectors';

export ApiProvider from './ApiProvider';
export createApi from './createApi';
export query from './query';
export prefetch from './prefetch';
export middleware from './middleware';

export withApi from './withApi';
export withUser from './withUser';
export withAuth from './withAuth';

export { normalizeResponse } from './helpers';
