import React from 'react';
import { mount } from 'enzyme';
import { Link as RRLink, Router, BrowserRouter } from 'react-router-dom';

import Link from '.';

import { routes as routesPropType } from 'sly/common/propTypes/routes';
import { addEventToUrl } from 'sly/web/services/helpers/queryParamEvents';

const { history } = new BrowserRouter();
const context = { routes: [{ path: '/test', component: () => null }] };
const childContextTypes = {
  routes: routesPropType,
};
const wrap = (props = {}) => mount(<Router history={history}><Link {...props} /></Router>, { context, childContextTypes });

describe('Link|Web', () => {
  it('renders anchor with href', () => {
    const wrapper = wrap({ href: 'http://google.com', children: 'Hey' });
    expect(wrapper.find('Root')).toHaveLength(1);
  });

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'submit' });
    expect(wrapper.find('a[type="submit"]')).toHaveLength(1);
  });

  it('renders Anchor by default', () => {
    const wrapper = wrap();
    expect(wrapper.find('Root')).toHaveLength(1);
  });

  it('renders Link when to is passed in', () => {
    const wrapper = wrap({ to: '/test' });
    expect(wrapper.find(RRLink)).toHaveLength(1);
  });

  it('renders a Link and adds sly_event params when an event is included', () => {
    const event = { action: 'clicky-clicky', category: 'mousey-mousey' };
    const wrapper = wrap({ to: '/test', event });
    expect(wrapper.find(RRLink).prop('to')).toEqual(addEventToUrl('/test', event));
  });

  it('renders an Anchor and adds sly_event params when an event is included', () => {
    const event = { action: 'clicky-clicky', category: 'mousey-mousey' };
    const wrapper = wrap({ href: 'http://google.com', event });

    expect(wrapper.find('a').prop('href')).toEqual(addEventToUrl('http://google.com', event));
  });
});
