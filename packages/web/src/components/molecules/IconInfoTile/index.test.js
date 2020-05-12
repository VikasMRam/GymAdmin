import React from 'react';
import { shallow } from 'enzyme';

import IconInfoTile, { StyledIcon } from '.';

const defaultProps = {
  icon: 'search',
  heading: 'Open Local Search Platform',
  content: `We provide the most comprehensive, unbiased information on
    senior housing and care without requiring personal data to access. Our 
    service is 100% free for families and we list information on all
    available communities regardless if we have a commercial relationship with them.`,
};

const wrap = (props = {}) =>
  shallow(<IconInfoTile {...defaultProps} {...props} />);

describe('IconInfoTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders IconInfoTile', () => {
    const wrapper = wrap();
    expect(wrapper.find(StyledIcon)).toHaveLength(1);
    expect(wrapper.contains(defaultProps.heading)).toBeTruthy();
    expect(wrapper.contains(defaultProps.content)).toBeTruthy();
  });
});
