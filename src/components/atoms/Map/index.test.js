import React from 'react';
import { shallow } from 'enzyme';

import Map from '.';

const wrap = (props = {}) => shallow(<Map {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders props when passed in', () => {
  const props = {
    center: { latitude: 1, longitude: 2 },
    defaultZoom: 12,
  };
  const wrapper = wrap(props);
  expect(wrapper.find(props)).toHaveLength(1);
});
