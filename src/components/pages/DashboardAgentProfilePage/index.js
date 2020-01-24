import React from 'react';
import { string, bool } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import PartnerAgentProfileFormContainer from 'sly/containers/PartnerAgentProfileFormContainer';
import userPropType from 'sly/propTypes/user';
import { adminAgentPropType } from 'sly/propTypes/agent';

const DashboardAgentProfilePage = ({ title, user, agent, isLoading }) => {
  return (
    <DashboardPageTemplate activeMenuItem={title}>
      <PartnerAgentProfileFormContainer title={title} user={user} agent={agent} isLoading={isLoading} />
    </DashboardPageTemplate>
  );
};

DashboardAgentProfilePage.propTypes = {
  title: string.isRequired,
  user: userPropType,
  agent: adminAgentPropType,
  isLoading: bool,
};

export default DashboardAgentProfilePage;
