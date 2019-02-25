import { buildApi, get, post, patch, destroy } from 'redux-bees';

const apiEndpoints = {
  getCommunity: { method: get, path: '/marketplace/communities/:slug' },
};

const config = {
  baseUrl: 'http://www.lvh.me/v0',
};

export default buildApi(apiEndpoints, config);
