import React from 'react';
import { mount } from 'enzyme';

import withExitIntent from './withExitIntent';

const showModal = jest.fn();
const Component = withExitIntent(() => <div>hi</div>);

const wrap = (props = {}) => mount(
  <Component
    exitIntentContent="intentContent"
    showModal={showModal}
    {...props}
  />
);

const setReferrer = (referrer) => {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
    configurable: true,
  });
};

const setState = (state) => {
  Object.defineProperty(window.history, 'state', {
    value: state,
    configurable: true,
  });
};

const setHidden = (hidden) => {
  Object.defineProperty(document, 'hidden', {
    value: hidden,
    configurable: true,
  });
};

describe('exit intent', () => {
  let listeners;

  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(isoDate);
      }
    };
  }

  beforeEach(() => {
    jest.resetModules();

    jest.resetAllMocks();
    jest.useFakeTimers();

    listeners = {};
    window.addEventListener = jest.fn((event, listener) => {
      listeners[event] = listener;
    });

    window.removeEventListener = jest.fn((event) => {
      delete listeners[event];
    });

    document.addEventListener = jest.fn((event, listener) => {
      listeners[event] = listener;
    });

    document.removeEventListener = jest.fn((event) => {
      delete listeners[event];
    });

    window.history.replaceState = jest.fn();
    window.history.pushState = jest.fn();

    setReferrer('');
    setState(null);
    setHidden(false);
  });

  afterEach(() => {
    global.Date = RealDate;
    localStorage.removeItem('modal-shown');
  });

  it('should not add the popstate listener in case of an internal referrer', () => {
    setReferrer('http://localhost');
    setState({ intent: 'stay-intent' });

    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(typeof listeners.popstate).toEqual('undefined');
  });

  it('should not add the popstate listener in case of a refresh', () => {
    setReferrer('http://google.com');
    setState({ intent: 'stay-intent' });

    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(typeof listeners.popstate).toEqual('undefined');
  });

  it('should add the popstate listener, and show modal once', () => {
    setReferrer('http://google.com');

    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(typeof listeners.popstate).toEqual('function');

    listeners.popstate({ state: null });
    expect(showModal).not.toHaveBeenCalled();

    listeners.popstate({ state: { intent: 'stay-intent' } });
    expect(showModal).not.toHaveBeenCalled();

    listeners.popstate({ state: { intent: 'exit-intent' } });
    expect(showModal).toHaveBeenCalledWith('intentContent');
    expect(showModal).toHaveBeenCalledTimes(1);

    // listeners.popstate({ state: { intent: 'exit-intent' } });
    // expect(showModal).toHaveBeenCalledTimes(1);
  });

  it('should remove popstate listener', () => {
    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);

    expect(typeof listeners.popstate).toEqual('function');

    wrapper.unmount();

    expect(window.removeEventListener).toHaveBeenCalled();
    expect(typeof listeners.popstate).toEqual('undefined');
  });

  it('should add the focus blur listener', () => {
    const wrapper = wrap();

    expect(wrapper.find('div')).toHaveLength(1);

    [
      'visibilitychange',
      'mousemove',
      'keyup',
      'touchstart',
    ].forEach((event) => {
      expect(typeof listeners[event]).toEqual('function');
    });
  });

  it('should not fire popup when user returns before 10 seconds', () => {
    const wrapper = wrap();

    expect(wrapper.find('div')).toHaveLength(1);

    mockDate('2017-11-25T12:34:10Z');
    setHidden(true);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:19Z');
    setHidden(false);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:20Z');
    setHidden(true);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:29Z');
    setHidden(false);
    listeners.visibilitychange();

    expect(showModal).not.toHaveBeenCalled();
  });

  it('should fire popup once when user returns after 10 seconds', () => {
    const wrapper = wrap();

    expect(wrapper.find('div')).toHaveLength(1);

    mockDate('2017-11-25T12:34:10Z');
    setHidden(true);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:22Z');
    setHidden(false);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:21Z');
    setHidden(true);
    listeners.visibilitychange();

    mockDate('2017-11-25T12:34:32Z');
    setHidden(false);
    listeners.visibilitychange();

    expect(showModal).toHaveBeenCalledWith('intentContent');
    expect(showModal).toHaveBeenCalledTimes(1);
  });
});
