import React from 'react';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardContactsSectionContainer from 'sly/containers/dashboard/DashboardContactsSectionContainer';

const DashboardAgentContactsPage = () => {
  const sectionFilters = {
    include: 'entities',
    'filter[entity_type]': 'eq:Property',
  };
  return (
    <DashboardPageTemplate activeMenuItem="My Contacts">
      <DashboardContactsSectionContainer
        id="contacts"
        sectionFilters={sectionFilters}
      />
    </DashboardPageTemplate>);
};

export default DashboardAgentContactsPage;
