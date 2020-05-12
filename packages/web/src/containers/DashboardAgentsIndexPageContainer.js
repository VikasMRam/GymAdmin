import React from 'react';
import { parse } from 'query-string';
import { object } from 'prop-types';

import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardAgentsIndexSectionContainer from 'sly/web/containers/DashboardAgentsIndexSectionContainer';
import { Datatable } from 'sly/web/services/datatable';

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
