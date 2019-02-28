import { buildApi } from 'redux-bees';

import apiEndpoints from 'sly/services/newApi/endpoints';

const config = {
  baseUrl: 'http://www.lvh.me/v0',
  configureOptions: options => ({
    ...options,
    redirect: 'manual',
    credentials: 'same-origin',
  }),
};

export default (initConfig = {}) => {
  return buildApi(apiEndpoints, {
    ...config,
    ...initConfig,
  });
};
