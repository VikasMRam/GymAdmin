import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';
import { connectController } from 'sly/controllers';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';
import { agents } from 'sly/services/helpers/agents';

const agentStateRegionMap = {
  CA: 'West Coast',
  WA: 'West Coast',
  OR: 'West Coast',
  AZ: 'West Coast',
  GA: 'Southeast',
  KS: 'Midwest',
  OH: 'Midwest',
  CO: 'West Coast',
  FL: 'Southeast',
  NY: 'East Coast',
  TX: 'Southwest',
  ME: 'East Coast',
  PA: 'East Coast',
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
  }

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
    const uniqueArray = notFoundRegions.filter((item, pos) => {
      return notFoundRegions.indexOf(item) === pos;
    });
    return <AgentsProfilePage regionProfiles={regionProfiles} activeProfile={activeProfile} setModalProfile={this.handleModalProfile} />;
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    activeProfile: controller.activeProfile || null,
    // agents: getList(state, 'agent'),
  };
};

const fetchData = (dispatch) => {
  // return dispatch(resourceListReadRequest('agent'));
};

export default connectController(mapStateToProps, fetchData)(AgentsProfilePageController);
