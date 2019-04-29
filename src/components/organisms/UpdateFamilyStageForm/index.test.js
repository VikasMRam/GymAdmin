import React from 'react';
import { shallow } from 'enzyme';

import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
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

const defaultValues = {
  name,
  nextAllowedStages: optionValues,
};
const wrap = (props = {}) => shallow(<UpdateFamilyStageForm {...defaultValues} {...props} />);

describe('UpdateFamilyStageForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    const field = wrapper.find('PaddedField');

    expect(field).toHaveLength(1);
    const options = field.find('option');
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

    expect(field).toHaveLength(2);
    const options = field.at(0).find('option');
    expect(options).toHaveLength(optionsLen);
    options.forEach((o, i) => {
      expect(o.text()).toBe(optionValues[i]);
    });
    expect(warning).toHaveLength(1);
    expect(warning.contains(groups[0])).toBeTruthy();
    expect(warning.contains(groups[1])).toBeTruthy();
  });
});
