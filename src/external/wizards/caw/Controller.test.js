import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import queryString from 'query-string';

import { SET } from 'sly/store/controller/actions';
import { RESOURCE_LIST_READ_REQUEST, RESOURCE_CREATE_REQUEST } from 'sly/store/resource/actions';

import Controller from './Controller';
import { stepOrders, defaultStepOrder } from './helpers';

const mockStore = configureStore();
const initStore = (props = {}) => mockStore({
  ...props,
});
const set = jest.fn();
const wrap = (store, props = {}) => shallow(<Controller {...props} set={set} store={store} />)
  .dive().dive();

describe('Controller', () => {
  beforeEach(() => {
    set.mockClear();
  });

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

  it('should change flow based on passed prop', () => {
    let stepOrderNames = Object.keys(stepOrders);
    stepOrderNames = stepOrderNames.filter(e => e !== defaultStepOrder);
    const stepOrder = stepOrderNames[Math.floor(Math.random() * stepOrderNames.length)];
    const locationPassed = {
      search: `?order=${stepOrder}`,
    };
    const store = initStore();
    const wrapper = wrap(store, {
      location: locationPassed,
    });
    const { currentStep, flow } = wrapper.props();

    expect(currentStep).toBe(1);
    expect(flow).toBe(stepOrder);
  });

  it('handleBackButton not change step when called from first step', () => {
    const store = initStore();
    const wrapper = wrap(store);

    let { currentStep } = wrapper.props();
    expect(currentStep).toBe(1);

    wrapper.instance().handleBackButton();

    ({ currentStep } = wrapper.props());
    expect(currentStep).toBe(1);
  });

  it('handleBackButton changes step when called from second step', () => {
    const store = initStore();
    const wrapper = wrap(store, {
      currentStep: 2,
    });

    const { currentStep } = wrapper.props();
    expect(currentStep).toBe(2);

    wrapper.instance().handleBackButton();
    const lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(SET);
    const payloadData = lastAction.payload.data;
    expect(payloadData.currentStep).toBe(1);
  });

  it('should call doSearch when city and state passed', () => {
    const store = initStore();
    const params = {
      city: 'san-fransisco',
      state: 'california',
    };
    const locationPassed = {
      search: `?${queryString.stringify(params)}`,
    };
    wrap(store, {
      location: locationPassed,
    });

    const lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(RESOURCE_LIST_READ_REQUEST);
    const payloadData = lastAction.payload.params;
    expect(payloadData).toEqual(params);
  });

  it('handleSubmit calls doSearch when on search step', () => {
    const stepOrderNames = Object.keys(stepOrders);
    const citySearchStep = stepOrders[stepOrderNames[0]].indexOf('CitySearch');
    const locationPassed = {
      search: `?order=${stepOrderNames[0]}`,
    };
    const currentStep = citySearchStep + 1;
    const store = initStore();
    const wrapper = wrap(store, {
      currentStep,
      location: locationPassed,
    });
    const expectedProgressPath = [1, currentStep];

    let { currentStep: newCurrentStep } = wrapper.props();
    expect(newCurrentStep).toBe(currentStep);

    wrapper.instance().handleSubmit({}, jest.fn(), wrapper.props());

    let lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(SET);
    ({ currentStep: newCurrentStep } = lastAction.payload.data);
    const { progressPath } = lastAction.payload.data;
    expect(newCurrentStep).toBe(currentStep + 1);
    const progressPathArr = Array.from(progressPath);
    expect(progressPathArr).toEqual(expectedProgressPath);

    lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(RESOURCE_LIST_READ_REQUEST);
  });

  it('handleSubmit does not call doSearch when not on search step', () => {
    const stepOrderNames = Object.keys(stepOrders);
    const citySearchStep = stepOrders[stepOrderNames[0]].indexOf('CitySearch');
    const currentStep = citySearchStep - 1;
    const locationPassed = {
      search: `?order=${stepOrderNames[0]}`,
    };
    const store = initStore();
    const wrapper = wrap(store, {
      currentStep,
      location: locationPassed,
    });
    const expectedProgressPath = [1, currentStep];

    let { currentStep: newCurrentStep } = wrapper.props();
    expect(newCurrentStep).toBe(currentStep);

    wrapper.instance().handleSubmit({}, jest.fn(), wrapper.props());

    const lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(SET);
    ({ currentStep: newCurrentStep } = lastAction.payload.data);
    const { progressPath } = lastAction.payload.data;
    expect(newCurrentStep).toBe(currentStep + 1);
    const progressPathArr = Array.from(progressPath);
    expect(progressPathArr).toEqual(expectedProgressPath);
  });

  it('handleSeeMore does nothing when called from non last step', () => {
    const store = initStore();
    const wrapper = wrap(store);

    wrapper.instance().handleSeeMore();

    const lastAction = store.getActions().pop();
    expect(lastAction).toBeFalsy();

    const { currentStep } = wrapper.props();
    expect(currentStep).toBe(1);
  });

  it('handleSeeMore creates userAction when called from last step', () => {
    const stepOrderNames = Object.keys(stepOrders);
    const locationPassed = {
      search: `?order=${stepOrderNames[0]}`,
    };
    const store = initStore();
    const wrapper = wrap(store, {
      currentStep: stepOrders[stepOrderNames[0]].length,
      location: locationPassed,
    });

    wrapper.instance().handleSeeMore();

    const lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(RESOURCE_CREATE_REQUEST);
  });
});
