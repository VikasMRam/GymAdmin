import React, { Component, Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Box } from 'sly/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';

import DashboardAdminReferralAgentTile from 'sly/components/organisms/DashboardAdminReferralAgentTile';

export default class DashboardAgentReferrals extends Component {
  static propTypes = {
    handleAgentSearch: func.isRequired,
    sendReferral: func.isRequired,
    agents: arrayOf(adminCommunityPropType),

  };

  render() {
    const { handleAgentSearch, agents, sendReferral } = this.props;
    const agentList = (agents || []).map((e, idx) => <Box key={e.name}><DashboardAdminReferralAgentTile agent={e} sendReferral={sendReferral} /></Box>);
    return (
      <Fragment>
        <DashboardCommunityAgentSearchBox handleSubmit={handleAgentSearch} />
        {agentList.length > 0 && agentList }
      </Fragment>
    );
  }
}
