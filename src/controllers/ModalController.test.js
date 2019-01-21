import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import { SET } from 'sly/store/controller/actions';
import ModalController from 'sly/controllers/ModalController';

describe('ModalController', () => {
  const mockStore = configureStore([thunkMiddleware]);
  const initStore = (props = {}, controllerProps = {}) => mockStore({
    controller: { ...controllerProps },
    ...props,
  });
  const spy = jest.fn();
  const type = 'test-modal';
  const entity = ['one', 'two'];

  const wrap = (props = {}) =>
    shallow(<ModalController {...props}>{spy}</ModalController>).dive();

  beforeEach(() => {
    spy.mockClear();
    jest.clearAllMocks();
  });

  it('show modal without type errors', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    expect(wrapper.dive().instance().show).toThrow(new Error('A modal type is required'));
  });

  it('show modal', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().show(type);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBe(type);
  });

  it('show modal with entity', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().show(type, entity);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBe(type);
    expect(action.payload.data.modalEntity).toEqual(entity);
  });

  it('hide modal', () => {
    const store = initStore({}, { modalType: type });
    const wrapper = wrap({ store });

    wrapper.dive().instance().hide();
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBeFalsy();
  });
});
