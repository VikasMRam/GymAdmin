import React from 'react';
import { shallow } from 'enzyme';

import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';

const handleSubmit = jest.fn();

const agent = {
  name: 'Agent Business Name',
  info: {
    slyScore: 97,
    displayName: 'Agent Name',
    last5DayLeadCount: 5,
    citiesServed: ['San Francisco'],
    slyPhone: '9999999999',
    slyCellPhone: '8888888888',
    slyWorkPhone: '7777777777',
    profileImageUrl: 'img.url',
  },
  contacts: [{
    workPhone: '6666666666',
    mobilePhone: '5555555555',
  }],
};

const wrap = (props = {}) => shallow(<DashboardAdminReferralAgentTile agent={agent} handleSubmit={handleSubmit} {...props} />);

describe('DashboardAdminReferralAgentTile', () => {
  it('does not render passed children', () => {
    const wrapper = wrap({ children: 'test' });

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    const contact = agent.contacts[0];
    expect(wrapper.contains(agent.name)).toBe(true);
    expect(wrapper.contains(agent.info.slyScore)).toBe(true);
    expect(wrapper.contains(contact.workPhone)).toBe(true);
    expect(wrapper.contains(contact.mobilePhone)).toBe(true);
    expect(wrapper.contains(agent.info.last5DayLeadCount)).toBe(true);
  });

  it('renders without info', () => {
    const agentWithoutInfo = {
      name: 'Agent Business Name' };
    const wrapper = wrap({ agent: agentWithoutInfo });
    const contact = agent.contacts[0];
    expect(wrapper.contains(agent.name)).toBe(true);
    expect(wrapper.contains(agent.info.slyScore)).toBe(false);
    expect(wrapper.contains(contact.workPhone)).toBe(false);
    expect(wrapper.contains(contact.mobilePhone)).toBe(false);
    expect(wrapper.contains(agent.info.last5DayLeadCount)).toBe(false);
  });

  it('renders with Recommended', () => {
    const wrapper = wrap({ isRecommended: true });
    const contact = agent.contacts[0];
    expect(wrapper.contains(agent.name)).toBe(true);
    expect(wrapper.contains(agent.info.slyScore)).toBe(true);
    expect(wrapper.contains(contact.workPhone)).toBe(true);
    expect(wrapper.contains(contact.mobilePhone)).toBe(true);
    expect(wrapper.contains(agent.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.find('IconBadge').find('[text="RECOMMENDED"]')).toHaveLength(2);
  });

  it('renders referralSentAt', () => {
    const referralSentAt = '2018-04-20T08:25:56Z';
    const referralSentAtString = '4/20/18, 8:25AM';
    const wrapper = wrap({ referralSentAt });
    const contact = agent.contacts[0];
    expect(wrapper.contains(agent.name)).toBe(true);
    expect(wrapper.contains(agent.info.slyScore)).toBe(true);
    expect(wrapper.contains(contact.workPhone)).toBe(true);
    expect(wrapper.contains(contact.mobilePhone)).toBe(true);
    expect(wrapper.contains(agent.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.contains(referralSentAtString)).toBe(true);
  });

  it('renders stage', () => {
    const stage = 'New';
    const wrapper = wrap({ stage });
    const contact = agent.contacts[0];
    expect(wrapper.contains(agent.name)).toBe(true);
    expect(wrapper.contains(agent.info.slyScore)).toBe(true);
    expect(wrapper.contains(contact.workPhone)).toBe(true);
    expect(wrapper.contains(contact.mobilePhone)).toBe(true);
    expect(wrapper.contains(agent.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
  });

  it('render DashboardAdminReferralAgentTile to handle bottom Action ', () => {
    const bottomActionText = 'Change Agent';
    const bottomActionOnClick = jest.fn();
    const wrapper = wrap({ agent, bottomActionText, bottomActionOnClick });
    expect(wrapper.contains(bottomActionText)).toBe(true);
    const BottomActionBlock = wrapper.find('BottomActionBlock');
    BottomActionBlock.simulate('click');
    expect(bottomActionOnClick).toHaveBeenCalledTimes(1);
  });
});
