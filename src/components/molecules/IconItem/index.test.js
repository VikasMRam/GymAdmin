import React from 'react';
import { shallow } from 'enzyme';

import IconItem from 'sly/components/molecules/IconItem/index';

const defaultProps = {
  icon: 'favourite-light',
  text: '100% free. They do not charge you.',
};

const wrap = (props = {}) =>
  shallow(<IconItem {...defaultProps} {...props} />);

describe('IconItem', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders IconItem', () => {
    const wrapper = wrap();
    expect(wrapper.find('Styled(Icon)')).toHaveLength(1);
    expect(wrapper.contains(defaultProps.text)).toBeTruthy();
  });
});
