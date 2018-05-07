// https://github.com/diegohaz/arc/wiki/API-service
import 'isomorphic-fetch';
import merge from 'lodash/merge';
import { apiUrl, authTokenUrl } from 'sly/config';
import genUri from './genUri';

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
};

export const parseJSON = response => response.json();

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
      method,
      headers,
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

['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) =>
    api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  setCookie(cookie) {
    this.settings.headers = {
      ...this.settings.headers,
      Cookie: cookie,
    };
  },

  requestAuthToken() {
    return fetch(authTokenUrl, { credentials: 'same-origin' })
      .then(checkStatus)
      .then(parseJSON)
      .then(json => this.setToken(json.jwt_token));
  },

  request(endpoint, settings) {
    // FIXME: More specific way of doing this
    let tries = 2;
    const aTry = () =>
      api.request(endpoint, merge({}, this.settings, settings)).catch((error) => {
        console.log('Seeing error in ',error);
        if ([401, 403].includes(error.response.status) && tries--) {
          this.unsetToken();
          return this.requestAuthToken().then(aTry);
        }
        throw error;
      });

    return aTry();
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

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },

  uri(resource, id, params) {
    return genUri(resource, id, params);
  },
});

export default api;
