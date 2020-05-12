import React from 'react';
import { string, bool, object } from 'prop-types';

import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import PartnerAgentProfileFormContainer from 'sly/web/containers/PartnerAgentProfileFormContainer';
import userPropType from 'sly/web/propTypes/user';
import { adminAgentPropType } from 'sly/web/propTypes/agent';

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
