import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import { SET } from 'sly/store/controller/actions';
import JoinSlyButtonsController from 'sly/controllers/JoinSlyButtonsController';

describe('JoinSlyButtonsController', () => {
  const mockStore = configureStore();
  const initStore = (props = {}, controllerProps = {}) => mockStore({
    controller: { ...controllerProps },
    ...props,
  });
  const spy = jest.fn();
  const message = 'test message';

  const wrap = (props = {}) =>
    shallow(<JoinSlyButtonsController {...props}>{spy}</JoinSlyButtonsController>).dive();

  beforeEach(() => {
    spy.mockClear();
  });

  it('sets message', () => {
    const store = initStore();
    const wrapper = wrap({ store });

    wrapper.dive().instance().setSocialLoginError(message);
    const action = store.getActions().pop();
    expect(action.type).toBe(SET);
    expect(action.payload.data).toEqual({ socialLoginError: message });
  });
});
