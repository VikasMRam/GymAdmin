import React from 'react';
import { shallow } from 'enzyme';

import CommunityCareService from 'sly/components/organisms/CommunityCareService';

const defaultProps = {
  careServices: ['abc', 'def'],
};

const wrap = (props = {}) => shallow(<CommunityCareService {...defaultProps} {...props} />);

describe('CommunityCareService', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunityCareService', () => {
    const wrapper = wrap();
    expect(wrapper.find('IconItem')).toHaveLength(2);
    expect(wrapper.find('IconItem').filter('[icon="check"]')).toHaveLength(2);
    // expect(wrapper.find('IconItem').filter('[icon="close"]')).toHaveLength(1);
  });
});
