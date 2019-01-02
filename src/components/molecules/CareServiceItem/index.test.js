import React from 'react';
import { shallow } from 'enzyme';

import CareServiceItem from 'sly/components/molecules/CareServiceItem';

const defaultProps = {
  icon: 'check',
  text: 'blah',
};

const wrap = (props = {}) => shallow(<CareServiceItem {...defaultProps} {...props} />);

describe('CareServiceItem', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CareServiceItem', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('Icon').prop('icon')).toEqual(defaultProps.icon);
    expect(wrapper.contains(defaultProps.text)).toBe(true);
  });

  it('renders CareServiceItem with palette', () => {
    const wrapper = wrap({ palette: 'grey' });
    expect(wrapper.find('Icon').prop('icon')).toEqual(defaultProps.icon);
    expect(wrapper.find('Icon').prop('palette')).toEqual('grey');
    expect(wrapper.contains(defaultProps.text)).toBe(true);
  });
});
