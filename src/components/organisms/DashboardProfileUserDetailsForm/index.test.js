import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';

const handleSubmit = jest.fn();
const timeToMove = [
  'Immediately',
  '1-3 Months',
  '3 Months+',
];

const lookingFor = [
  'Self',
  'Parents',
  'Mother',
  'Father',
  'Grandparents',
  'Grandmother',
  'Grandfather',
  'Husband',
  'Wife',
  'Other',
];

const monthlyBudget = [
  '<2K',
  '2K-3K',
  '3K-4K',
  '4K-5K',
  '5K+',
];

const meta = {
  timeToMove,
  lookingFor,
  monthlyBudget,
};

const uuidAux = {
  meta,
};

const status = {
  uuidAux,
};

const defaultProps = {
  status,
};

const wrap = (props = {}) => shallow(<DashboardProfileUserDetailsForm handleSubmit={handleSubmit} {...defaultProps} {...props} />);

describe('DashboardProfileUserDetailsForm', () => {
  it('render DashboardProfileUserDetailsForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('FormSection')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phoneNumber' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'openToNearbyAreas' })).toHaveLength(1);
  });

  // TODO: Check whether this form needs to handle form level errors
  // it('render error when error is passed', () => {
  //   const wrapper = wrap({ error });
  //   expect(wrapper.find('StyledButton')).toHaveLength(1);
  //   expect(wrapper.find('strong')).toHaveLength(1);
  // });
});
