import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import AddFamilyForm from 'sly/web/components/organisms/AddFamilyForm';

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

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  timeToMove,
  lookingFor,
};

const wrap = (props = {}) => shallow(<AddFamilyForm {...defaultProps} {...props} />);

describe('AddFamilyForm', () => {
  it('renders with source', () => {
    const wrapper = wrap({ isNonSlyCreator: false });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'source', type: 'select' })).toHaveLength(1);
  });

  it('renders text source for non sly created', () => {
    const wrapper = wrap({ isNonSlyCreator: true });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'source', type: 'text' })).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
