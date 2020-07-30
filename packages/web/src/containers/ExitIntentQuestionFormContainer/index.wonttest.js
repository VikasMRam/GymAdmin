import React from 'react';
import { shape } from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import ExitIntentQuestionFormContainer from '.';

const showModal = jest.fn();
const hideModal = jest.fn();
const notifyInfo = jest.fn();
const createUuidAction = jest.fn().mockReturnValue(new Promise(((resolve) => {
  resolve({
    type: 'apicall',
  });
})));
const router = {
  history: new BrowserRouter().history,
  route: {
    location: { search: '' },
    match: { url: '' },
  },
};

const createStore = () => configureStore([])({
  requests: {},
  api: {},
});

const createContext = store => ({
  context: {
    router: {
      history: new BrowserRouter().history,
      route: {
        location: { search: '' },
        match: { url: '' },
      },
    },
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

const wrap = (props = {}) => {
  const store = createStore();
  const context = createContext(store);
  return mount(
    <ExitIntentQuestionFormContainer
      {...props}
      notifyInfo={notifyInfo}
      store={store}
      showModal={showModal}
      hideModal={hideModal}
    />, context);
};

// FIXME: this tests all fail but because the spies are
// not restored, it looks like they pass

// describe('exitintentquestionformcontainer', () => {
//   it('should render exitintentquestionformcontainer', () => {
//     const wrapper = wrap();
//
//     expect(wrapper.exists()).tobe(true);
//   });
//   it('should submit form with form data', () => {
//     const wrapper = wrap();
//
//     wrapper.find('form').simulate('submit');
//
//     expect(createuuidaction).tohavebeencalled();
//   });
//   it.only('should show the thankyou modal', () => {
//     const wrapper = wrap();
//
//     console.log('text', wrapper);
//     wrapper.find('form').simulate('submit');
//
//     expect(showmodal).tohavebeencalled();
//   });
// });
