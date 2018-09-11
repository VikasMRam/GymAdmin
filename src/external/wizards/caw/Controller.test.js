import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Controller from './Controller';
import { stepOrders, defaultStepOrder } from './helpers';

const mockStore = configureStore();
const initStore = (props = {}) => mockStore({
  ...props,
});
const wrap = (store, props = {}) => shallow(<Controller {...props} store={store}><spy /></Controller>)
  .dive().dive();
const spy = jest.fn();

describe('Controller', () => {
  it('should have default values', () => {
    const store = initStore();
    const wrapper = wrap(store);
    const {
      currentStep, href, data, totalNumberofSteps, flow, searching, progressPath, location,
    } = wrapper.props();
    const progressPathArr = Array.from(progressPath);
    const expectedProgressPath = [1];

    expect(currentStep).toBe(1);
    expect(href).toBe('');
    expect(flow).toBe(defaultStepOrder);
    expect(totalNumberofSteps).toBe(stepOrders[defaultStepOrder].length);
    expect(data).toEqual({});
    expect(searching).toBeFalsy();
    expect(progressPathArr).toEqual(expectedProgressPath);
    expect(location).toBeFalsy();
  });

  it('should pass props', () => {
    const store = initStore();
    const locationPassed = {
      search: '?fromWidgetType=badge',
    };
    const wrapper = wrap(store, {
      currentStep: 5,
      location: locationPassed,
    });
    const { currentStep, location } = wrapper.props();

    expect(currentStep).toBe(5);
    expect(location).toEqual(locationPassed);
  });
});
