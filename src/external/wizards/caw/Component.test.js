import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'sly/components/atoms';

import Component, { ProgressWrapper, CurrentStep, ButtonsWrapper } from './Component';

const wrap = (props = {}) => shallow(<Component {...props} />);
const totalNumberofSteps = 4;
const currentStep = 1;
const handleSubmit = () => null;
const onBackButton = () => null;
const onSeeMore = () => null;
const buttonTexts = ['Back', 'Continue'];
const href = 'http://www.lvh.me/assisted-living/california/san-francisco';
const flow = 'flow2';

describe('Component', () => {
  it('renders', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow,
    });
    const cstep = wrapper.find(CurrentStep);
    const bwrap = wrapper.find(ButtonsWrapper);
    const buttons = bwrap.find(Button);

    expect(wrapper.find(ProgressWrapper)).toHaveLength(1);
    expect(cstep).toHaveLength(1);
    expect(cstep.dive().text()).toContain(`Step ${currentStep} of ${totalNumberofSteps}`);
    expect(bwrap).toHaveLength(1);
    expect(buttons).toHaveLength(2);
    buttons.forEach((button, i) => {
      expect(button.dive().dive().text()).toBe(buttonTexts[i]);
    });
  });
});
