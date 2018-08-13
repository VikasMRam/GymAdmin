import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import EstimatedCost, {DesktopButton, MobileButton}  from '.';

const wrap = (props = {}) => mount(<EstimatedCost {...props} />);

const price = 200;
const priceFrom = 180;
const priceTo = 220;
const community = {name:'testcommunityName'};
const onGetDetailedPricingClickedSpy = jest.fn();

describe('EstimatedCost', () => {
  it('verify correct percentage', () => {
    const wrapper = wrap({ price, community });
    expect(wrapper.text()).toContain(`Estimated cost from $${priceFrom} to $${priceTo} per month`);
  });

  it('verify correct description', () => {
    const wrapper = wrap({ price, community });
    expect(wrapper.text()).toContain(`*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services.`);
  });

  it('verify onGetDetailedPricingClicked callback', () => {
    const wrapper = wrap({ price, community, getPricing: onGetDetailedPricingClickedSpy });
    wrapper.find(DesktopButton).simulate('click');
    expect(onGetDetailedPricingClickedSpy).toHaveBeenCalled();
  });

  it('verify onLiveChatClicked callback', () => {
    const wrapper = wrap({ price, community, getPricing: onGetDetailedPricingClickedSpy });
    wrapper.find(MobileButton).simulate('click');
    expect(onGetDetailedPricingClickedSpy).toHaveBeenCalled();
  });
});
