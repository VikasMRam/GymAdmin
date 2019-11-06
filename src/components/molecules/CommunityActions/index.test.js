import React from 'react';
import { shallow } from 'enzyme';

import CommunityActions from 'sly/components/molecules/CommunityActions';

jest.mock('sly/containers/AskAgentQuestionContainer');

const community = { id: 'The place 123' };

const wrap = (props = {}) =>
  shallow(<CommunityActions community={community} {...props} />);

describe('CommunityActions', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders with isAlreadyPricingRequested', () => {
    const wrapper = wrap({ isAlreadyPricingRequested: true });
    expect(
      wrapper
        .dive()
        .find('GetCustomPricingButtonContainer')
        .prop('children')
    ).toContain('Pricing requested');
  });

  it('does handles onGCPClick', () => {
    const onGCPClick = jest.fn();
    const wrapper = wrap({ onGCPClick });
    const getCustomPriceButton = wrapper
      .dive()
      .find('GetCustomPricingButtonContainer');

    expect(getCustomPriceButton).toHaveLength(1);
  });
});
