import React from 'react';
import { mount } from 'enzyme';

import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { Button } from 'sly/components/atoms';

const wrap = (props = {}) => mount(<EstimatedCost {...props} />);

const price = 200;
const priceFrom = 180;
const priceTo = 220;
const community = { name: 'testcommunityName' };

describe('EstimatedCost', () => {
  it('verify correct percentage', () => {
    const wrapper = wrap({ price, community });
    expect(wrapper.text()).toContain(`Estimated cost from $${priceFrom} to $${priceTo} per month`);
  });

  it('verify correct description', () => {
    const wrapper = wrap({ price, community });
    expect(wrapper.text()).toContain('*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services.');
  });

  it('verify getPricing desktop callback', () => {
    const getPricing = jest.fn();
    const wrapper = wrap({ price, community, getPricing });
    wrapper.find(Button).simulate('click');
    expect(getPricing).toHaveBeenCalled();
  });

  it('verify getPricing mobile callback', () => {
    const getPricing = jest.fn();
    const wrapper = wrap({ price, community, getPricing });
    wrapper.find(Button).simulate('click');
    expect(getPricing).toHaveBeenCalled();
  });
});
