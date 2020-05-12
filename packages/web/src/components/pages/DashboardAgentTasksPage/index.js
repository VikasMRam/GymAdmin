import React from 'react';
import { generatePath, Redirect } from 'react-router';
import { parse } from 'query-string';

import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardAgentTasksSectionContainer from 'sly/web/containers/dashboard/DashboardAgentTasksSectionContainer';
import { Datatable } from 'sly/web/services/datatable';
import { AGENT_DASHBOARD_TASKS_PATH, TODAY } from 'sly/web/constants/dashboardAppPaths';

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
