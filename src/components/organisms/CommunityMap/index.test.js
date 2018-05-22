import React from 'react';
import { shallow } from 'enzyme';
import { Marker, InfoWindow } from 'react-google-maps';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import Map from 'sly/components/atoms/Map';

import CommunityMap from '.';

const wrap = (props = {}) => shallow(<CommunityMap {...props} />);

const {
  similarProperties,
} = RhodaGoldmanPlaza;
const props = {
  community:RhodaGoldmanPlaza,
  similarProperties,
};

it('renders Map with proper props', () => {
  const wrapper = wrap(props);
  expect(wrapper.find(Map)).toHaveLength(1);
  expect(wrapper.find(Marker)).toHaveLength(4);
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

it('renders only one InfoWindow at a time', () => {
  const wrapper = wrap(props);
  wrapper
    .find(Marker)
    .at(0)
    .simulate('click');
  wrapper
    .find(Marker)
    .at(1)
    .simulate('click');
  expect(wrapper.find(InfoWindow)).toHaveLength(1);
});
