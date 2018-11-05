import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricing from 'sly/components/molecules/CommunityPricing';

const wrap = (props = {}) =>
  shallow(<CommunityPricing price={4300} {...props} />);

describe('CommunityPricing', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('does renders price', () => {
    const wrapper = wrap();
    expect(wrapper.contains(4300)).toBe(true);
  });

  it('does renders description', () => {
    const description = 'blah';
    const wrapper = wrap({ description });
    expect(wrapper.contains(description)).toBe(true);
  });
});
