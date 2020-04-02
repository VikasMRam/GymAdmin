import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import EbookFormContainer from './index';

import api from 'sly/services/api/apiInstance';

jest.mock('sly/services/api/apiInstance');

jest.mock('sly/services/api/withAuth', () => ({
  __esModule: true,
  default: (Component) => {
    const Wrapper = props => (
      <Component
        {...props}
        createOrUpdateUser={() => Promise.resolve()}
      />
    );
    Wrapper.WrappedComponent = Component.WrappedComponent || Component;
    return Wrapper;
  },
}));

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
  />,
  createContext(),
);

// FIXME: will have to rewrite this tests entirely due to new versions of react-router and react-redux
describe.skip('EbookFormContainer', () => {
  const showModal = jest.fn();
  const hideModal = jest.fn();
  const notifyInfo = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render EbookFormContainer', () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    expect(wrapper.exists()).toBe(true);
  });

  it('should submit form with form data', () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    wrapper.find('form').simulate('submit');

    expect(api.sendEbook).toHaveBeenCalled();
    expect(api.createUuidAction).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('should hide the ebook modal', async () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    const container = wrapper.find('EbookFormContainer');
    const handleSubmitSpy = jest.spyOn(container.instance(), 'handleSubmit');
    container.instance().forceUpdate();

    container.find('form').simulate('submit');

    const result = handleSubmitSpy.mock.results.pop();
    await result.value;

    expect(hideModal).toHaveBeenCalled();
    expect(wrapper.exists()).toBe(true);
  });

  it('should show the notification', async () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    const container = wrapper.find('EbookFormContainer');
    const handleSubmitSpy = jest.spyOn(container.instance(), 'handleSubmit');
    container.instance().forceUpdate();

    wrapper.find('form').simulate('submit');

    const result = handleSubmitSpy.mock.results.pop();
    await result.value;

    expect(notifyInfo).toHaveBeenCalled();
    expect(notifyInfo).toHaveBeenCalledWith('We have sent the booklet to your email test@seniorly.com');
    expect(wrapper.exists()).toBe(true);
  });
});
