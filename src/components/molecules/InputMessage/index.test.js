import React from 'react';
import { shallow } from 'enzyme';

import InputMessage from 'sly/components/molecules/InputMessage/index';

const defaultProps = {
  icon: 'favourite-light',
  name: 'name',
  palette: 'warning',
  message: 'Warning',
};

const wrap = (props = {}) =>
  shallow(<InputMessage {...defaultProps} {...props} />);

describe('InputMessage', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders InputMessage', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.contains(defaultProps.message)).toBeTruthy();
  });
});
