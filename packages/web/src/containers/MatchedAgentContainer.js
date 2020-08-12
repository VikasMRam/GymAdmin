import React, { Component } from 'react';
import { bool, func } from 'prop-types';

import agentPropType from 'sly/common/propTypes/agent';
import { community as communityPropType } from 'sly/common/propTypes/community';
import pad from 'sly/web/components/helpers/pad';
// import PostConversionAdTileContainer from 'sly/web/containers/postConversion/AdTileContainer';
import PostConversionGreetingForm from 'sly/web/components/organisms/PostConversionGreetingForm';
import MatchedAgent from 'sly/web/components/organisms/MatchedAgent';

const PaddedPostConversionGreetingForm = pad(PostConversionGreetingForm);

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
        <div>
          <PaddedPostConversionGreetingForm heading={`You're all set! One of our Local Senior Living Experts will reach out shortly to assist you with pricing for ${community.name}.`} community={community} onSubmit={onSubmit} />
          {/*<PostConversionAdTileContainer type="homeCare" layout="row" community={community} />*/}
        </div>
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
