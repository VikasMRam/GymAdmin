import { buildApi, get, post, patch, destroy } from 'redux-bees';

const apiEndpoints = {
  getUser: { method: get, path: '/platform/users/:userId' },
  getCommunity: { method: get, path: '/marketplace/communities/:slug' },
};

const config = {
  baseUrl: 'http://www.lvh.me/v0',
  configureOptions: options => ({
    ...options,
    redirect: 'manual', // follow redirects - 301,302,303,307,308
    credentials: 'same-origin',
  }),
};

export default buildApi(apiEndpoints, config);
