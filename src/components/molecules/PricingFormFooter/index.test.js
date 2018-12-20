import React from 'react';
import { shallow } from 'enzyme';

import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';

const wrap = (props = {}) => shallow(<PricingFormFooter {...props} />);

describe('PricingFormFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledButton').dive().dive().dive()
      .text()).toContain('Continue');
  });

  it('renders with isFinalStep', () => {
    const wrapper = wrap({ isFinalStep: true });
    expect(wrapper.find('StyledButton').dive().dive().dive()
      .text()).toContain('Submit');
  });

  it('onProgressClick is called', () => {
    const onProgressClick = jest.fn();
    const wrapper = wrap({ onProgressClick });
    wrapper.find('StyledButton').simulate('click');
    expect(onProgressClick).toHaveBeenCalled();
  });

  it('renders when isButtonDisabled', () => {
    const wrapper = wrap({ isButtonDisabled: true });
    expect(wrapper.find('StyledButton').at(0).props().disabled).toBe(true);
  });
});
