import React, { Component } from 'react';
import { object, shape, arrayOf } from 'prop-types';

import DashboardAgentProfilePage from 'sly/web/components/pages/DashboardAgentProfilePage';
import { withUser, prefetch } from 'sly/web/services/api';
import userPropType from 'sly/web/propTypes/user';
import { adminAgentPropType } from 'sly/web/propTypes/agent';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';

@withUser
@prefetch('agents', 'getAgents', (req, { user }) => {
  const filter = {};
  if (user) {
    if (!userIs(user, PLATFORM_ADMIN_ROLE)) {
      const { organization } = user;
      const { id } = organization;
      filter['filter[organization]'] = `eq:${id}`;
    }
  }
  return req(filter);
})
export default class DashboardAgentProfilePageContainer extends Component {
  static propTypes = {
    user: userPropType,
    agents: arrayOf(adminAgentPropType).isRequired,
    status: shape({
      user: object,
      agents: object,
    }),
  };

  render() {
    const { user, agents, status } = this.props;
    const { hasFinished: agentsHasFinished, result } = status.agents;
    const { hasFinished: userHasFinished } = status.user;
    const isLoading = !(userHasFinished && agentsHasFinished);
    let agent = null;
    let rawAgent = null;
    if (agentsHasFinished) {
      ([agent] = agents);
      ([rawAgent] = result);
    }
    return <DashboardAgentProfilePage user={user} agent={agent} rawAgent={rawAgent} isLoading={isLoading} title="Profile" />;
  }
}

