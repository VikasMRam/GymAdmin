import apiEndpoints from 'sly/web/services/api/endpoints';
import buildApi from 'sly/web/services/api/buildApi';

// todo: need a standard way
const config = {
  baseUrl: 'http://www.lvh.me/v0',
  configureOptions: options => ({
    ...options,
    redirect: 'manual',
    credentials: 'include',
  }),
};

export default () => {
  return buildApi(apiEndpoints, config);
};
