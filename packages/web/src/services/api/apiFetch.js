/**
 * Runs the redux-bees api request.
 * The baseUrl can also be a function which is assessed at runtime.
 *
 * @param {String|Function} baseUrl
 * @param {String} path
 * @param {Object} options
 * @return {Promise}
 */

export default function apiFetch(baseUrl, path, options) {
  const url = (typeof baseUrl === 'function' ? baseUrl() : baseUrl) + path;
  console.log('url, options', url, options);
  return fetch(url, options)
    .then((res) => {
      const headers = {};

      res.headers.forEach((value, name) => {
        headers[name] = value;
      });

      const response = {
        status: res.status,
        headers,
      };

      if (![204, 301].includes(res.status)) {
        return res.json().then(body => ({ ...response, body }));
      }

      return Promise.resolve(response);
    })
    .then((response) => {
      console.log('response', response);
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }

      return Promise.reject(response);
    });
}

