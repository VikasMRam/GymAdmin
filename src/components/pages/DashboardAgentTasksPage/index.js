import React from 'react';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';
import { parse } from 'query-string';
import { Datatable } from 'sly/services/datatable';

const DashboardAgentTasksPage = ({ location }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);

  const sectionFilters = {
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
