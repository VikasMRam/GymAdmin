import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';

const intro = 'Rhoda Goldman Plaza';
const handleSubmit = jest.fn();
const defaultProps = {
  intro,
  handleSubmit,
};

const wrap = (props = {}) => shallow(<FamilyDetailsForm {...defaultProps} {...props} />);

describe('FamilyDetailsForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('TwoColumnWrapper').find('IntroInfo').contains(intro)).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' }).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' }).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'gender' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'preferredLocation' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' }).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(0);
  });

  it('renders with accepted', () => {
    const wrapper = wrap({ accepted: true });
    expect(wrapper.find('TwoColumnWrapper').find('IntroInfo').contains(intro)).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' }).prop('disabled')).toBeFalsy();
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' }).prop('disabled')).toBeFalsy();
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'gender' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'preferredLocation' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' }).prop('disabled')).toBeFalsy();
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
