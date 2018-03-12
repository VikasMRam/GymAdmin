// https://github.com/diegohaz/arc/wiki/API-service
import 'isomorphic-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl, authTokenUrl } from '../../config';

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

export const parseEndpoint = (endpoint, params) => {
  const url = endpoint.indexOf('http') === 0 ? endpoint : apiUrl + endpoint;
  const querystring = params ? `?${stringify(params)}` : '';
  return `${url}${querystring}`;
};

const api = {};

api.request = (endpoint, { params, ...settings } = {}) => {
  const parsedSettings = parseSettings(settings);

  // FIXME: this should go whith the homogenization of the API
  if (endpoint === '/users/me/') {
    parsedSettings.headers = [];
    endpoint = 'http://www.lvh.me:3000/users/me';
  }
  if (endpoint === '/personalization/useractions/track/') {
    endpoint = 'http://www.lvh.me:3000/personalization/useractions/track';
  }

  const parsedEndpoint = parseEndpoint(endpoint, params);

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
});

export default api;
