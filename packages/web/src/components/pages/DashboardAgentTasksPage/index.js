import React from 'react';
import { generatePath, Redirect } from 'react-router';
import { parse } from 'query-string';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';
import { Datatable } from 'sly/services/datatable';
import { AGENT_DASHBOARD_TASKS_PATH, TODAY } from 'sly/constants/dashboardAppPaths';

const DashboardAgentTasksPage = ({ location, match }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);
  if (!match.params.taskType) {
    return (
      <Redirect
        to={generatePath(AGENT_DASHBOARD_TASKS_PATH, {
          taskType: TODAY,
        })}
      />
    );
  }
  const sectionFilters = {
    taskType: match.params.taskType,
    'page-number': pageNumber,
  };
  return (
    <DashboardPageTemplate activeMenuItem="Tasks">
      <Datatable
        id="tasks"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardAgentTasksSectionContainer datatable={datatable} />
        )}
      </Datatable>

    </DashboardPageTemplate>);
};

export default DashboardAgentTasksPage;