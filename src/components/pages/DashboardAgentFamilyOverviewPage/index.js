import React from 'react';
import { Redirect, generatePath } from 'react-router';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/containers/DashboardAgentFamilyOverviewSectionContainer';
import { Datatable } from 'sly/services/datatable';
import { parse } from 'query-string';

import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  PROSPECTING,
} from 'sly/constants/dashboardAppPaths';

global.generatePath = generatePath;

const DashboardAgentFamilyOverviewPage = ({ match, location }) => {
  if (!match.params.clientType) {
    return (
      <Redirect
        to={generatePath(AGENT_DASHBOARD_FAMILIES_PATH, {
          clientType: PROSPECTING,
        })}
      />
    );
  }
  const { 'page-number': pageNumber, ...filters } = parse(location.search);

  const sectionFilters = {
    client_type: match.params.clientType,
    'page-number': pageNumber,
  };

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Datatable
        id="clients"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardAgentFamilyOverviewSectionContainer datatable={datatable} />
        )}
      </Datatable>
    </DashboardPageTemplate>
  );
};

export default DashboardAgentFamilyOverviewPage;
