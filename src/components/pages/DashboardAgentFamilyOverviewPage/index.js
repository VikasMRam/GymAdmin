import React from 'react';
import { generatePath } from 'react-router';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/containers/DashboardAgentFamilyOverviewSectionContainer';
import { Datatable } from 'sly/services/datatable';
import { parse } from 'query-string';


global.generatePath = generatePath;

const DashboardAgentFamilyOverviewPage = ({ location }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);

  const sectionFilters = {
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
