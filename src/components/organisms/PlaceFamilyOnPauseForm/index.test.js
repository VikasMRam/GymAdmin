import React from 'react';
import { shallow } from 'enzyme';

import PlaceFamilyOnPauseForm from 'sly/components/organisms/PlaceFamilyOnPauseForm';

const name = 'test name';
const defaultProps = {
  name,
};
const wrap = (props = {}) => shallow(<PlaceFamilyOnPauseForm {...defaultProps} {...props} />);

describe('PlaceFamilyOnPauseForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Field')).toHaveLength(1);
    expect(wrapper.prop('heading')).toContain(name);
  });
});
