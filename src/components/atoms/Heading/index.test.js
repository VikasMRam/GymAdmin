import React from 'react';
import { shallow } from 'enzyme';
import Heading from '.';

const wrap = (props = {}) => shallow(<Heading {...props} />).dive();

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' });
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});

it('renders h2 by default', () => {
  const wrapper = wrap();
  expect(wrapper.find('h2')).toHaveLength(1);
});

it('renders h1 for hero', () => {
  const wrapper = wrap({ level: 'hero' });
  expect(wrapper.find('h1')).toHaveLength(1);
});

it('renders hLevel when size is passed in', () => {
  const wrapper = wrap({ size: 'subtitle' });
  expect(wrapper.find('h2')).toHaveLength(1);
});
