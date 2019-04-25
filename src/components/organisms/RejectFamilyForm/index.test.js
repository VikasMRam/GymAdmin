import React from 'react';
import { shallow } from 'enzyme';

import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';

const reasons = [
  'reason 1',
  'reason 2',
];
const defaultProps = {
  reasons,
};
const wrap = (props = {}) => shallow(<RejectFamilyForm {...defaultProps} {...props} />);

describe('RejectFamilyForm', () => {
  it('renders', () => {
    const wrapper = wrap();
    const field = wrapper.find('Field');

    expect(field).toHaveLength(1);
    const options = field.find('option');
    expect(options).toHaveLength(reasons.length + 1);
    options.slice(1).forEach((o, i) => {
      expect(o.text()).toBe(reasons[i]);
    });
  });
});
