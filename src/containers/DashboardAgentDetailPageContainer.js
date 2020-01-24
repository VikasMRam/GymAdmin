import React, { Component } from 'react';
import { object, shape } from 'prop-types';

import DashboardAgentProfilePage from 'sly/components/pages/DashboardAgentProfilePage';
import { withUser, prefetch } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { adminAgentPropType } from 'sly/propTypes/agent';

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
  };

  render() {
    const { user, agent, status } = this.props;
    const { hasFinished: agentHasFinished } = status.agent;
    const { hasFinished: userHasFinished } = status.user;
    const isLoading = !(userHasFinished && agentHasFinished);
    return <DashboardAgentProfilePage user={user} agent={agent} isLoading={isLoading} title="My Profile" />;
  }
}

