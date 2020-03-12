import React, { Component } from 'react';
import { object, shape } from 'prop-types';

import DashboardAgentDetailPage from 'sly/components/pages/DashboardAgentDetailPage';
import { withUser, prefetch } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { adminAgentPropType } from 'sly/propTypes/agent';
import { AGENT_DETAILS } from 'sly/constants/dashboardAppPaths';
@withUser
@prefetch('agent', 'getAgent', (req, { match }) => {
  const agentId = match.params.id;
  return req({ id: agentId });
})
export default class DashboardAgentDetailPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    agent: adminAgentPropType.isRequired,
    status: shape({
      user: object,
      agents: object,
    }),
    location: object,
    match: object,
  };

  render() {
    const { user, agent, status, location, match } = this.props;
    const { hasFinished: agentHasFinished, result: rawAgent  } = status.agent;
    const { hasFinished: userHasFinished } = status.user;
    const isLoading = !(userHasFinished && agentHasFinished);
    const currentTab = match.params.tab || AGENT_DETAILS;
    return <DashboardAgentDetailPage user={user} agent={agent} rawAgent={rawAgent} isLoading={isLoading} currentTab={currentTab} location={location} />;
  }
}

