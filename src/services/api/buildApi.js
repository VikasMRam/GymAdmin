import applyUrlWithPlaceholders from './applyUrlWithPlaceholders';
import apiFetch from './apiFetch';

import makeApiCallAction from 'sly/services/api/makeApiCallAction';

const defaultConfigure = options => options;

export default function buildApi(endpoints, config = {}) {
  const {
    baseUrl,
    configureOptions = defaultConfigure,
    configureHeaders = defaultConfigure,
  } = config;

  // wrap config
  const request = (path, placeholders, requestOptions) => {
    const augmentedOptions = {
      ...requestOptions,
      headers: configureHeaders({
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        ...requestOptions.headers,
      }),
    };

    return apiFetch(
      baseUrl,
      applyUrlWithPlaceholders(path, placeholders),
      configureOptions(augmentedOptions),
    );
  };

  return Object.keys(endpoints).reduce((acc, key) => {
    const { path, required, method, ssrIgnore } = endpoints[key];

    const requiredPlaceholders = required || [];
    const placeholderRegexp = /:([^\/$]+)/g;
    let match;

    while (match = placeholderRegexp.exec(path)) {
      requiredPlaceholders.push(match[1]);
    }

    const normalizeArguments = (...args) => {
      const { placeholders = {}, options = {} } = method(...args);
      const missingPlaceholders = requiredPlaceholders
        .filter(key => (
          !placeholders.hasOwnProperty(key) ||
          placeholders[key] == null
        ));


      if (missingPlaceholders.length > 0) {
        throw new Error(`The "${key}" API call cannot be performed. The following params were not specified: ${missingPlaceholders.join(', ')}`);
      }

      return { placeholders, options };
    };

    acc[key] = (...args) => {
      const { placeholders, options } = normalizeArguments(...args);
      return request(path, placeholders, options);
    };

    acc[key].actionName = key;
    acc[key].method = method;
    acc[key].asAction = (...args) => {
      const { placeholders, options } = normalizeArguments(...args);
      return makeApiCallAction(request, { placeholders, path, options, actionName: key });
    };
    acc[key].ssrIgnore = ssrIgnore;

    return acc;
  }, {});
}
