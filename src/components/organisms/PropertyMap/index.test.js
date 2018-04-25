import React from 'react';
import { shallow, mount } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import PropertyMap from '.';

import Map from 'sly/components/atoms/Map';
import { Marker, InfoWindow } from 'react-google-maps';

const wrap = (props = {}) => shallow(<PropertyMap {...props} />);

// it('renders children when passed in', () => {
//   const wrapper = wrap({ children: 'test' });
//   expect(wrapper.contains('test')).toBe(false);
// });

const {
  id,
  name,
  startingRate,
  mainImage,
  address,
  similarProperties,
} = RhodaGoldmanPlaza;
const props = {
  id,
  name,
  startingRate,
  mainImage,
  address,
  similarProperties,
};

it('renders Map with proper props', () => {
  const wrapper = wrap(props);
  expect(wrapper.find(Map)).toHaveLength(1);
  expect(wrapper.find(Marker)).toHaveLength(5);
});

it('renders InfoWindow when a Marker is clicked', () => {
  const wrapper = wrap(props);
  wrapper
    .find(Marker)
    .at(0)
    .simulate('click');
  expect(wrapper.find(InfoWindow)).toHaveLength(1);
  wrapper.find(InfoWindow).simulate('closeClick');
  expect(wrapper.find(InfoWindow)).toHaveLength(0);
});
