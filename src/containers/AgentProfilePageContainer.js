import React, { Component } from 'react';
import { object, func } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import { prefetch } from 'sly/services/newApi';
import withNotification from 'sly/controllers/withNotification';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';

const getAgentSlug = match => match.params.agentSlug;

@prefetch('agent', 'getAgent', (req, { match }) => req({ id: getAgentSlug(match) }))
@withNotification

export default class AgentProfilePageContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    history: object,
    notifyInfo: func.isRequired,
  };

  handleConsulationRequested = () => {
    const { notifyInfo, agent: { info: { displayName } } } = this.props;

    notifyInfo(`We have received your request and our Seniorly Partner Agent, ${displayName} will get back to you soon.`);
  };

  render() {
    const { agent, history } = this.props;
    const { location } = history;

    if (!agent) {
      return null;
    }

    return <AgentProfilePage agent={agent} location={location} onConsulationRequested={this.handleConsulationRequested} />;
  }
}

