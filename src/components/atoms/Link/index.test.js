import React from 'react';
import { shallow } from 'enzyme';
import { Link as RRLink } from 'react-router-dom';

import Link, { Anchor } from 'sly/components/atoms/Link';
import { addEventToUrl } from 'sly/services/helpers/queryParamEvents';

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

it('renders a Link and adds sly_event params when an event is included', () => {
  const event = { action: 'clicky-clicky', category: 'mousey-mousey' };
  const wrapper = wrap({ to: '/test', event }).dive();

  expect(wrapper.find(RRLink).prop('to')).toEqual(addEventToUrl('/test', event));
});

it('renders an Anchor and adds sly_event params when an event is included', () => {
  const event = { action: 'clicky-clicky', category: 'mousey-mousey' };
  const wrapper = wrap({ href: 'http://google.com', event }).dive();

  expect(wrapper.find('a').prop('href')).toEqual(addEventToUrl('http://google.com', event));
});
