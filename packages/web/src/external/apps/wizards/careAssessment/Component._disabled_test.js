import React from 'react';
import { shallow } from 'enzyme';

import { Button } from 'sly/web/components/atoms';
import Component from 'sly/web/external/apps/wizards/careAssessment/Component';

const wrap = (props = {}) => shallow(<Component {...props} />);
const totalNumberofSteps = 4;
let currentStep = 1;
const handleSubmit = () => jest.fn();
const onBackButton = () => jest.fn();
const onSeeMore = () => jest.fn();
const buttonTextsInProgress = ['Back', 'Continue'];
const buttonTextFinal = 'See my options';
const href = 'http://www.lvh.me/assisted-living/california/san-francisco?modal=thankyou';
const flow = ['CitySearch', 'LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'LeadFound'];

const getButtons = (wrapper, isFinal = false) => {
  const bwrap = wrapper.find('ButtonsWrapper');
  const buttons = bwrap.find(Button);
  expect(bwrap).toHaveLength(1);
  if (isFinal) {
    expect(buttons).toHaveLength(1);
  } else {
    expect(buttons).toHaveLength(2);
  }
  return buttons;
};

describe('Component', () => {
  it('renders', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow,
    });
    const cstep = wrapper.find('CurrentStep');
    const buttons = getButtons(wrapper);

    expect(wrapper.find('ProgressWrapper')).toHaveLength(1);
    expect(cstep).toHaveLength(1);
    expect(cstep.dive().render().text()).toContain(`Step ${currentStep} of ${totalNumberofSteps}`);

    buttons.forEach((button, i) => {
      expect(button.dive().dive().render().text()).toBe(buttonTextsInProgress[i]);
      if (i === 0) {
        expect(button.prop('disabled')).toBeTruthy();
      } else {
        expect(button.prop('disabled')).toBeFalsy();
      }
    });
  });

  it('shows searching when flag set', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow, searching: true,
    });
    expect(wrapper.find('SearchingWrapper')).toHaveLength(1);
    expect(wrapper.find('ProgressWrapper')).toHaveLength(0);
  });

  it('back button becomes active after first step', () => {
    currentStep += 1;
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow,
    });
    const buttons = getButtons(wrapper);
    expect(buttons.first().prop('disabled')).toBeFalsy();
  });

  it('current step desription is updated', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow,
    });
    const cstep = wrapper.find('CurrentStep');
    expect(cstep.dive().render().text()).toContain(`Step ${currentStep} of ${totalNumberofSteps}`);
  });

  it('submit button becomes active for valid form', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow, invalid: false,
    });
    const buttons = getButtons(wrapper);
    expect(buttons.at(1).prop('disabled')).toBeFalsy();
  });

  it('submit button becomes inactive for invalid form', () => {
    const wrapper = wrap({
      currentStep, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow, invalid: true,
    });
    const buttons = getButtons(wrapper);
    expect(buttons.at(1).prop('disabled')).toBeTruthy();
  });

  it('final step buttons are shown', () => {
    const wrapper = wrap({
      currentStep: totalNumberofSteps, totalNumberofSteps, handleSubmit, onBackButton, onSeeMore, href, flow,
    });
    const button = getButtons(wrapper, true);
    expect(
      button
        .dive()
        .dive()
        .text(),
    ).toBe(buttonTextFinal);
    expect(button.prop('href')).toBe(href);
  });
});
