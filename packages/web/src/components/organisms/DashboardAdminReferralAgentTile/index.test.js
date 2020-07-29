import React from 'react';
import { shallow } from 'enzyme';

import { AGENT_STATUS_NAME_MAP } from 'sly/web/constants/agents';
import { getReferralSentTimeText } from 'sly/web/services/helpers/communityReferral';
import DashboardAdminReferralAgentTile from 'sly/web/components/organisms/DashboardAdminReferralAgentTile';
import AgentLinda from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const handleSubmit = jest.fn();

const wrap = (props = {}) => shallow(<DashboardAdminReferralAgentTile agent={AgentLinda} handleSubmit={handleSubmit} {...props} />);

describe('DashboardAdminReferralAgentTile', () => {
  it('does not render passed children', () => {
    const wrapper = wrap({ children: 'test' });

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeTruthy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[AgentLinda.status])).toBeTruthy();
  });

  it('renders without info', () => {
    const agentWithoutInfo = {
      name: AgentLinda.name,
      status: AgentLinda.status,
    };
    const wrapper = wrap({ agent: agentWithoutInfo });

    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeFalsy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeFalsy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeFalsy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeFalsy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[agentWithoutInfo.status])).toBeTruthy();
  });

  it('renders with status 0', () => {
    const newAgent = { ...AgentLinda };
    newAgent.status = 0;
    const wrapper = wrap({ agent: newAgent });
    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeTruthy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[newAgent.status])).toBeTruthy();
  });

  it('renders with Recommended', () => {
    const wrapper = wrap({ isRecommended: true });
    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeTruthy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[AgentLinda.status])).toBeTruthy();

    expect(wrapper.find('IconBadge').find('[text="RECOMMENDED"]')).toHaveLength(2);
  });

  it('renders referralSentAt', () => {
    const referralSentAt = '2018-04-20T08:25:56Z';
    const referralSentAtString = getReferralSentTimeText(referralSentAt);
    const wrapper = wrap({ referralSentAt });
    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeTruthy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[AgentLinda.status])).toBeTruthy();

    expect(wrapper.contains(referralSentAtString)).toBeTruthy();
  });

  it('renders stage', () => {
    const stage = 'New';
    const wrapper = wrap({ stage });
    expect(wrapper.contains(AgentLinda.name)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.slyScore)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.workPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.cellPhone)).toBeTruthy();
    expect(wrapper.contains(AgentLinda.info.last24hrLeadCount)).toBeTruthy();
    expect(wrapper.contains(AGENT_STATUS_NAME_MAP[AgentLinda.status])).toBeTruthy();

    expect(wrapper.find('Stage').find('[stage="New"]')).toHaveLength(1);
  });

  it('render DashboardAdminReferralAgentTile to handle bottom Action ', () => {
    const bottomActionText = 'Change Agent';
    const bottomActionOnClick = jest.fn();
    const wrapper = wrap({ bottomActionText, bottomActionOnClick });
    expect(wrapper.contains(bottomActionText)).toBeTruthy();
    const BottomActionBlock = wrapper.find('BottomActionBlock');
    BottomActionBlock.simulate('click');
    expect(bottomActionOnClick).toHaveBeenCalledTimes(1);
  });
});
