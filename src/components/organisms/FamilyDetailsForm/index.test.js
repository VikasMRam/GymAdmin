import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';
import AmalFrancis from 'sly/../private/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const timeToMove = [
  'Immediately',
  '1-3 Months',
  '3 Months+',
];

const gender = [
  'Male',
  'Female',
  'Other',
  'Not Specified',
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
  '<$2K',
  '$2K-$3K',
  '$3K-$4K',
  '$4K-$5K',
  '$5K+',
];

const roomTypes = [
  '1 Bedroom',
  'Suite',
];

const careLevels = [
  'Ambulatory',
  'Non Ambulatory',
];

const communityTypes = [
  'Assisted Living',
  'Memory Care',
];

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];

const intro = 'Rhoda Goldman Plaza';
const handleSubmit = jest.fn();
const defaultProps = {
  intro,
  handleSubmit,
  timeToMove,
  gender,
  lookingFor,
  monthlyBudget,
  roomTypes,
  careLevels,
  communityTypes,
  assignedTos,
};

const wrap = (props = {}) => shallow(<FamilyDetailsForm {...defaultProps} {...props} />);

describe('FamilyDetailsForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find(Field).filter({ name: 'assignedTo' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' }).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' }).prop('disabled')).toBeTruthy();
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'preferredLocation' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'referralSource' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'medicaid' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyAgentMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyCommunityMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'gender' })).toHaveLength(1);
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(0);
  });

  it('renders with accepted', () => {
    const wrapper = wrap({ accepted: true });

    expect(wrapper.find(Field).filter({ name: 'assignedTo' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' }).prop('disabled')).toBeFalsy();
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' }).prop('disabled')).toBeFalsy();
    expect(wrapper.find(Field).filter({ name: 'residentName' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'preferredLocation' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'referralSource' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'medicaid' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyAgentMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyCommunityMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'slyMessage' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'lookingFor' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'gender' })).toHaveLength(1);
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'budget' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'timeToMove' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('Form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('does not render medicard and slyAgentMessage for agents', () => {
    const wrapper = wrap({
      isAgentUser: true,
    });
    expect(wrapper.find(Field).filter({ name: 'medicaid' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'slyAgentMessage' })).toHaveLength(0);
  });
});
