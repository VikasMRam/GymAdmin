import React from 'react';
import { shape } from 'prop-types';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import ExitIntentQuestionFormContainer from './index';

const showModal = jest.fn();
const hideModal = jest.fn();
const notifyInfo = jest.fn();
const createUuidAction = jest.fn().mockReturnValue(new Promise(((resolve) => {
  resolve({
    type: 'apicall',
  });
})));
const mockStore = configureStore([]);
const store = mockStore({
  requests: {},
  bees: {},
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
    api: {
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
  <ExitIntentQuestionFormContainer
    {...props}
    notifyInfo={notifyInfo}
    store={store}
    showModal={showModal}
    hideModal={hideModal}
  />, createContext());

describe('ExitIntentQuestionFormContainer', () => {
  it('should render ExitIntentQuestionFormContainer', () => {
    const wrapper = wrap();

    expect(wrapper.exists()).toBe(true);
  });
  it('should submit form with form data', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');

    expect(createUuidAction).toHaveBeenCalled();
  });
  it('should show the Thankyou modal', () => {
    const wrapper = wrap();

    wrapper.find('form').simulate('submit');

    expect(showModal).toHaveBeenCalled();
  });
});
