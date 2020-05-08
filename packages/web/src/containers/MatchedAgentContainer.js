import React, { Component } from 'react';
import { bool, func } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import { community as communityPropType } from 'sly/propTypes/community';
import PostConversionAdTileContainer from 'sly/containers/postConversion/AdTileContainer';
import PostConversionGreetingForm from 'sly/components/organisms/PostConversionGreetingForm';
import MatchedAgent from 'sly/components/organisms/MatchedAgent';

export default class MatchedAgentContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    community: communityPropType.isRequired,
    hasNoAgent: bool,
    onSubmit: func,
  };

  render() {
    const { hasNoAgent, agent, community, onSubmit } = this.props;

    if (hasNoAgent) {
      return (
        <PostConversionGreetingForm community={community} onSubmit={onSubmit} />
      );
    }

    return (
      <MatchedAgent
        heading={agent ? `${agent.name} will call you shortly to assist you with pricing for Portola Gardens` : ''}
        agent={agent}
      >
        <PostConversionAdTileContainer community={community} />
      </MatchedAgent>
    );
  }
}
