import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import EbookFormContainer from './index';

const showModal = jest.fn();
const hideModal = jest.fn();
const notifyInfo = jest.fn();

const mockStore = configureStore([]);
const store = mockStore({
  requests: {},
  bees: {},
});

const createContext = () => ({
  context: {
    store,
    api: {
      sendEbook: jest.fn().mockReturnValue({
        type: 'apicall',
      }),
    },

  },
  childContextTypes: {
    store: shape({}),
    api: shape({}),
  },
});

const wrap = (props = {}) => mount(
  <EbookFormContainer
    {...props}
    notifyInfo={notifyInfo}
    store={store}
    showModal={showModal}
    hideModal={hideModal}
  />, createContext());

describe('EbookFormContainer', () => {
  it('should render EbookFormContainer', () => {
    const wrapper = wrap();

    expect(wrapper.exists()).toBe(true);
  });
});
