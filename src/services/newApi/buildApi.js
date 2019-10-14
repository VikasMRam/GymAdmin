import applyUrlWithPlaceholders from './applyUrlWithPlaceholders';
import request from './request';

const pendingPromises = {};

const defaultConfigure = options => options;
const defaultAfterResolve = result => Promise.resolve(result);
const defaultAfterReject = result => Promise.reject(result);

export default function buildApi(endpoints, config = {}) {
  const {
    baseUrl,
    configureOptions = defaultConfigure,
    configureHeaders = defaultConfigure,
    afterResolve = defaultAfterResolve,
    afterReject = defaultAfterReject,
  } = config;

  return Object.keys(endpoints).reduce((acc, key) => {
    const { path, required, method: normalizeArguments } = endpoints[key];

    const requiredPlaceholders = required || [];
    const placeholderRegexp = /:([^\/$]+)/g;
    let match;

    while (match = placeholderRegexp.exec(path)) {
      requiredPlaceholders.push(match[1]);
    }

    acc[key] = (...args) => {
      const normalizedArguments = normalizeArguments(...args);

      const placeholders = normalizedArguments.placeholders || {};
      const options = normalizedArguments.options || {};

      const augmentedOptions = {
        ...options,
        headers: configureHeaders({
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
          ...options.headers,
        }),
      };

      const missingPlaceholders = requiredPlaceholders
        .filter(key => (
          !placeholders.hasOwnProperty(key) ||
          placeholders[key] == null
        ));

      let promise;

      if (missingPlaceholders.length > 0) {
        promise = Promise.reject({
          body: {
            errors: [
              `The "${key}" API call cannot be performed. The following params were not specified: ${missingPlaceholders.join(', ')}`,
            ],
          },
        });
      } else {
        const promiseId = JSON.stringify([key, args]);

        if (pendingPromises[promiseId]) {
          return pendingPromises[promiseId];
        }

        const req = request(
          baseUrl,
          applyUrlWithPlaceholders(path, placeholders),
          configureOptions(augmentedOptions)
        );

        promise = req
          .then(afterResolve)
          .then((result) => {
            delete pendingPromises[promiseId];
            return result;
          })
          .catch((error) => {
            delete pendingPromises[promiseId];
            return Promise.reject(error);
          })
          .catch(afterReject);

        pendingPromises[promiseId] = promise;
      }

      promise.actionName = key;
      promise.params = args;

      return promise;
    };

    acc[key].actionName = key;
    acc[key].method = normalizeArguments.method;

    return acc;
  }, {});
}
