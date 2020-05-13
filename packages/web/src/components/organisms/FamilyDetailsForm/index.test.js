import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import FamilyDetailsForm from 'sly/web/components/organisms/FamilyDetailsForm';
import AmalFrancis from 'sly/web/../private/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/web/../private/storybook/sample-data/user-sushanth-ramakrishna.json';
import PraneshKumar from 'sly/web/../private/storybook/sample-data/client-pranesh-kumar.json';

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

const mobilityLevels = [
  'Ambulatory',
  'Non Ambulatory',
];
const careServices = [
  'Toileting',
  'Bathing',
];

const communityTypes = [
  'Assisted Living',
  'Memory Care',
];

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];
const AGENT_ND_ROLE = 4;
const PLATFORM_ADMIN_ROLE = 128;
const AGENT_ADMIN_ROLE = 8;
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
  mobilityLevels,
  careServices,
  communityTypes,
  assignedTos,
  client: PraneshKumar,
  user: { roleID: AGENT_ADMIN_ROLE },
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
    const wrapper = wrap({ accepted: true, canEditFamilyDetails: false });

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

  it('renders with accepted and canEditFamilyDetails', () => {
    const wrapper = wrap({ accepted: false, canEditFamilyDetails: true });

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

  // it('does not render slyAgentMessage for agents', () => {
  //   const wrapper = wrap({
  //     isAgentUser: true,
  //     user: { roleID: AGENT_ND_ROLE },
  //   });
  //   expect(wrapper.find(Field).filter({ name: 'slyAgentMessage' })).toHaveLength(0);
  // });
});
