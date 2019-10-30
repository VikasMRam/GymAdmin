import React, { Component } from 'react';
import { arrayOf } from 'prop-types';

import { adminCommunityPropType } from 'sly/propTypes/community';
import { Box, Link, Hr } from 'sly/components/atoms';
import DashboardAdminCommunityTile from 'sly/components/organisms/DashboardAdminCommunityTile';
import DashboardAdminAgentTile from 'sly/components/organisms/DashboardAdminAgentTile';

export default class DashboardAdminCommunityAgentList extends Component {
  static propTypes = {
    communitiesWithAgents: arrayOf(adminCommunityPropType).isRequired,
  };

  state = {
    showAgents: [],
  };

  toggleShowAgents = (idx) => {
    const sat = this.state.showAgents;
    sat[idx] = !sat[idx];
    this.setState({
      showAgents: sat,
    });
  };
  //TODO : Notify Error and Info are not present
  render() {
    const { communitiesWithAgents } = this.props;
    const { showAgents } = this.state;
    const listComponents = communitiesWithAgents.map((communityWithAgents, idx) => {
      const { partnerAgents: agents } = communityWithAgents;
      return (
        <Box>
          <DashboardAdminCommunityTile community={communityWithAgents} /><Hr />
          { showAgents[idx] && agents.map((agent, idx) => (<div><DashboardAdminAgentTile notifyError={() => {}} notifyInfo={() => {}} agent={agent} isRecommended={idx === 0} /><Hr /></div>))}
          { showAgents[idx] && <Link onClick={() => this.toggleShowAgents(idx)}>Hide Agents</Link>}
          { !showAgents[idx] && <Link onClick={() => this.toggleShowAgents(idx)}>Show Agents</Link>}
        </Box>
      );
    });

    return (
      <>
        {listComponents}
      </>
    );
  }
}
