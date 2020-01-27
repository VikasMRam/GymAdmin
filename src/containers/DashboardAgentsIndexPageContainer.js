import React from 'react';
import { parse } from 'query-string';
import { object } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentsIndexSectionContainer from 'sly/containers/DashboardAgentsIndexSectionContainer';
import { Datatable } from 'sly/services/datatable';

const DashboardAgentsIndexPageContainer = ({ location }) => {
  const { 'page-number': pageNumber, ...filters } = parse(location.search);
  const sectionFilters = {
    'page-number': pageNumber,
  };
  return (
    <DashboardPageTemplate activeMenuItem="Agents">
      <Datatable
        id="agents"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardAgentsIndexSectionContainer datatable={datatable} />
        )}
      </Datatable>
    </DashboardPageTemplate>);
};

DashboardAgentsIndexPageContainer.propTypes = {
  location: object,
};

export default DashboardAgentsIndexPageContainer;
