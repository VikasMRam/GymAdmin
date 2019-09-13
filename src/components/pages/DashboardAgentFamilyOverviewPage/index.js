import React from 'react';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/containers/DashboardAgentFamilyOverviewSectionContainer';
import { Datatable } from 'sly/services/datatable';
import { getSearchParams } from 'sly/services/helpers/search';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP } from 'sly/constants/familyDetails';

const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = searchParams.type || 'Prospects';
  const typeStages = FAMILY_STAGE_ORDERED[type];
  const clientType = STAGE_CLIENT_TYPE_MAP[type];
  const clientName = searchParams.name;
  const { organization, provider, providerType } = searchParams;
  return {
    pageNumber: searchParams['page-number'],
    type,
    typeStages,
    clientType,
    clientName,
    organization,
    providerType,
    provider,
  };
};

const getSectionFilters = (pageParams) => {
  const {
    clientType, pageNumber, clientName, organization, providerType, provider,
  } = pageParams;

  const fClientName = clientName ? `cs:${clientName}` : undefined;

  return {
    'filter[client_type]': clientType,
    'filter[name]': fClientName, // FIXME: Arbit use of filter
    'filter[organization]': organization,
    'filter[provider_type]': providerType,
    'filter[provider]': provider,
    'page-number': pageNumber,
  };
};

const DashboardAgentFamilyOverviewPage = ({ match, location }) => {
  const pageParams = getPageParams({ match, location })
  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Datatable id="clients" sectionFilters={getSectionFilters(pageParams)}>
        {datatable => (
          <DashboardAgentFamilyOverviewSectionContainer
            pageParams={pageParams}
            datatable={datatable}
          />
        )}
      </Datatable>
    </DashboardPageTemplate>
  );
};

export default DashboardAgentFamilyOverviewPage;
