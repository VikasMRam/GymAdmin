import { serializeError } from 'serialize-error';

import { isBrowser } from 'sly/config';

const cleanResponse = (response) => {
  return ['url', 'status', 'statusText', 'headers']
    .reduce((cumul, key) => {
      cumul[key] = response[key];
      return cumul;
    }, {});
};

export const cleanError = (e) => {
  const error = {};
  Object.getOwnPropertyNames(e).forEach((key) => {
    if (key !== 'response') {
      error[key] = e[key];
    } else {
      error.response = cleanResponse(e.response);
    }
  });
  return serializeError(error);
};

export const logError = (e) => {
  if (isBrowser) {
    console.error(e);
  }
  console.error(JSON.stringify(cleanError(e)));
};

export const logWarn = (e) => {
  if (isBrowser) {
    console.warn(e);
  } else {
    console.warn(JSON.stringify(cleanError(e)));
  }
};
