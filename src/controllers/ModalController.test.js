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
  const content = <span>test</span>;

  const wrap = (props = {}) =>
    shallow(<ModalController {...props}>{spy}</ModalController>).dive();

  beforeEach(() => {
    spy.mockClear();
    jest.clearAllMocks();
  });

  it('show modal without type', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().dive().instance().show(content, null);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBeFalsy();
    expect(action.payload.data.modalContent).toBe(content);
    expect(action.payload.data.isModalOpen).toBeTruthy();
  });

  it('show modal', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().dive().instance().show(content, null, type);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBe(type);
    expect(action.payload.data.modalContent).toBe(content);
    expect(action.payload.data.isModalOpen).toBeTruthy();
    expect(action.payload.data.isModalCloseable).toBeTruthy();
  });

  it('show modal not closeable', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().dive().instance().show(content, null, type, false);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.modalType).toBe(type);
    expect(action.payload.data.modalContent).toBe(content);
    expect(action.payload.data.isModalOpen).toBeTruthy();
    expect(action.payload.data.isModalCloseable).toBeFalsy();
  });

  it('hide modal', () => {
    const store = initStore({}, { modalType: type, modalContent: content });
    const wrapper = wrap({ store });

    wrapper.dive().dive().instance().hide();
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data.isModalOpen).toBeFalsy();
  });
});
