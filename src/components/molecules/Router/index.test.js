import React from 'react';
import { shallow } from 'enzyme';

import SlyEvent from '../../../services/helpers/events';

import { Router } from 'sly/components/molecules/Router';

jest.mock('../../../services/helpers/events');

const sendPageView = jest.fn();

const events = {
  sendPageView,
};

SlyEvent.getInstance.mockImplementation(() => events);

const location = {
  pathname: 'abc',
  search: '?foo=xyz',
};

const wrap = (props = {}) => shallow(<Router {...props} />);

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
});

