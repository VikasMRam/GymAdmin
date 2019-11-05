import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import RRLink from 'react-router-dom/Link';
import Link, { Anchor } from 'sly/components/atoms/Link';

const context = { routes: [{ path: '/test', component: () => null }] };
const wrap = (props = {}) => shallow(<Link {...props} />, { context });

it('renders anchor with href', () => {
  const wrapper = wrap({ href: 'http://google.com', children: 'Hey' });
  expect(wrapper.find(Anchor)).toHaveLength(1);
});

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders props when passed in', () => {
  const wrapper = wrap({ type: 'submit' });
  expect(wrapper.find({ type: 'submit' })).toHaveLength(1);
});

it('renders Anchor by default', () => {
  const wrapper = wrap();
  expect(wrapper.find(Anchor)).toHaveLength(1);
});

it('renders Link when to is passed in', () => {
  const wrapper = wrap({ to: '/test' }).dive();
  expect(wrapper.find(RRLink)).toHaveLength(1);
});
