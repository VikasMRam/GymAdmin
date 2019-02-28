import { get, patch, post, put, destroy } from 'redux-bees';

export default {
  getUser: { method: get, path: '/platform/users/:userId' },
  updateUser: { method: patch, path: '/platform/users/:userId' },
  getCommunity: { method: get, path: '/marketplace/communities/:slug' },
  getCommunities: { method: get, path: '/marketplace/communities' },
  getSearchResources: { method: get, path: '/platform/search-resources' },
};
