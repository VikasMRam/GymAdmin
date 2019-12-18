import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import { Experiment } from './Experiment';
import Variant from './Variant';

import experimentsReducer from 'sly/store/experiments/reducer';

const initialState = {
  test1: 'variant1',
  test2: 'variant2',
};
const mockStore = createStore(experimentsReducer, initialState);
const wrapWithoutVariants = (props = {}) =>
  shallow(<Experiment {...props} store={mockStore}><span>test content</span></Experiment>);
const wrapWithVariants = (props = {}) =>
  shallow(<Experiment {...props} store={mockStore}><Variant name="variant1">variant 1</Variant><Variant name="variant2">variant 2</Variant></Experiment>);

describe('Experiments|Experiment', () => {
  it('renders', () => {
    const wrapper = wrapWithoutVariants({ name: 'test1' });
    expect(wrapper.find('span').length).toBe(1);
  });

  it('renders default variant when disabled', () => {
    const wrapper = wrapWithVariants({ name: 'test1', disabled: true, defaultVariant: 'variant2' });
    expect(wrapper.find(Variant).length).toBe(1);
    expect(wrapper.dive().text()).toBe('variant 2');
  });

  it('renders first variant when disabled and no defaultVariant provided', () => {
    const wrapper = wrapWithVariants({ name: 'test1', disabled: true });
    expect(wrapper.find(Variant).length).toBe(1);
    expect(wrapper.dive().text()).toBe('variant 1');
  });

  it('renders first variant when enabled and no defaultVariant provided', () => {
    const wrapper = wrapWithVariants({ name: 'test1' });
    expect(wrapper.find(Variant).length).toBe(1);
    expect(wrapper.dive().text()).toBe('variant 1');
  });

  it('renders selected variant', () => {
    const wrapper = wrapWithVariants({ name: 'test2', defaultVariant: 'variant2' });
    expect(wrapper.find(Variant).length).toBe(1);
    expect(wrapper.dive().text()).toBe('variant 2');
  });

  it('renders variant specified through query params', () => {
    const wrapper = wrapWithVariants({
      name: 'test2',
      defaultVariant: 'variant2',
      location: {
        search: '?experimentEvaluations=test2:variant1',
      },
    });
    expect(wrapper.find(Variant).length).toBe(1);
    expect(wrapper.dive().text()).toBe('variant 1');
  });

  it('renders no variant when invalid varaint specified through query params', () => {
    const wrapper = wrapWithVariants({
      name: 'test2',
      defaultVariant: 'variant2',
      location: {
        search: '?experimentEvaluations=test2:variant3',
      },
    });
    expect(wrapper.find(Variant).length).toBe(0);
  });
});
