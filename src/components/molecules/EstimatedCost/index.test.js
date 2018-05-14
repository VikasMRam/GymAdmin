import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import EstimatedCost from '.';

const wrap = (props = {}) => mount(<EstimatedCost {...props} />);

const price = 200;
const priceFrom = 180;
const priceTo = 220;
const communityName = 'testcommunityName';
const onGetDetailedPricingClickedSpy = jest.fn();

describe('EstimatedCost', () => {
  it('verify correct percentage', () => {
    const wrapper = wrap({ price, communityName });
    expect(wrapper.text()).toContain(`Estimated cost from $${priceFrom} to $${priceTo} per month`);
  });

  it('verify correct description', () => {
    const wrapper = wrap({ price, communityName });
    expect(wrapper.text()).toContain(`*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area, and the amenities and care services provided at ${communityName}`);
  });

  it('verify onGetDetailedPricingClicked callback', () => {
    const wrapper = wrap({ price, communityName, getDetailedPricing: onGetDetailedPricingClickedSpy });
    wrapper.find('Button').simulate('click');
    expect(onGetDetailedPricingClickedSpy).toHaveBeenCalled();
  });
});
