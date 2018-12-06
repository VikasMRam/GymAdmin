import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import { SET } from 'sly/store/controller/actions';
import NotificationController from 'sly/controllers/NotificationController';

describe('NotificationController', () => {
  const mockStore = configureStore([thunkMiddleware]);
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
  const compareNotificationObjects = (objs1 = [], objs2 = []) => {
    objs2.forEach((obj, i) => {
      if (objs1[i]) {
        const keys = Object.keys(obj);
        keys.forEach((key) => {
          expect(obj[key]).toEqual(objs1[i][key]);
        });
      }
    });
  };

  beforeEach(() => {
    spy.mockClear();
  });

  it('add info notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message)]);
  });

  it('add error notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message, 'error')]);
  });

  it.only('close notification', () => {
    const store = initStore({}, {
      NotificationController_123: {
        messages: [getNotificationObj(message, 'info')],
      },
    });
    const wrapper = wrap({ store, rand: 123 });

    wrapper.dive().instance().handleDismiss(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, []);
  });

  it('add multiple notifications', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    let action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message)]);
    wrapper.dive().instance().notifyInfo(message + message);
    action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [
      getNotificationObj(message + message),
      getNotificationObj(message),
    ]);
  });

  it('add multiple notifications and close one', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().notifyInfo(message);
    wrapper.dive().instance().notifyInfo(message + message);
    wrapper.dive().instance().handleDismiss(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message + message)]);
  });
});
