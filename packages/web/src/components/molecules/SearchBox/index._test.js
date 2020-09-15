import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from '.';

const onChange = jest.fn();
const onSelect = jest.fn();
const onSearchButtonClick = jest.fn();
const wrap = (props = {}) =>
  shallow(<SearchBox {...props} onChange={onChange} onSelect={onSelect} onSearchButtonClick={onSearchButtonClick} />);

const setupGoogleMock = () => {
  /** * Mock Google Maps JavaScript API ** */
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
};

// in test file.
beforeAll(() => {
  setupGoogleMock();
});

// todo: add more tests
describe('SearchBox', () => {
  it('renders', () => {
    const wrapper = wrap();
    const { google } = global.window;
    const loadMaps = wrapper.dive().find(google.maps);
    const autocomplete = loadMaps.dive().find(google.maps.places.AutocompleteService);

    expect(autocomplete).toHaveLength(1);
    expect(autocomplete.dive().find('Input')).toHaveLength(1);
  });

  it('renders with homeHero layout', () => {
    const wrapper = wrap({ layout: 'homeHero' });
    const { google } = global.window;
    const loadMaps = wrapper.dive().find(google.maps);
    const autocomplete = loadMaps.dive().find(google.maps.places.AutocompleteService);

    expect(autocomplete).toHaveLength(1);
    expect(autocomplete.dive().find('Input')).toHaveLength(1);
  });
});
