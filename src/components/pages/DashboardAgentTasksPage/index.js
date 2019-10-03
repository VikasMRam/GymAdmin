import React from 'react';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';

const DashboardAgentTasksPage = () => (
  <DashboardPageTemplate activeMenuItem="Tasks">
    <DashboardAgentTasksSectionContainer />
  </DashboardPageTemplate>
);

export default DashboardAgentTasksPage;
