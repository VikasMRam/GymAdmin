import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

import LeadFound, { StyledHeading, Description } from './LeadFound';

import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<LeadFound {...props} />);
const data = {};

const verifyLayout = (wrapper, searchResultCount = 0) => {
  const h = wrapper.find(StyledHeading);
  expect(h).toHaveLength(1);
  expect(h.dive().dive().dive().text()).toContain(searchResultCount);
  expect(wrapper.find(Description)).toHaveLength(1);
  expect(wrapper.find(Field)).toHaveLength(3);
  expect(wrapper.find(TosAndPrivacy)).toHaveLength(1);
};

describe('LeadFound', () => {
  it('renders', () => {
    const wrapper = wrap({ data });
    verifyLayout(wrapper);
  });

  it('renders when searchResultCount passed', () => {
    const searchResultCount = 300;
    const wrapper = wrap({ data, searchResultCount });
    verifyLayout(wrapper, searchResultCount);
  });

  it('renders when name, email, phone passed', () => {
    data[stepInputFieldNames.LeadFound[0]] = 'test';
    data[stepInputFieldNames.LeadFound[1]] = 'test@test.com';
    data[stepInputFieldNames.LeadFound[2]] = 12345678901;
    const wrapper = wrap({ data });
    verifyLayout(wrapper);
  });
});
