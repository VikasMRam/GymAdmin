import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import MonthlyBudget from 'sly/external/apps/wizards/careAssessment/steps/MonthlyBudget';

const wrap = (props = {}) => shallow(<MonthlyBudget {...props} />);

const verifyLayout = (wrapper) => {
  expect(wrapper.find('PaddedHeading')).toHaveLength(1);
  expect(wrapper.find('Description')).toHaveLength(2);
  expect(wrapper.find(Field)).toHaveLength(2);
};

describe('MonthlyBudget', () => {
  it('renders', () => {
    const wrapper = wrap();
    verifyLayout(wrapper);
  });
});
