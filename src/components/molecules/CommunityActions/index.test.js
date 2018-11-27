import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'sly/components/atoms';
import CommunityActions from 'sly/components/molecules/CommunityActions';

const wrap = (props = {}) =>
  shallow(<CommunityActions {...props} />);

describe('CommunityActions', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders with isAlreadyTourScheduled', () => {
    const wrapper = wrap({ isAlreadyTourScheduled: true });
    expect(wrapper.find(Button).contains('Tour requested')).toBe(true);
  });

  it('renders with isAlreadyPricingRequested', () => {
    const wrapper = wrap({ isAlreadyPricingRequested: true });
    expect(wrapper.find('MainButton').contains('Pricing requested')).toBe(true);
  });

  it('does handles onSATClick', () => {
    const onSATClick = jest.fn();
    const wrapper = wrap({ onSATClick });
    const SATButton = wrapper.find(Button);

    expect(SATButton).toHaveLength(1);
    SATButton.simulate('click');
    expect(onSATClick).toHaveBeenCalled();
  });

  it('does handles onGCPClick', () => {
    const onGCPClick = jest.fn();
    const wrapper = wrap({ onGCPClick });
    const GCPButton = wrapper.find('MainButton');

    expect(GCPButton).toHaveLength(1);
    GCPButton.simulate('click');
    expect(onGCPClick).toHaveBeenCalled();
  });
});
