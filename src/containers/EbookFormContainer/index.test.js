import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import api from 'sly/services/newApi/apiInstance';
import EbookFormContainer from './index';

import withAuth from 'sly/services/newApi/withAuth';

console.log(EbookFormContainer.WrappedComponent)
const spy = jest.spyOn(EbookFormContainer.WrappedComponent.prototype, 'handleSubmit');

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

jest.mock('sly/services/newApi/withAuth', () => ({
  __esModule: true,
  default: Component => (props) => { console.log("render"); return <Component {...props} createOrUpdateUser={() => Promise.resolve()} />; },
}));

const createContext = () => ({
  context: {
    router,
    store,
  },
  childContextTypes: {
    router: shape({}),
    store: shape({}),
  },
});

const wrap = (props = {}) => mount(
  <EbookFormContainer
    {...props}
    store={store}
  />, createContext());

describe('EbookFormContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render EbookFormContainer', () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();
    const notifyInfo = jest.fn();
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    expect(wrapper.exists()).toBe(true);
  });

  it('should submit form with form data', () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();
    const notifyInfo = jest.fn();
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    wrapper.find('form').simulate('submit');

    expect(api.sendEbook).toHaveBeenCalled();
    expect(api.createUuidAction).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it.only('should hide the ebook modal', async () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();
    const notifyInfo = jest.fn();

    const wrapper = wrap({ showModal, hideModal, notifyInfo });


    wrapper.find('form').simulate('submit');
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    // await wait(100);
    // console.log(wrapper.find('EbookFormContainer').instance());
    console.log(spy.mock);
    console.log(spy.mock.calls);
    const call = spy.mock.calls.pop();
    console.log(call);


    expect(hideModal).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('should show the notification', () => {
    const showModal = jest.fn();
    const hideModal = jest.fn();
    const notifyInfo = jest.fn();
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    wrapper.find('form').simulate('submit');

    const result = handleSubmitSpy.mock.results.pop();
    await result.value;

    expect(notifyInfo).toHaveBeenCalled();
    expect(notifyInfo).toHaveBeenCalledWith('We have sent the booklet to your email test@seniorly.com');
    expect(wrapper.exists()).toBe(true);
  });
});
