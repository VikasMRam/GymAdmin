import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { SET } from 'sly/store/controller/actions';

import NotificationController from './NotificationController';

describe('NotificationController', () => {
  const mockStore = configureStore();
  const initStore = (props = {}, controllerProps = {}) => mockStore({
    controller: { ...controllerProps },
    ...props,
  });
  const spy = jest.fn();
  const message = 'test message';

  const wrap = (props = {}) =>
    shallow(<NotificationController {...props}>{spy}</NotificationController>).dive();

  const getNotificationObj = (message, type = 'default') => ({
    content: message,
    type,
  });

  beforeEach(() => {
    spy.mockClear();
  });

  it('add info notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ messages: [getNotificationObj(message)] });
  });

  it('add error notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ messages: [getNotificationObj(message, 'error')] });
  });

  it('close notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    wrapper.dive().instance().handleDismiss(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ messages: [] });
  });

  it('add multiple notifications', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    let action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ messages: [getNotificationObj(message)] });
    wrapper.dive().instance().notifyInfo(message + message);
    action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data)
      .toEqual({
        messages: [
          getNotificationObj(message + message),
          getNotificationObj(message),
        ],
      });
  });

  it('add multiple notifications and close one', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    wrapper.dive().instance().notifyInfo(message + message);
    wrapper.dive().instance().handleDismiss(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({
      messages: [
        getNotificationObj(message + message),
      ],
    });
  });
});
