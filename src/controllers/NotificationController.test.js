import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { SET, UNSET } from 'sly/store/controller/actions';

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

  beforeEach(() => {
    spy.mockClear();
  });

  it('add info notification', () => {
    const messageObj = {
      content: message,
      type: 'default',
    };
    const store = initStore();

    const wrapper = wrap({ store });
    wrapper.dive().instance().notifyInfo(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ message: messageObj });
  });

  it('add error notification', () => {
    const messageObj = {
      content: message,
      type: 'error',
    };
    const store = initStore();

    const wrapper = wrap({ store });
    wrapper.dive().instance().notifyError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ message: messageObj });
  });

  it('close notification', () => {
    const store = initStore();

    const wrapper = wrap({ store });
    wrapper.dive().instance().notifyError(message);
    wrapper.dive().instance().handleClose();
    const action = store.getActions().pop();
    expect(action.type).toBe(UNSET);
    expect(action.payload.key).toBe('message');
  });
});
