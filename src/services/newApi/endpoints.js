import { get, patch, post, put, destroy } from 'redux-bees';

// method names should start with `get`, `create`, `update`, `delete`
// patch is prefered over put as per specification
export default {
  getUser: { method: get, path: '/platform/users/:id' },
  updateUser: { method: patch, path: '/platform/users/:id' },

  getUuidAux: { method: get, path: '/platform/uuid-auxes/:id' },
  updateUuidAux: { method: patch, path: '/platform/uuid-auxes/:id' },
  getUserSaves: { method: get, path: '/marketplace/user-saves' },

  getUserSave: { method: get, path: '/platform/user-saves/:id' },
  updateUserSave: { method: patch, path: '/platform/user-saves/:id' },
  createUserSave: { method: post, path: '/platform/user-saves' },
  createUuidAction: { method: post, path: '/platform/uuid-actions' },

  registerUser: { method: post, path: '/platform/auth/register' },
  loginUser: { method: post, path: '/platform/auth/login' },
  logoutUser: { method: destroy, path: '/platform/auth/logout' },
  thirdpartyLogin: { method: post, path: '/platform/auth/third-party' },
  setPassword: { method: post, path: '/platform/auth/password' },
  updatePassword: { method: post, path: '/platform/auth/password/update' },
  recoverPassword: { method: post, path: '/platform/auth/recover' },

  getCommunity: { method: get, path: '/marketplace/communities/:id' },
  getCommunities: { method: get, path: '/marketplace/communities' },

  getSearchResources: { method: get, path: '/platform/search-resources' },

  createQuestion: { method: post, path: '/platform/questions' },
  createRating: { method: post, path: '/platform/ratings' },

  getClient: { method: get, path: '/marketplace/clients/:id' },
  updateClient: { method: patch, path: '/marketplace/clients/:id' },
};
