import React from 'react';
import { createStore, combineReducers } from 'redux';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import * as actions from 'sly/store/authenticated/actions';
import authenticated from 'sly/store/authenticated/reducer';
import AuthContainer from 'sly/containers/AuthContainer';

import LoginFormContainer from 'sly/containers/LoginFormContainer';
import SignupFormContainer from 'sly/containers/SignupFormContainer';
import JoinSlyButtonsController from 'sly/controllers/JoinSlyButtonsController';
import ResetPasswordFormContainer from 'sly/containers/ResetPasswordFormContainer';

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

const mockStore = configureStore([store => next => (action) => {
  next(action);
  return Promise.resolve(action);
}]);
const mockWrap = (props = {}, state = {}) => {
  const storeInstance = mockStore({ authenticated: state });
  storeInstance.replaceReducer(reducer);
  const wrapper = shallow(
    <AuthContainer {...props} />,
    { context: { store: storeInstance } },
  );
  wrapper.store = storeInstance;
  return wrapper;
};

describe('AuthContainer', () => {
  it('Should derive state correctly', () => {
    const wrapper = wrap();
    expect(wrapper.dive().state('currentStep')).toEqual(null);
    wrapper.store.dispatch(actions.authenticate('For the lolz'));
    wrapper.update();
    expect(wrapper.dive().state('currentStep')).toEqual('auth');
    wrapper.store.dispatch(actions.authenticateCancel());
    wrapper.update();
    expect(wrapper.dive().state('currentStep')).toEqual(null);
  });

  it('Should display each step correctly', () => {
    const wrapper = wrap();
    expect(wrapper.dive().state('currentStep')).toEqual(null);
    wrapper.store.dispatch(actions.authenticate('For the lolz'));
    wrapper.update();
    const authController = wrapper.dive();
    const join = authController.find(JoinSlyButtonsController);
    const instance = authController.instance();
    expect(join.props()).toEqual({
      heading: 'For the lolz',
      onConnectSuccess: instance.handleLoginSuccess,
      onEmailSignupClicked: instance.gotoSignup,
      onLoginClicked: instance.gotoLogin,
    });

    instance.gotoLogin();
    authController.update();
    expect(instance.state.currentStep).toEqual('auth-login');
    const login = authController.find(LoginFormContainer);
    expect(login.props()).toEqual({
      onForgotPasswordClicked: instance.gotoResetPassword,
      onSubmitSuccess: instance.handleLoginSuccess,
      onSignupClicked: instance.gotoJoin,
    });

    instance.gotoSignup();
    authController.update();
    expect(instance.state.currentStep).toEqual('auth-signup');
    const signup = authController.find(SignupFormContainer);
    expect(signup.props()).toEqual({
      onSubmitSuccess: instance.handleLoginSuccess,
      onLoginClicked: instance.gotoLogin,
    });

    instance.gotoResetPassword();
    authController.update();
    expect(instance.state.currentStep).toEqual('auth-resetPassword');
    const reset = authController.find(ResetPasswordFormContainer);
    expect(reset.props()).toEqual({
      onSubmitSuccess: instance.handleResetPasswordSuccess,
      onLoginClicked: instance.gotoLogin,
    });
  });

  it('calls the right callbacks', () => {
    const notifyInfo = jest.fn();
    const message = 'message';
    const wrapper = mockWrap({ notifyInfo });
    const authController = wrapper.dive();

    authController.instance().handleResetPasswordSuccess({ message });
    expect(notifyInfo).toHaveBeenCalledWith('message');

    authController.instance().handleLoginSuccess().then(() => {
      const [ first, second ] = wrapper.store.getActions();
      expect(first.type).toEqual('RESOURCE_DETAIL_READ_REQUEST');
      expect(first.payload.needle).toEqual('me');
      expect(second.type).toEqual('AUTHENTICATE_SUCCESS');
    });
  });
});
