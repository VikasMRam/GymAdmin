import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunkMiddleware from 'redux-thunk';

import Role from 'sly/components/common/Role';

// TODO: fixme - support testing components that use @query decorator
const wrap = (props = {}, children) => shallow(<Role {...props}>{children}</Role>);
const mockStore = configureStore([thunkMiddleware]);
const initStore = (props = {}, controllerProps = {}) => mockStore({
  controller: { ...controllerProps },
  ...props,
});
const api = {
  getUser: jest.fn(),
};
const getMockData = roleID => ({
  bees: {
    entities: {
      User: {
        '40b0e51039c35010b12d04ac0728e841': {
          type: 'User',
          id: '40b0e51039c35010b12d04ac0728e841',
          attributes: {
            admin: false,
            confirmedAt: '2019-02-18T18:03:15Z',
            createdAt: '2019-02-18T12:33:15Z',
            email: 'amal@seniorly.com',
            name: 'test',
            phoneNumber: '',
            roleID,
            updatedAt: '2019-03-14T12:48:52Z',
            uuid: 'f224ff53-d0df-435e-9b48-d9361913b524',
          },
        },
      },
    },
    requests: {
      getUser: {
        '[{"id":"me"}]': {
          isLoading: false,
          error: null,
          response: {
            id: '40b0e51039c35010b12d04ac0728e841',
            type: 'User',
          },
          meta: {
            copyright: 'Copyright 2018 Seniorly Inc.',
            version: 'v0',
          },
          headers: {
            'content-type': 'application/vnd.api+json',
            date: 'Fri, 15 Mar 2019 10:04:03 GMT',
            'content-length': 1375,
            connection: 'close',
          },
          status: 200,
        },
      },
    },
  },
});

describe('Role', () => {
  it('show when role matches', () => {
    const roleID = 2;
    const text = 'test text';
    const store = initStore(getMockData(roleID));
    const wrapper = wrap({ is: roleID, api, store }, text).dive().dive().dive();
    expect(wrapper.text()).toBe(text);
  });

  it('does not show when role matches', () => {
    const roleID = 3;
    const store = initStore(getMockData(roleID + 1));
    const wrapper = wrap({ is: roleID, api, store }, 'test text').dive().dive().dive();
    expect(wrapper.text()).toBeFalsy();
  });
});
