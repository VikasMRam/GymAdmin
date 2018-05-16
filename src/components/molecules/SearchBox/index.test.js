import React from 'react';
import { mount } from 'enzyme';

import SearchBox from '.';
import { Icon, Input, Button } from 'sly/components/atoms';

function onChange() {
  // console.log('onChange');
}

function onSelect() {
  // console.log('onSelect');
}

const wrap = (props = {}) =>
  mount(<SearchBox {...props} value="" onChange={onChange} onSelect={onSelect} />);

const setupGoogleMock = () => {
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
};

// in test file.
beforeAll(() => {
  setupGoogleMock();
});

it('renders', () => {
  const wrapper = wrap();
  expect(wrapper.find(Icon)).toHaveLength(2);
  expect(wrapper.find(Button)).toHaveLength(2);
  expect(wrapper.find(Input)).toHaveLength(1);
});

it('renders with homeHero layout', () => {
  const wrapper = wrap({ layout: 'homeHero' });
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(1);
  expect(wrapper.find(Input)).toHaveLength(1);
});
