import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';

const handleSubmit = jest.fn();
// const error = 'Blah';

const wrap = (props = {}) => shallow(<DashboardProfileUserDetailsForm handleSubmit={handleSubmit} {...props} />);

describe('DashboardProfileUserDetailsForm', () => {
  it('render DashboardProfileUserDetailsForm', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('FormSection')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find('TwoColumnField').filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find('TwoColumnField').filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'searchingCity' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'openToNearbyAreas' })).toHaveLength(1);
  });

  // TODO: Check whether this form needs to handle form level errors
  // it('render error when error is passed', () => {
  //   const wrapper = wrap({ error });
  //   expect(wrapper.find('StyledButton')).toHaveLength(1);
  //   expect(wrapper.find('strong')).toHaveLength(1);
  // });
});
