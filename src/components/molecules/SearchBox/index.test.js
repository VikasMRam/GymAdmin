import React from 'react';
import { mount } from 'enzyme';
import { action } from '@storybook/addon-actions';

import { Icon, Input, Button } from 'sly/components/atoms';
import SearchBox from 'sly/components/molecules/SearchBox';

const wrap = (props = {}) =>
  mount(<SearchBox {...props} value="" onChange={action('onChange')} onSelect={action('onSelect')} onSeachButtonClick={action('onSeachButtonClick')} />);

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
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(1);
  expect(wrapper.find(Input)).toHaveLength(1);
});

it('renders with homeHero layout', () => {
  const wrapper = wrap({ layout: 'homeHero' });
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(1);
  expect(wrapper.find(Input)).toHaveLength(1);
});
