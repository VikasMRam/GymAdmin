import React, { Component } from 'react';
import { func, object, arrayOf } from 'prop-types';

import AgentsProfilePage from 'sly/components/pages/AgentsProfilePage';
import { connectController } from 'sly/controllers';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';

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

  processAgents = (agents) => {
    const profiles = [];
    agents.forEach((agent) => {
      const profile = {
        id: agent.id,
        heading: agent.name,
        subHeading: '',
        description: agent.agentBio,
        imageUrl: agent.mainImage,
      };
      profiles.push(profile);
    });
    return profiles;
  }

  render() {
    const { activeProfile, agents } = this.props;
    const profiles = this.processAgents(agents);
    return <AgentsProfilePage profiles={profiles} activeProfile={activeProfile} setModalProfile={this.handleModalProfile} />;
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    activeProfile: controller.activeProfile || null,
    agents: getList(state, 'agent'),
  };
};

const fetchData = (dispatch) => {
  return dispatch(resourceListReadRequest('agent'));
};

export default connectController(mapStateToProps, fetchData)(AgentsProfilePageController);
