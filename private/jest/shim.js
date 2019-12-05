global.fetch = require('isomorphic-fetch');

global.requestAnimationFrame = /* istanbul ignore next */ (callback) => {
  setTimeout(callback, 0);
};

// https://github.com/jsdom/jsdom/issues/1843#issuecomment-357556277
/* eslint-disable-next-line no-console */
global.alert = (msg) => { console.log(msg); };
global.scroll = jest.fn();
global.HTMLElement.prototype.scrollIntoView = jest.fn();
global.HTMLElement.prototype.scroll = jest.fn();

/** * Mock Google Maps JavaScript API ** */
// https://github.com/kenny-hibino/react-places-autocomplete/issues/189
const google = {
  maps: {
    places: {
      AutocompleteService: () => {},
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
    Geocoder: () => {},
    GeocoderStatus: {
      ERROR: 'ERROR',
      INVALID_REQUEST: 'INVALID_REQUEST',
      OK: 'OK',
      OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
      REQUEST_DENIED: 'REQUEST_DENIED',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR',
      ZERO_RESULTS: 'ZERO_RESULTS',
    },
  },
};
global.window.google = google;
