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

describe('exit intent', () => {
  let listeners;

  beforeEach(() => {
    jest.resetAllMocks();

    listeners = {};
    window.addEventListener = jest.fn((event, listener) => {
      listeners[event] = listener;
    });

    window.removeEventListener = jest.fn((event) => {
      delete listeners[event];
    });

    window.history.replaceState = jest.fn();
    window.history.pushState = jest.fn();

    setReferrer('');
    setState(null);
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

  it('should add the onblur listener', () => {
    const wrapper = wrap();

    console.log('listeners', listeners);

    expect(wrapper.find('div')).toHaveLength(1);
    expect(typeof listeners.blur).toEqual('function');
  });
});
