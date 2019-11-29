import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import EbookFormContainer from './index';

const showModal = jest.fn();
const hideModal = jest.fn();
const notifyInfo = jest.fn();

const mockStore = configureStore([]);
const store = mockStore({
  requests: {},
  api: {},
  form: {
    EbookForm: {
      registeredFields: {
        email: {
          name: 'email',
          type: 'Field',
          count: 1,
        },
      },
      fields: {
        email: {
          visited: true,
          touched: true,
        },
      },
      values: {
        email: 'test@seniorly.com',
      },
      anyTouched: true,
    },
  },
});

const router = {
  history: new BrowserRouter().history,
  route: {
    location: { search: '' },
    match: { url: '' },
  },
};

const sendEbook = jest.fn().mockReturnValue({
  type: 'apicall',
});

const createUuidAction = jest.fn().mockReturnValue({
  type: 'apicall',
});

const createContext = () => ({
  context: {
    router,
    store,
    api: {
      sendEbook,
      createUuidAction,
    },
  },
  childContextTypes: {
    router: shape({}),
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
  it('should submit form with form data', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');

    expect(sendEbook).toHaveBeenCalled();
    expect(createUuidAction).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('should hide the ebook modal', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');

    expect(hideModal).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('should show the notification', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');

    expect(notifyInfo).toHaveBeenCalled();
    expect(notifyInfo).toHaveBeenCalledWith('We have sent the booklet to your email test@seniorly.com');
    expect(wrapper.exists()).toBe(true);
  });
});
