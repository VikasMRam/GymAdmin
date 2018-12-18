import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import { agents } from 'sly/services/helpers/agents';
import { stateRegionMap } from 'sly/helpers/url';
import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';

export default class AgentsProfilePageContainer extends Component {
  static propTypes = {
    activeProfile: object,
    agents: arrayOf(object),
    handleModalProfile: func,
    set: func,
  };

  state = { activeProfile: null };

  handleModalProfile = (profile) => {
    this.setState({
      activeProfile: profile,
    });
  };

  render() {
    const { activeProfile } = this.state;
    const notFoundRegions = [];
    const regionProfiles = agents.reduce((regionProfilesMap, agent) => {
      const newRegionProfilesMap = regionProfilesMap;
      const profile = {
        id: agent.id,
        heading: agent.user.name,
        description: agent.agentBio,
        imageUrl: agent.mainImage,
      };
      const region = agentStateRegionMap[agent.address.state];
      if (region) {
        if (newRegionProfilesMap[region]) {
          newRegionProfilesMap[region].push(profile);
        } else {
          newRegionProfilesMap[region] = [profile];
        }
      } else {
        notFoundRegions.push(agent.address.state);
      }
      return newRegionProfilesMap;
    }, {});

    return (
      <AgentsProfilePage
        regionProfiles={regionProfiles}
        activeProfile={activeProfile}
        setModalProfile={this.handleModalProfile}
      />
    );
  }
}
