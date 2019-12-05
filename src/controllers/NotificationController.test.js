import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import { SET } from 'sly/store/controller/actions';
import NotificationController from 'sly/controllers/NotificationController';

const mockGetMessageId = message => `notificationMessage_${message}`;
jest.mock('sly/services/helpers/utils', () => ({
  randomHexNumber: jest.fn().mockReturnValue(123),
}));
jest.mock('lodash', () => ({
  uniqueId: m => mockGetMessageId(m),
}));

describe('NotificationController', () => {
  const mockStore = configureStore([thunkMiddleware]);
  const initStore = (props = {}, controllerProps = {}) => mockStore({
    controller: { ...controllerProps },
    ...props,
  });
  const spy = jest.fn();
  const message = 'test message';

  const wrap = (props = {}) =>
    shallow(<NotificationController {...props}>{spy}</NotificationController>).dive().dive();

  const getControllerStore = (messages) => {
    const key = 'NotificationController_123';
    const r = {};
    r[key] = { messages };
    return r;
  };
  const getNotificationObj = (message, type = 'default') => ({
    id: mockGetMessageId(message),
    content: message,
    type,
  });
  const compareNotificationObjects = (objs1 = [], objs2 = []) => {
    objs2.forEach((obj, i) => {
      if (objs1[i]) {
        const keys = Object.keys(obj).filter(i => i !== 'id');
        keys.forEach((key) => {
          expect(obj[key]).toEqual(objs1[i][key]);
        });
      }
    });
  };

  beforeEach(() => {
    spy.mockClear();
    jest.clearAllMocks();
  });

  it('add info notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.instance().notifyInfo(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message)]);
  });

  it('add error notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.instance().notifyError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message, 'error')]);
  });

  it('close notification', () => {
    const store = initStore({}, getControllerStore([getNotificationObj(message)]));
    const wrapper = wrap({ store });

    wrapper.instance().handleDismiss(mockGetMessageId(message));
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, []);
  });

  it('add multiple notifications', () => {
    const store = initStore({}, getControllerStore([getNotificationObj(message)]));
    const wrapper = wrap({ store });

    wrapper.instance().notifyInfo(message + message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [
      getNotificationObj(message + message),
      getNotificationObj(message),
    ]);
  });

  it('add multiple notifications and close one', () => {
    const store = initStore(
      {},
      getControllerStore([getNotificationObj(message), getNotificationObj(message + message)])
    );
    const wrapper = wrap({ store });

    wrapper.instance().handleDismiss(mockGetMessageId(message));
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    compareNotificationObjects(action.payload.data.messages, [getNotificationObj(message + message)]);
  });
});
