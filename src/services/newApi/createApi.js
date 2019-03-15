import { buildApi } from 'redux-bees';

import { apiUrl } from 'sly/config';
import apiEndpoints from 'sly/services/newApi/endpoints';

const config = {
  baseUrl: apiUrl,
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
