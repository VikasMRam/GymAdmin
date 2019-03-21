import { apiUrl } from 'sly/config';
import apiEndpoints from 'sly/services/newApi/endpoints';
import buildApi from 'sly/services/newApi/buildApi';

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
