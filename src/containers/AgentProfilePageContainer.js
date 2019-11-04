import React, { Component } from 'react';
import { object } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';
import { prefetch } from 'sly/services/newApi';

const getAgentSlug = match => match.params.agentSlug;

@prefetch('agent', 'getAgent', (req, { match }) => req({ id: getAgentSlug(match) }))

export default class AgentProfilePageContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    history: object,
  };

  render() {
    const { agent, history } = this.props;
    const { location } = history;

    if (!agent) {
      return null;
    }

    return <AgentProfilePage agent={agent} location={location} />;
  }
}

