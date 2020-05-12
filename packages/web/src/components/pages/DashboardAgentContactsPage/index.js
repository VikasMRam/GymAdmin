import React from 'react';

import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import DashboardContactsSectionContainer from 'sly/web/containers/dashboard/DashboardContactsSectionContainer';
import { PROPERTY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';

const DashboardAgentContactsPage = () => {
  const sectionFilters = {
    include: 'entities',
    'filter[entity_type]': `eq:${PROPERTY_ENTITY_TYPE}`,
  };
  return (
    <DashboardPageTemplate activeMenuItem="My Contacts">
      <DashboardContactsSectionContainer
        id="contacts"
        sectionFilters={sectionFilters}
        entityType={PROPERTY_ENTITY_TYPE}
      />
    </DashboardPageTemplate>);
};

export default DashboardAgentContactsPage;
