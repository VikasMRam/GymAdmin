import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricingAndRating from 'sly/components/molecules/CommunityPricingAndRating';

const wrap = (props = {}) =>
  shallow(<CommunityPricingAndRating price={4300} rating={3.6234} {...props} />);

describe('CommunityPricingAndRating', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('does renders price and fixed rating', () => {
    const wrapper = wrap();
    expect(wrapper.contains(4300)).toBe(true);
    expect(wrapper.contains('3.6')).toBe(true);
  });

  it('does renders description', () => {
    const priceDescription = 'blah';
    const wrapper = wrap({ priceDescription });
    expect(wrapper.contains(priceDescription)).toBe(true);
  });
});
