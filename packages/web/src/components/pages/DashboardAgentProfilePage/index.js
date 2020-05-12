import React from 'react';
import { string, bool, object } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import PartnerAgentProfileFormContainer from 'sly/containers/PartnerAgentProfileFormContainer';
import userPropType from 'sly/propTypes/user';
import { adminAgentPropType } from 'sly/propTypes/agent';

const DashboardAgentProfilePage = ({ title, user, agent, rawAgent, isLoading }) => {
  return (
    <DashboardPageTemplate activeMenuItem={title}>
      <PartnerAgentProfileFormContainer title={title} user={user} agent={agent} rawAgent={rawAgent} isLoading={isLoading} />
    </DashboardPageTemplate>
  );
};

DashboardAgentProfilePage.propTypes = {
  title: string.isRequired,
  user: userPropType,
  agent: adminAgentPropType,
  rawAgent: object,
  isLoading: bool,
};

export default DashboardAgentProfilePage;
