import React from 'react';
import { shallow } from 'enzyme';

import CommunityAgentSection from 'sly/components/molecules/CommunityAgentSection';

const agent = {
  id: 'golden-placement-services-ca-lidia-parman-',
  address: {
    city: 'Menifee',
    county: 'Riverside',
    latitude: 33.6831035,
    line1: '30141 Antelope Road #D-127',
    line2: '',
    longitude: -117.1700328,
    state: 'CA',
    zip: '92584',
  },
  url: 'agent.url',
  info: {
    displayName: 'Rachel Wasserstrom',
    slyPhone: '9258906575',
    email: 'rachelwassertrom@seniorly.com',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/113003',
    citiesServed: ['abc', 'def'],
  },
};

const wrap = (props = {}) =>
  shallow(<CommunityAgentSection agent={agent} {...props} />);

describe('CommunityAgentSection', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders CommunityAgentSection', () => {
    const wrapper = wrap();
    expect(wrapper.contains(agent.info.displayName)).toBe(true);
    expect(wrapper.contains(agent.info.email)).toBe(true);
    expect(wrapper.find('Image').prop('src')).toEqual(agent.info.profileImageUrl);
    expect(wrapper.find('NumberFormat')).toHaveLength(1);
    expect(wrapper.find('NumberFormat').dive().text()).toEqual('925-890-6575');
  });

  it('renders chosenReview', () => {
    const mAgent = { ...agent };
    mAgent.info.chosenReview = 'abc';
    const wrapper = wrap({ agent: mAgent });
    expect(wrapper.contains(agent.info.displayName)).toBe(true);
    expect(wrapper.contains(agent.info.email)).toBe(true);
    expect(wrapper.contains('abc')).toBe(true);
    expect(wrapper.find('Image').prop('src')).toEqual(agent.info.profileImageUrl);
    expect(wrapper.find('NumberFormat')).toHaveLength(1);
    expect(wrapper.find('NumberFormat').dive().text()).toEqual('925-890-6575');
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
    const { email } = agent.info;
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
