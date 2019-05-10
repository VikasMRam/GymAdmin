import React from 'react';
import { shallow } from 'enzyme';

import SlyEvent from '../../../services/helpers/events';
import config from '../../../config';

import Router from 'sly/components/molecules/Router';

jest.mock('../../../services/helpers/events');
jest.mock('../../../config');

const sendPageView = jest.fn();

const events = {
  sendPageView,
};

SlyEvent.getInstance.mockImplementation(() => events);
config.isServer = true;

const location = {
  pathname: 'abc',
  search: '?foo=xyz',
};

const wrap = (props = {}) => shallow(<Router.WrappedComponent authenticated={{}} {...props} />);

global.scrollTo = jest.fn();

describe('Router', () => {
  beforeEach(() => {
    sendPageView.mockClear();
  });

  afterEach(() => {
    global.scrollTo.mockReset();
  });

  it('should call sendPageView', () => {
    const wrapper = wrap({ location });
    expect(sendPageView).toHaveBeenCalledWith('abc', '?foo=xyz');
    wrapper.setProps({ location });
    expect(sendPageView).toHaveBeenCalledTimes(1);
    wrapper.setProps({ location: { pathname: 'cba', search: '?baz=xyz' } });
    expect(sendPageView).toHaveBeenCalledTimes(2);
    expect(sendPageView).toHaveBeenCalledWith('cba', '?baz=xyz');
  });

  it('should call scrollTo only when path changes', () => {
    const wrapper = wrap({ location });
    expect(global.scrollTo).not.toHaveBeenCalled();
    wrapper.setProps({
      location: {
        ...location,
        search: '?change',
      },
    });
    expect(global.scrollTo).not.toHaveBeenCalled();
    wrapper.setProps({
      location: {
        ...location,
        pathname: 'change',
      },
    });
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should call scrollTo when some page-number changes', () => {
    const wrapper = wrap({
      location: {
        ...location,
        search: '?page-number=0',
      },
    });
    expect(global.scrollTo).not.toHaveBeenCalled();
    wrapper.setProps({
      location: {
        ...location,
        search: '?page-number=1',
      },
    });
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should call scrollTo when some page-size changes', () => {
    const wrapper = wrap({
      location: {
        ...location,
        search: '?page-size=0',
      },
    });
    expect(global.scrollTo).not.toHaveBeenCalled();
    wrapper.setProps({
      location: {
        ...location,
        search: '?page-size=1',
      },
    });
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should redirect when there is a 401', () => {
    config.isServer = true;

    const staticContext = {};
    const wrapper = wrap({
      requiresAuth: true,
      status: {
        user: { status: 401 },
      },
      location: {
        ...location,
        hash: '#myhash',
      },
      staticContext,
    });

    const redirect = wrapper.find('RefreshRedirect');
    expect(redirect).toHaveLength(1);
    expect(redirect.prop('to')).toEqual('/?loginRedirect=abc%3Ffoo%3Dxyz%23myhash');
    expect(staticContext.status).toEqual(302);
  });

  it('should not change statiContext in the browser', () => {
    config.isServer = false;

    const staticContext = {};
    const wrapper = wrap({
      requiresAuth: true,
      status: {
        user: { status: 401 },
      },
      location: {
        ...location,
        hash: '#myhash',
      },
      staticContext,
    });
    const redirect = wrapper.find('RefreshRedirect');
    expect(redirect).toHaveLength(1);
    expect(redirect.prop('to')).toEqual('/?loginRedirect=abc%3Ffoo%3Dxyz%23myhash');
    expect(staticContext.status).toEqual(undefined);
  });

  it('should not redirect if there is user', () => {
    const children = <div>children</div>;
    const wrapper = wrap({
      requiresAuth: true,
      status: {
        user: { status: 200 },
      },
      location: {
        ...location,
        hash: '#myhash',
      },
      children,
    });
    const redirect = wrapper.find('RefreshRedirect');
    expect(redirect).toHaveLength(0);
    expect(wrapper.equals(children)).toEqual(true);
  });

  it('should not redirect if not requiresAuth', () => {
    const children = <div>children</div>;
    const wrapper = wrap({
      requiresAuth: false,
      status: {
        user: { status: 401 },
      },
      location: {
        ...location,
        hash: '#myhash',
      },
      children,
    });
    const redirect = wrapper.find('RefreshRedirect');
    expect(redirect).toHaveLength(0);
    expect(wrapper.equals(children)).toEqual(true);
  });
});

