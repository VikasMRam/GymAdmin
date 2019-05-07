import React from 'react';
import { shallow } from 'enzyme';

import CommunityActions from 'sly/components/molecules/CommunityActions';

const wrap = (props = {}) =>
  shallow(<CommunityActions {...props} />);

describe('CommunityActions', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders with isAlreadyPricingRequested', () => {
    const wrapper = wrap({ isAlreadyPricingRequested: true });
    expect(wrapper.find('MainButton').contains('Pricing requested')).toBe(true);
  });

  it('does handles onGCPClick', () => {
    const onGCPClick = jest.fn();
    const wrapper = wrap({ onGCPClick });
    const GCPButton = wrapper.find('MainButton');

    expect(GCPButton).toHaveLength(1);
  });
});
