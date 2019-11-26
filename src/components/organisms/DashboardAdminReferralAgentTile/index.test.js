import React from 'react';
import { shallow } from 'enzyme';

import { getReferralSentTimeText } from 'sly/services/helpers/communityReferral';
import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';
import AgentLinda from 'sly/../private/storybook/sample-data/agent-linda-iwamota.json';

const handleSubmit = jest.fn();

const wrap = (props = {}) => shallow(<DashboardAdminReferralAgentTile agent={AgentLinda} handleSubmit={handleSubmit} {...props} />);

describe('DashboardAdminReferralAgentTile', () => {
  it('does not render passed children', () => {
    const wrapper = wrap({ children: 'test' });

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.contains(AgentLinda.name)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.last5DayLeadCount)).toBe(true);
  });

  it('renders without info', () => {
    const agentWithoutInfo = {
      name: AgentLinda.name,
      status: AgentLinda.status,
    };
    const wrapper = wrap({ agent: agentWithoutInfo });

    expect(wrapper.contains(AgentLinda.name)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBe(false);
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBe(false);
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBe(false);
    expect(wrapper.contains(AgentLinda.info.last5DayLeadCount)).toBe(false);
  });

  it('renders with Recommended', () => {
    const wrapper = wrap({ isRecommended: true });
    expect(wrapper.contains(AgentLinda.name)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.find('IconBadge').find('[text="RECOMMENDED"]')).toHaveLength(2);
  });

  it('renders referralSentAt', () => {
    const referralSentAt = '2018-04-20T08:25:56Z';
    const referralSentAtString = getReferralSentTimeText(referralSentAt);
    const wrapper = wrap({ referralSentAt });
    expect(wrapper.contains(AgentLinda.name)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.contains(referralSentAtString)).toBe(true);
  });

  it('renders stage', () => {
    const stage = 'New';
    const wrapper = wrap({ stage });
    expect(wrapper.contains(AgentLinda.name)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBe(true);
    expect(wrapper.contains(AgentLinda.info.last5DayLeadCount)).toBe(true);

    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
  });

  it('render DashboardAdminReferralAgentTile to handle bottom Action ', () => {
    const bottomActionText = 'Change Agent';
    const bottomActionOnClick = jest.fn();
    const wrapper = wrap({ bottomActionText, bottomActionOnClick });
    expect(wrapper.contains(bottomActionText)).toBe(true);
    const BottomActionBlock = wrapper.find('BottomActionBlock');
    BottomActionBlock.simulate('click');
    expect(bottomActionOnClick).toHaveBeenCalledTimes(1);
  });
});
