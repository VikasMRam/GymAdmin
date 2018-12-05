import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import MonthlyBudget, { StyledHeading, Description } from './MonthlyBudget';

import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<MonthlyBudget {...props} />);
const data = {};

const verifyLayout = (wrapper) => {
  expect(wrapper.find(StyledHeading)).toHaveLength(1);
  expect(wrapper.find(Description)).toHaveLength(2);
  expect(wrapper.find(Field)).toHaveLength(2);
};

describe('MonthlyBudget', () => {
  it('renders', () => {
    const wrapper = wrap({ data });
    verifyLayout(wrapper);
  });

  it('renders when slider value set', () => {
    const key = stepInputFieldNames.MonthlyBudget[0];
    data[key] = 3000;
    const wrapper = wrap({ data });
    verifyLayout(wrapper);
  });

  it('renders when slider value set', () => {
    const key = stepInputFieldNames.MonthlyBudget[0];
    data[key] = 3000;
    const wrapper = wrap({ data });
    const fields = wrapper.find(Field);
    verifyLayout(wrapper);
    expect(fields.at(0).prop('value')).toEqual(3000);
  });

  it('renders when medicaid checked', () => {
    const key = stepInputFieldNames.MonthlyBudget[1];
    data[key] = true;
    const wrapper = wrap({ data });
    verifyLayout(wrapper);
  });
});
