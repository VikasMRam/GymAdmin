import React, { Component } from 'react';
import { bool, func } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import PostConversionGreetingForm from 'sly/components/organisms/PostConversionGreetingForm';
import MatchedAgent from 'sly/components/organisms/MatchedAgent';

export default class MatchedAgentContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    hasNoAgent: bool,
    onLearnMoreClick: func,
  };

  render() {
    const { hasNoAgent, agent, onLearnMoreClick } = this.props;

    if (hasNoAgent) {
      return (
        <PostConversionGreetingForm />
      );
    }

    return (
      <MatchedAgent
        heading={agent ? `${agent.name} will call you shortly to assist you with pricing for Portola Gardens` : ''}
        agent={agent}
        onLearnMoreClick={onLearnMoreClick}
      />
    );
  }
}
