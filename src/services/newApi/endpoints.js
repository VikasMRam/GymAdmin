import { get, post, patch, destroy } from 'redux-bees';

export default {
  getUser: { method: get, path: '/platform/users/:userId' },
  getCommunity: { method: get, path: '/marketplace/communities/:slug' },
};
