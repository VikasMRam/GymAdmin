import React from 'react';
import { shallow } from 'enzyme';

import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';
import UpdateFamilyStageForm from 'sly/components/organisms/UpdateFamilyStageForm';

const name = 'test';
const groups = Object.keys(FAMILY_STAGE_ORDERED);
const optionsLen =
  groups.map(sg => FAMILY_STAGE_ORDERED[sg].length)
    .reduce((sum, x) => sum + x);
const optionValues =
  groups
    .map(sg => FAMILY_STAGE_ORDERED[sg])
    .reduce((a, b) => a.concat(b), []);
const lossReasons = [
  'Unresponsive',
  "Dosen't want help",
  'Chose community on own',
  'Working with another agency',
  'Low funds',
  'Passed away',
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0],
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0],
];
const change = jest.fn();

const defaultValues = {
  name,
  nextAllowedStages: optionValues,
  lossReasons,
  change,
};
const wrap = (props = {}) => shallow(<UpdateFamilyStageForm {...defaultValues} {...props} />);

describe('UpdateFamilyStageForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    const field = wrapper.find('PaddedField');

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(0);
    expect(field).toHaveLength(1);
    const options = field.find('option').slice(1); // first option is for placeholder
    expect(options).toHaveLength(optionsLen);
    options.forEach((o, i) => {
      expect(o.text()).toBe(optionValues[i]);
    });
    expect(wrapper.find('Field')).toHaveLength(1);
    expect(wrapper.find('Warning')).toHaveLength(0);
  });

  it('renders with warning', () => {
    const wrapper = wrap({
      currentStageGroup: groups[0],
      nextStageGroup: groups[1],
    });
    const field = wrapper.find('Field');
    const warning = wrapper.find('Warning');

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(0);
    expect(field).toHaveLength(2);
    const options = field.at(0).find('option').slice(1); // first option is for placeholder
    expect(options).toHaveLength(optionsLen);
    options.forEach((o, i) => {
      expect(o.text()).toBe(optionValues[i]);
    });
    expect(warning).toHaveLength(1);
    expect(warning.contains(groups[0])).toBeTruthy();
    expect(warning.contains(groups[1])).toBeTruthy();
  });

  it('renders with warning when paused', () => {
    const wrapper = wrap({
      currentStageGroup: groups[0],
      nextStageGroup: groups[1],
      currentStage: optionValues[0],
      nextStage: optionValues[4],
      isPaused: true,
    });
    const field = wrapper.find('Field');
    const warning = wrapper.find('Warning');

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(0);
    expect(field).toHaveLength(2);
    const options = field.at(0).find('option').slice(1); // first option is for placeholder
    expect(options).toHaveLength(optionsLen);
    options.forEach((o, i) => {
      expect(o.text()).toBe(optionValues[i]);
    });
    expect(warning).toHaveLength(1);
    expect(warning.contains('Paused')).toBeTruthy();
  });

  it('renders won stage fields', () => {
    const wrapper = wrap({ nextStage: FAMILY_STAGE_WON, nextStageGroup: groups[2] });

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'moveInDate' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'communityName' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'monthlyFees' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'referralAgreement' })).toHaveLength(1);

    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(0);
  });

  it('renders lost stage fields', () => {
    const wrapper = wrap({ nextStage: FAMILY_STAGE_LOST, nextStageGroup: groups[2] });

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'moveInDate' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'communityName' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'monthlyFees' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'referralAgreement' })).toHaveLength(0);

    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(0);
  });

  it('renders lost stage fields with currentLossReason', () => {
    const wrapper = wrap({ nextStage: FAMILY_STAGE_LOST, nextStageGroup: groups[2], currentLossReason: DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0] });

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'moveInDate' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'communityName' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'monthlyFees' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'referralAgreement' })).toHaveLength(0);

    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'lostDescription' })).toHaveLength(1);
  });

  it('renders lost stage fields with currentLossReason that requires preferred location', () => {
    const wrapper = wrap({ nextStage: FAMILY_STAGE_LOST, nextStageGroup: groups[2], currentLossReason: PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0] });

    expect(wrapper.find('Field').find({ name: 'note' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'moveInDate' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'communityName' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'monthlyFees' })).toHaveLength(0);
    expect(wrapper.find('Field').find({ name: 'referralAgreement' })).toHaveLength(0);

    expect(wrapper.find('Field').find({ name: 'lossReason' })).toHaveLength(1);
    expect(wrapper.find('Field').find({ name: 'preferredLocation' })).toHaveLength(1);
  });
});
