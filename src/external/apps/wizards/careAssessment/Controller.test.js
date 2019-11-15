import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { SET } from 'sly/store/controller/actions';
import { STEP_ORDERS, DEFAULT_STEP_ORDER } from 'sly/external/constants/steps';
import Controller from 'sly/external/apps/wizards/careAssessment/Controller';

const mockStore = configureStore();
const initStore = (props = {}) => mockStore({
  ...props,
});
const set = jest.fn();
const wrap = (store, props = {}) => shallow(<Controller {...props} api={{}} set={set} store={store} />)
  .dive().dive().dive();

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
    expect(flow).toEqual(STEP_ORDERS[DEFAULT_STEP_ORDER]);
    expect(totalNumberofSteps).toBe(STEP_ORDERS[DEFAULT_STEP_ORDER].length);
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
    let stepOrderNames = Object.keys(STEP_ORDERS);
    stepOrderNames = stepOrderNames.filter(e => e !== DEFAULT_STEP_ORDER);
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
    expect(flow).toEqual(STEP_ORDERS[stepOrder]);
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

  it('handleSubmit calls doSearch when on search step', () => {
    const stepOrderNames = Object.keys(STEP_ORDERS);
    const citySearchStep = STEP_ORDERS[stepOrderNames[0]].indexOf('CitySearch');
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

    const lastAction = store.getActions().pop();
    expect(lastAction.type).toBe(SET);
    ({ currentStep: newCurrentStep } = lastAction.payload.data);
    const { progressPath } = lastAction.payload.data;
    expect(newCurrentStep).toBe(currentStep + 1);
    const progressPathArr = Array.from(progressPath);
    expect(progressPathArr).toEqual(expectedProgressPath);
  });

  it('handleSubmit does not call doSearch when not on search step', () => {
    const stepOrderNames = Object.keys(STEP_ORDERS);
    const citySearchStep = STEP_ORDERS[stepOrderNames[0]].indexOf('CitySearch');
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

  it.only('handleSeeMore does nothing when called from non last step', () => {
    const store = initStore();
    const wrapper = wrap(store);

    console.log(wrapper.instance())
    wrapper.instance().handleSeeMore();

    const lastAction = store.getActions().pop();
    expect(lastAction).toBeFalsy();

    const { currentStep } = wrapper.props();
    expect(currentStep).toBe(1);
  });
});
