import apiUrl from './apiUrl';

import apiEndpoints from 'sly/web/services/api/endpoints';
import buildApi from 'sly/web/services/api/buildApi';

const config = {
  baseUrl: apiUrl,
  configureOptions: options => ({
    ...options,
    redirect: 'manual',
    credentials: 'include',
  }),
};

export default () => {
  return buildApi(apiEndpoints, config);
};
