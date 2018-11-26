import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { SET } from 'sly/store/controller/actions';
import HeaderController from 'sly/controllers/HeaderController';

describe('HeaderController', () => {
  const mockStore = configureStore();
  const initStore = (props = {}, controllerProps = {}) => mockStore({
    controller: { ...controllerProps },
    ...props,
  });
  const spy = jest.fn();

  const wrap = (props = {}) =>
    shallow(<HeaderController {...props}>{spy}</HeaderController>).dive();

  beforeEach(() => {
    spy.mockClear();
  });

  it('show hidden dropdown', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().handleToggleDropdown();
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ isDropdownOpen: true });
  });
});
