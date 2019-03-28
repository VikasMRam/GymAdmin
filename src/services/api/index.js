// https://github.com/diegohaz/arc/wiki/API-service
import 'isomorphic-fetch';
import merge from 'lodash/merge';

import { apiUrl, authTokenUrl } from 'sly/config';
import genUri from 'sly/services/api/genUri';
import { logWarn } from 'sly/services/helpers/logging';

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  const error = new Error(`${response.status} ${response.statusText}`);
  error.location = response.headers.get('location');

  const { status, headers } = response;
  error.response = { status, headers };

  error.response = response;
  throw error;
};

export const parseJSON = response => response
  .json()
  .catch(error => {
    error.response = response;
    throw error;
  });

export const parseSettings = ({
  method = 'get',
  data,
  locale,
  ...otherSettings
} = {}) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  const settings = merge(
    {
      body: data ? JSON.stringify(data) : undefined,
      redirect: 'manual', // follow redirects - 301,302,303,307,308
      method,
      headers,
      credentials: 'include',
    },
    otherSettings
  );

  return settings;
};

export const parseEndpoint = (endpoint) => endpoint.indexOf('http') === 0
  ? endpoint
  : apiUrl + endpoint;

const api = {};

api.request = (endpoint, settings = {}) => {
  const parsedSettings = parseSettings(settings);
  const parsedEndpoint = parseEndpoint(endpoint);

  return fetch(parsedEndpoint, parsedSettings)
    .then(checkStatus)
    .then(parseJSON);
};
['delete', 'get'].forEach((method) => {
  api[method] = (endpoint, settings) =>
    api.request(endpoint, { method, ...settings });
});

['post', 'put', 'PATCH'].forEach((method) => {
  api[method] = (endpoint, data, settings) =>
    api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setHeader(name, value) {
    this.settings.headers = {
      ...this.settings.headers,
      [name]: value,
    };
  },

  requestAuthToken() {
    return fetch(authTokenUrl).then(checkStatus);
  },

  request(endpoint, settings) {
    let firstError = null;
    const doRequest = () => api
      .request(endpoint, merge({}, this.settings, settings))
      .catch((error) => {
        if (!firstError && error.response && [401, 403].includes(error.response.status)) {
          firstError = error;
          return this.requestAuthToken()
            .catch(logWarn)
            .then(doRequest);
        }
        return Promise.reject(firstError || error);
      });
    return doRequest();
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'get', ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  PATCH(endpoint, data, settings) {
    return this.request(endpoint, { method: 'PATCH', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },

  uri(resource, id, params) {
    return genUri(resource, id, params);
  },
});

export default api;
