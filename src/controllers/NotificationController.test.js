import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import NotificationController from 'sly/controllers/NotificationController';
import { ADD, REMOVE } from 'sly/services/notifications/actions';

const message = 'test message';

const mockGetMessageId = () => `notificationMessage_${message}`;

jest.mock('sly/services/helpers/utils', () => ({
  randomHexNumber: jest.fn().mockReturnValue(123),
}));

jest.mock('lodash/uniqueId', () => ({
  __esModule: true,
  default: m => mockGetMessageId(m),
}));

describe('NotificationController', () => {
  const mockStore = configureStore([thunkMiddleware]);
  const initStore = (props = {}, messages = []) => mockStore({
    notifications: { messages },
    ...props,
  });
  const spy = jest.fn();

  const wrap = (props = {}) =>
    shallow(<NotificationController {...props}>{spy}</NotificationController>).dive().dive();

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

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    spy.mockClear();
  });

  it('add info notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.instance().notifyInfo(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(ADD);
    expect(action.payload).toEqual(getNotificationObj(message));
  });

  it('add error notification', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.instance().notifyError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(ADD);

    expect(action.payload).toEqual(getNotificationObj(message, 'error'));
  });

  it('close notification', () => {
    const store = initStore({}, [getNotificationObj(message)]);
    wrap({ store });

    expect(spy).toHaveBeenCalled();
    const { dismiss } = spy.mock.calls[0][0];
    dismiss(mockGetMessageId(message));
    const action = store.getActions().pop();
    expect(action.type).toBe(REMOVE);
    compareNotificationObjects(action.payload, []);
  });

  it('add multiple notifications', () => {
    const store = initStore({}, [getNotificationObj(message)]);
    const wrapper = wrap({ store });

    wrapper.instance().notifyInfo(message + message);
    const action = store.getActions().pop();
    expect(action.type).toBe(ADD);
    compareNotificationObjects(action.payload, [
      getNotificationObj(message + message),
      getNotificationObj(message),
    ]);
  });

  it('add multiple notifications and close one', () => {
    const store = initStore(
      {},
      [getNotificationObj(message), getNotificationObj(message + message)],
    );
    wrap({ store });

    expect(spy).toHaveBeenCalled();
    const { dismiss } = spy.mock.calls[0][0];

    dismiss(mockGetMessageId(message));
    const action = store.getActions().pop();
    expect(action.type).toBe(REMOVE);
    compareNotificationObjects(action.payload, [getNotificationObj(message + message)]);
  });
});
