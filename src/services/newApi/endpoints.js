import { get, patch, post, put, destroy } from 'redux-bees';

export default {
  getUser: { method: get, path: '/platform/users/:id' },
  updateUser: { method: patch, path: '/platform/users/:id' },
  updateUserSave: { method: patch, path: '/marketplace/user-saves/:id' },
  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  getCommunities: { method: get, path: '/marketplace/communities' },
  getSearchResources: { method: get, path: '/platform/search-resources' },
  getUserSaves: { method: get, path: '/marketplace/user-saves' },
  getUserSave: { method: get, path: '/marketplace/user-saves/:id' },
  setPassword: { method: post, path: '/platform/auth/password' },
  updatePassword: { method: post, path: '/platform/auth/password/update' },
};
