/**
 * @jest-environment node
 */

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import Role from 'sly/components/common/Role';

const mockStore = configureStore([thunkMiddleware]);
const wrap = (props = {}, children) => shallow((
  <Role
    store={mockStore({ api: { requests: {} } })}
    {...props}
  >
    {children}
  </Role>
));

const makeUserRequestInfo = roleID => ({
  hasStarted: true,
  isLoading: false,

  normalized: {
    roleID,
  },
});

describe('Role', () => {
  it('show when role matches', () => {
    const text = 'test text';
    const content = <div>{text}</div>;
    const wrapper = wrap({
      is: 2,
      userRequestInfo: makeUserRequestInfo(2),
    }, content);

    expect(wrapper.render().text()).toBe(text);
  });

  it('does not show when role matches', () => {
    const text = 'test text';
    const content = <div>{text}</div>;
    const wrapper = wrap({
      is: 1,
      userRequestInfo: makeUserRequestInfo(2),
    }, content);

    expect(wrapper.render().text()).toBeFalsy();
  });
});
