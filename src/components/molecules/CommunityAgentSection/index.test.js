import React from 'react';
import { shallow } from 'enzyme';

import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';
import LindaIwamota from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';

const wrap = (props = {}) =>
  shallow(<CommunityAgentSection agent={LindaIwamota} {...props} />);

describe('CommunityAgentSection', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunityAgentSection', () => {
    const wrapper = wrap();
    expect(wrapper.contains(LindaIwamota.info.displayName)).toBe(true);
    expect(wrapper.contains(LindaIwamota.info.email)).toBe(true);
    expect(wrapper.find('Image').prop('src')).toEqual(LindaIwamota.info.profileImageUrl);
    expect(wrapper.find('NumberFormat')).toHaveLength(1);
    expect(wrapper.find('NumberFormat').prop('value')).toEqual(LindaIwamota.info.slyPhone);
  });

  it('renders chosenReview', () => {
    const mAgent = { ...LindaIwamota };
    mAgent.info.chosenReview = 'abc';
    const wrapper = wrap({ agent: mAgent });
    expect(wrapper.contains(LindaIwamota.info.displayName)).toBe(true);
    expect(wrapper.contains(LindaIwamota.info.email)).toBe(true);
    expect(wrapper.contains('abc')).toBe(true);
    expect(wrapper.find('Image').prop('src')).toEqual(LindaIwamota.info.profileImageUrl);
    expect(wrapper.find('NumberFormat')).toHaveLength(1);
    expect(wrapper.find('NumberFormat').prop('value')).toEqual(LindaIwamota.info.slyPhone);
  });

  it('handles onPhoneClick', () => {
    const onPhoneClick = jest.fn();
    const wrapper = wrap({ onPhoneClick });
    expect(onPhoneClick).not.toHaveBeenCalled();
    const phoneLink = wrapper.find('PhoneLink');
    expect(phoneLink).toHaveLength(1);
    phoneLink.simulate('click');
    expect(onPhoneClick).toHaveBeenCalledTimes(1);
  });

  it('handles onEmailClick', () => {
    const { email } = LindaIwamota.info;
    const onEmailClick = jest.fn();
    const wrapper = wrap({ onEmailClick });
    expect(onEmailClick).not.toHaveBeenCalled();
    const emailLink = wrapper.find('Link').at(1);
    expect(emailLink.prop('href')).toBe(`mailto:${email}`);
    emailLink.simulate('click');
    expect(onEmailClick).toHaveBeenCalledTimes(1);
  });

  it('handles onAdvisorHelpClick', () => {
    const onAdvisorHelpClick = jest.fn();
    const wrapper = wrap({ onAdvisorHelpClick });
    expect(onAdvisorHelpClick).not.toHaveBeenCalled();
    const emailLink = wrapper.find('SubHeadingSection');
    expect(emailLink).toHaveLength(1);
    emailLink.simulate('click');
    expect(onAdvisorHelpClick).toHaveBeenCalledTimes(1);
  });
});
