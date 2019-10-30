import React from 'react';
import { func, arrayOf } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminCommunityAgentList from 'sly/components/organisms/DashboardAdminCommunityAgentList';

const DashboardAdminSearchCommunityAgents = ({ handleCommunitySearch, communities }) => (
  <>
    <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
    <DashboardAdminCommunityAgentList communitiesWithAgents={communities || []} />
  </>
);

DashboardAdminSearchCommunityAgents.propTypes = {
  handleCommunitySearch: func.isRequired,
  communities: arrayOf(communityPropType),
};

export default DashboardAdminSearchCommunityAgents;
