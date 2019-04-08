import { get, patch, post, put, destroy } from 'redux-bees';

// method names should start with `get`, `create`, `update`, `delete`
// patch is prefered over put as per specification
export default {
  getUser: { method: get, path: '/platform/users/:id' },
  registerUser: { method: post, path: '/platform/auth/register' },
  loginUser: { method: post, path: '/platform/auth/login' },
  thirdpartyLogin: { method: post, path: '/platform/auth/third-party' },
  recoverPassword: { method: post, path: '/platform/auth/recover' },
  updateUser: { method: patch, path: '/platform/users/:id' },
  getUuidAux: { method: get, path: '/platform/uuid-auxes/:id' },
  updateUuidAux: { method: patch, path: '/platform/uuid-auxes/:id' },
  updateUserSave: { method: patch, path: '/marketplace/user-saves/:id' },
  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  getCommunities: { method: get, path: '/marketplace/communities' },
  getSearchResources: { method: get, path: '/platform/search-resources' },
  getUserSaves: { method: get, path: '/marketplace/user-saves' },
  getUserSave: { method: get, path: '/marketplace/user-saves/:id' },
  setPassword: { method: post, path: '/platform/auth/password' },
  updatePassword: { method: post, path: '/platform/auth/password/update' },
  createUuidAction: { method: post, path: '/platform/uuid-actions' },
};
