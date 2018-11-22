import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';
import { connectController } from 'sly/controllers';
import { agents } from 'sly/services/helpers/agents';

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

class AgentsProfilePageController extends Component {
  static propTypes = {
    activeProfile: object,
    agents: arrayOf(object),
    handleModalProfile: func,
    set: func,
  };

  handleModalProfile = (profile) => {
    const { set } = this.props;
    set({
      activeProfile: profile,
    });
  };

  render() {
    const { activeProfile } = this.props;
    const notFoundRegions = [];
    const regionProfiles = agents.reduce((regionProfilesMap, agent) => {
      const profile = {
        id: agent.id,
        heading: agent.user.name,
        description: agent.agentBio,
        imageUrl: agent.mainImage,
      };
      const region = agentStateRegionMap[agent.address.state];
      if (region) {
        if (regionProfilesMap[region]) {
          regionProfilesMap[region].push(profile);
        } else {
          regionProfilesMap[region] = [profile];
        }
      } else {
        notFoundRegions.push(agent.address.state);
      }
      return regionProfilesMap;
    }, {});

    return <AgentsProfilePage regionProfiles={regionProfiles} activeProfile={activeProfile} setModalProfile={this.handleModalProfile} />;
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    activeProfile: controller.activeProfile || null,
  };
};

export default connectController(mapStateToProps)(AgentsProfilePageController);
