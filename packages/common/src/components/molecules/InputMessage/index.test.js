import React from 'react';
import { shallow } from 'enzyme';

import InputMessage from '.';

const defaultProps = {
  icon: 'favourite-light',
  name: 'name',
  palette: 'warning',
  message: 'Warning',
};

const wrap = (props = {}) =>
  shallow(<InputMessage {...defaultProps} {...props} />);

describe('InputMessage|Web', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('Icon')).toHaveLength(1);
    expect(wrapper.contains(defaultProps.message)).toBeTruthy();
  });
});
