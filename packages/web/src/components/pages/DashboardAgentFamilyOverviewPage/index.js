import React from 'react';
import { Redirect, generatePath } from 'react-router';
import { object } from 'prop-types';

import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/web/containers/DashboardAgentFamilyOverviewSectionContainer';
import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  NEWFAMILIES,
} from 'sly/web/constants/dashboardAppPaths';

global.generatePath = generatePath;

const DashboardAgentFamilyOverviewPage = ({ match }) => {
  if (!match.params.clientType) {
    return (
      <Redirect
        to={generatePath(AGENT_DASHBOARD_FAMILIES_PATH, {
          clientType: NEWFAMILIES,
        })}
      />
    );
  }

  const sectionFilters = {
    client_type: match.params.clientType,
  };

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <DashboardAgentFamilyOverviewSectionContainer sectionFilters={sectionFilters} />
    </DashboardPageTemplate>
  );
};

DashboardAgentFamilyOverviewPage.propTypes = {
  match: object,
};

export default DashboardAgentFamilyOverviewPage;
