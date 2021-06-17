
import React from 'react';
import { mount } from 'enzyme';

import { createApiClient, ApiProvider } from 'sly/web/services/api';
import Role from 'sly/web/components/common/Role';

const apiContext = {
  apiClient: createApiClient({ initialState: {} }),
  skipApiCalls: false,
};

window.apiStore = apiContext.apiClient.store;

const wrap = (props = {}, children) => mount(
  <ApiProvider value={apiContext}>
    <Role
      {...props}
    >
      {children}
    </Role>
  </ApiProvider>,
);

const makeUserRequestInfo = roleID => ({
  hasStarted: true,
  isLoading: false,

  normalized: {
    roleID,
  },
});

describe('Role', () => {
  it.skip('show when role matches', () => {
    const text = 'test text';
    const content = <div>{text}</div>;
    const wrapper = wrap({
      is: 2,
      userRequestInfo: makeUserRequestInfo(2),
    }, content);

    expect(wrapper.render().text()).toBe(text);
  });

  it.skip('does not show when role matches', () => {
    const text = 'test text';
    const content = <div>{text}</div>;
    const wrapper = wrap({
      is: 1,
      userRequestInfo: makeUserRequestInfo(2),
    }, content);

    expect(wrapper.render().text()).toBeFalsy();
  });
});
