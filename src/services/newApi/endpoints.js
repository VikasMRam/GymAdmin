import { get, patch, post, put, destroy } from 'redux-bees';

export default {
  getUser: { method: get, path: '/platform/users/:id' },
  updateUser: { method: patch, path: '/platform/users/:id' },
  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  getCommunities: { method: get, path: '/marketplace/communities' },
  getSearchResources: { method: get, path: '/platform/search-resources' },
  getUserSaves: { method: get, path: '/marketplace/user-saves' },
};
