import React from 'react';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import { parse } from 'query-string';
import { Datatable } from 'sly/services/datatable';
import DashboardAgentContactsSectionContainer from 'sly/containers/dashboard/DashboardAgentContactsSectionContainer';

const DashboardAgentContactsPage = ({ location, match }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);
  // if (!match.params.taskType) {
  //   return (
  //     <Redirect
  //       to={generatePath(AGENT_DASHBOARD_TASKS_PATH, {
  //         taskType: TODAY,
  //       })}
  //     />
  //   );
  // }
  const sectionFilters = {
    // taskType: match.params.taskType,
    'page-number': pageNumber,
  };
  return (
    <DashboardPageTemplate activeMenuItem="My Contacts">
      <Datatable
        id="contacts"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardAgentContactsSectionContainer datatable={datatable} />
        )}
      </Datatable>

    </DashboardPageTemplate>);
};

export default DashboardAgentContactsPage;
