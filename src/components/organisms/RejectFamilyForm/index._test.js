/*
import React from 'react';
import { shallow } from 'enzyme';

import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';
import {
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS,
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS,
} from 'sly/constants/familyDetails';

const reasons = [
  'reason 1',
  'reason 2',
  DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0],
  PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0],
];
const change = jest.fn();

const defaultProps = {
  reasons,
  change,
};
const wrap = (props = {}) => shallow(<RejectFamilyForm {...defaultProps} {...props} />);

const verifyOptions = (options) => {
  expect(options).toHaveLength(reasons.length);
  options.forEach((o, i) => {
    expect(o).toBe(reasons[i]);
  });
};

describe('RejectFamilyForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    const field = wrapper.find('Field');

    expect(field).toHaveLength(1);
    // const options = field.prop('options');
    const options = field.children('option');
    verifyOptions(options);
  });

  it('renders reasons with currentReason', () => {
    const wrapper = wrap({ currentReason: DESCRIPTION_REQUIRED_CLOSED_STAGE_REASONS[0] });
    const field = wrapper.find('Field');

    expect(field).toHaveLength(2);
    const options = field.at(0).children('option');
    verifyOptions(options);
    expect(field.find({ name: 'description' })).toHaveLength(1);
  });

  it('renders reasons with currentReason that requires preferred location', () => {
    const wrapper = wrap({ currentReason: PREFERRED_LOCATION_REQUIRED_CLOSED_STAGE_REASONS[0] });
    const field = wrapper.find('Field');

    expect(field).toHaveLength(2);
    const options = field.at(0).children('option');
    verifyOptions(options);
    expect(field.find({ name: 'preferredLocation' })).toHaveLength(1);
  });
});
*/
