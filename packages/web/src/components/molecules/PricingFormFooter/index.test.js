import React from 'react';
import { mount } from 'enzyme';

import PricingFormFooter from 'sly/web/components/molecules/PricingFormFooter';

const wrap = (props = {}) => mount(<PricingFormFooter {...props} />);

describe('PricingFormFooter', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledButton').at(1).text()).toContain('Continue');
  });

  it('renders with isFinalStep', () => {
    const wrapper = wrap({ isFinalStep: true });
    expect(wrapper.find('StyledButton').at(1).text()).toContain('Submit');
  });

  it('onProgressClick is called', () => {
    const onProgressClick = jest.fn();
    const wrapper = wrap({ onProgressClick });
    wrapper.find('StyledButton').at(1).simulate('click');
    expect(onProgressClick).toHaveBeenCalled();
  });

  it('renders when isButtonDisabled', () => {
    const wrapper = wrap({ isButtonDisabled: true });
    expect(wrapper.find('StyledButton').at(0).props().disabled).toBe(true);
  });
});
