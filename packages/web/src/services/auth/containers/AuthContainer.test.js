import React from 'react';
import { createStore, combineReducers } from 'redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import * as actions from 'sly/web/store/authenticated/actions';
import authenticated from 'sly/web/store/authenticated/reducer';
import AuthContainer from 'sly/web/services/auth/containers/AuthContainer';

const reducer = combineReducers({ authenticated });

const store = (state = {}) => createStore(reducer, { authenticated: state });
const wrap = (props = {}, state) => {
  const storeInstance = store(state);
  const wrapper = shallow(
    <AuthContainer {...props} />,
    { context: { store: storeInstance } },
  );
  wrapper.store = storeInstance;
  return wrapper;
};

const wrapStepComponent = (step, state) => {
  const storeInstance = store(state);
  const wrapper = shallow(
    step,
    { context: { store: storeInstance } },
  );
  wrapper.store = storeInstance;
  return wrapper;
};

const mockStore = configureStore([() => next => (action) => {
  next(action);
  return Promise.resolve(action);
}]);
const mockWrap = (props = {}, state = {}) => {
  const storeInstance = mockStore({ authenticated: state, api: {} });
  storeInstance.replaceReducer(reducer);
  const wrapper = shallow(
    <AuthContainer {...props} />,
    { context: { store: storeInstance,
      api: { getUser: jest.fn().mockReturnValue({
        type: 'apicall',
      }) } } },
  );
  wrapper.store = storeInstance;
  return wrapper;
};

const getStepComponent = (showModal, i = 0) => {
  expect(showModal).toHaveBeenCalled();
  const StepComponent = showModal.mock.calls[i][0];
  expect(StepComponent).toBeTruthy();
  return StepComponent;
};

describe('AuthContainer', () => {
  // FIXME: done in completely different manner now
  it.skip('Should derive state correctly', () => {
    const wrapper = wrap(null, { api: {} });
    expect(wrapper.dive().state('currentStep')).toEqual(null);
    wrapper.store.dispatch(actions.authenticate('For the lolz'));
    wrapper.update();
    expect(wrapper.dive().state('currentStep')).toEqual(MODAL_TYPE_JOIN_SLY);
    wrapper.store.dispatch(actions.authenticateCancel());
    wrapper.update();
    expect(wrapper.dive().state('currentStep')).toEqual(null);
  });

  it.skip('Should display each step correctly', () => {
    const showModal = jest.fn();
    const wrapper = wrap({ showModal }, { api: {} });
    expect(wrapper.dive().state('currentStep')).toEqual(null);
    wrapper.store.dispatch(actions.authenticate('For the lolz'));
    wrapper.update();
    const authController = wrapper.dive();
    const instance = authController.instance();

    instance.componentDidUpdate();
    let StepComponent = getStepComponent(showModal);
    let sm = wrapStepComponent(StepComponent);
    let stepMounted = sm.dive().instance();
    expect(stepMounted.props.heading).toBe('For the lolz');
    expect(stepMounted.props.onConnectSuccess).toEqual(instance.handleLoginSuccess);
    expect(stepMounted.props.onEmailSignupClicked).toEqual(instance.gotoSignup);
    expect(stepMounted.props.onLoginClicked).toEqual(instance.gotoLogin);

    instance.gotoLogin();
    instance.componentDidUpdate();
    StepComponent = getStepComponent(showModal, 1);
    sm = wrapStepComponent(StepComponent);
    stepMounted = sm.dive().instance();
    expect(instance.state.currentStep).toEqual(MODAL_TYPE_LOG_IN);
    expect(stepMounted.props.onForgotPasswordClicked).toEqual(instance.gotoResetPassword);
    expect(stepMounted.props.onSubmitSuccess).toEqual(instance.handleLoginSuccess);
    expect(stepMounted.props.onSignupClicked).toEqual(instance.gotoJoin);

    instance.gotoSignup();
    instance.componentDidUpdate();
    StepComponent = getStepComponent(showModal, 2);
    sm = wrapStepComponent(StepComponent);
    stepMounted = sm.dive().instance();
    expect(instance.state.currentStep).toEqual(MODAL_TYPE_SIGN_UP);
    expect(stepMounted.props.onSubmitSuccess).toEqual(instance.handleLoginSuccess);
    expect(stepMounted.props.onLoginClicked).toEqual(instance.gotoLogin);

    instance.gotoResetPassword();
    instance.componentDidUpdate();
    StepComponent = getStepComponent(showModal, 3);
    sm = wrapStepComponent(StepComponent);
    stepMounted = sm.dive().instance();
    expect(instance.state.currentStep).toEqual(MODAL_TYPE_RESET_PASSWORD);
    expect(stepMounted.props.onSubmitSuccess).toEqual(instance.handleResetPasswordSuccess);
    expect(stepMounted.props.onLoginClicked).toEqual(instance.gotoLogin);
  });

  it.skip('calls the right callbacks', () => {
    const notifyInfo = jest.fn();
    const showModal = jest.fn();
    const message = 'message';
    const wrapper = mockWrap({ notifyInfo, showModal });
    const authController = wrapper.dive().dive().dive().dive();

    authController.instance().handleResetPasswordSuccess({ body: { message } });
    expect(notifyInfo).toHaveBeenCalledWith('message');
    expect(showModal).toHaveBeenCalled();

    return authController.instance().handleLoginSuccess().then(() => {
      const [first, second] = wrapper.store.getActions();
      expect(first.type).toEqual('apicall');
      expect(second.type).toEqual('AUTHENTICATE_SUCCESS');
    });
  });
});
