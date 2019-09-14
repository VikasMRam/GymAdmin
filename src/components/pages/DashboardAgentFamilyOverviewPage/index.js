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

  const sectionFilters = { 'filter[client_type]': match.params.clientType };

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Datatable
        id="clients"
        path={AGENT_DASHBOARD_FAMILIES_PATH}
        params={match.params}
        sectionFilters={sectionFilters}
        filters={parse(location.search)}
      >
        {datatable => (
          <DashboardAgentFamilyOverviewSectionContainer datatable={datatable} />
        )}
      </Datatable>
    </DashboardPageTemplate>
  );
};

export default DashboardAgentFamilyOverviewPage;
