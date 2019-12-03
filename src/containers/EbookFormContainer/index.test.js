import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import EbookFormContainer from './index';

jest.mock('sly/services/newApi/withAuth', () => ({
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
    store={store}
  />,
  createContext()
);

describe('EbookFormContainer', () => {
  const showModal = jest.fn();
  const hideModal = jest.fn();
  const notifyInfo = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render EbookFormContainer', () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    expect(wrapper.exists()).toBe(true);
  });

  it('should submit form with form data', () => {
    const wrapper = wrap({ showModal, hideModal, notifyInfo });

    wrapper.find('form').simulate('submit');

    expect(sendEbook).toHaveBeenCalled();
    expect(createUuidAction).toHaveBeenCalled();
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
