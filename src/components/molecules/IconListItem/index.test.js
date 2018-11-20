import React from 'react';
import { shallow } from 'enzyme';

import IconListItem from 'sly/components/molecules/IconListItem/index';

const defaultProps = {
  icon: 'favourite-light',
  text: '100% free. They do not charge you.',
};

const wrap = (props = {}) =>
  shallow(<IconListItem {...defaultProps} {...props} />);

describe('IconListItem', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders IconListItem', () => {
    const wrapper = wrap();
    expect(wrapper.find('Styled(Icon)')).toHaveLength(1);
    expect(wrapper.contains(defaultProps.text)).toBeTruthy();
  });
});
