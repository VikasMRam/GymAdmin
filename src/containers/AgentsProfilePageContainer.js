import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import { agents } from 'sly/services/helpers/agents';
import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';

const agentStateRegionMap = {
  CA: 'West Coast',
  WA: 'West Coast',
  OR: 'West Coast',
  AZ: 'West Coast',
  GA: 'Southeast',
  KS: 'Midwest',
  IL: 'Midwest',
  MI: 'Midwest',
  MO: 'Midwest',
  MN: 'Midwest',
  NE: 'Midwest',
  WI: 'Midwest',
  IN: 'Midwest',
  OH: 'Midwest',
  CO: 'West Coast',
  FL: 'Southeast',
  NY: 'East Coast',
  NJ: 'East Coast',
  TX: 'South',
  ME: 'East Coast',
  PA: 'East Coast',
  MS: 'South',
  AL: 'South',
  AR: 'South',
  UT: 'West Coast',
  CT: 'East Coast',
  DC: 'East Coast',
  DE: 'East Coast',
  HI: 'West Coast',
  IA: 'Midwest',
  NC: 'Southeast',
  SC: 'Southeast',
  TN: 'Tennessee',
  VA: 'East Coast',
  WV: 'East Coast',
};

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