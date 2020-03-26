import React from 'react';
import { parse } from 'query-string';
import { object } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardCommunitiesIndexSectionContainer from 'sly/containers/DashboardCommunitiesIndexSectionContainer';
import { Datatable } from 'sly/services/datatable';

const DashboardCommunitiesIndexPageContainer = ({ location }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);
  const sectionFilters = {
    'page-number': pageNumber,
  };
  return (
    <DashboardPageTemplate activeMenuItem="Communities">
      <Datatable
        id="communities"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardCommunitiesIndexSectionContainer datatable={datatable} />
        )}
      </Datatable>
    </DashboardPageTemplate>);
};

DashboardCommunitiesIndexPageContainer.propTypes = {
  location: object,
};

export default DashboardCommunitiesIndexPageContainer;
