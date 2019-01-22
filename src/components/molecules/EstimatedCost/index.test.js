import React from 'react';
import { shallow } from 'enzyme';

import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { Button } from 'sly/components/atoms';
import Block from 'sly/components/atoms/Block/index';

const wrap = (props = {}) => shallow(<EstimatedCost {...props} />);

const price = 200;
const priceFrom = 180;
const priceTo = 220;

describe('EstimatedCost', () => {
  it('verify correct percentage', () => {
    const wrapper = wrap({ price });
    expect(wrapper.find('StyledNumberFormat').at(0).dive().dive()
      .text()).toEqual(`$${priceFrom}`);
    expect(wrapper.find('StyledNumberFormat').at(1).dive().dive()
      .text()).toEqual(`$${priceTo}`);
  });

  it('verify correct description', () => {
    const wrapper = wrap({ price });
    const estimatedCostWrapper = wrapper.find('EstimatedCostWrapper');
    expect(estimatedCostWrapper).toHaveLength(1);
    const description = '*Seniorly’s estimated monthly pricing is based on the local average pricing of other communities in the area and what typical communities of the same size offer in services. Please verify all information prior to making a decision. Seniorly is not responsible for any errors regarding the information displayed on this website.';
    expect(estimatedCostWrapper.find(Block).at(1).contains(description)).toBeTruthy();
  });

  it('verify estimated price hidden when zero', () => {
    const wrapper = wrap({ price: 0 });
    expect(wrapper.find('EstimatedCostWrapper')).toHaveLength(0);
  });

  it('verify getPricing callback', () => {
    const getPricing = jest.fn();
    const wrapper = wrap({ price, getPricing });
    wrapper.find(Button).simulate('click');
    expect(getPricing).toHaveBeenCalled();
  });
});
