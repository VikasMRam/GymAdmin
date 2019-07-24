import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import qs from 'querystring';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Block, Table, THead, TBody } from 'sly/components/atoms';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import clientPropType from 'sly/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import SlyEvent from 'sly/services/helpers/events';
import Th from 'sly/components/molecules/Th';
import ClientRowCard from 'sly/components/organisms/ClientRowCard';

const AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Contact Name' },
  { text: 'Resident Name' },
  { text: 'Stage' },
  { text: 'Latest Activity' },
  { text: 'Date Added' },
];

const Section = styled.section`
  background-color: ${palette('grey.background')};
  padding: ${size('spacing.large')};
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    background-color: ${palette('white.base')};
    border: ${size('border.regular')} solid ${palette('slate.stroke')};
    border-bottom-left-radius: ${size('border.xxLarge')};
    border-bottom-right-radius: ${size('border.xxLarge')};
    border-top: 0;
  }
`;

const StyledTable = styled(Table)`
  border-right: 0;
  border-left: 0;
`;

const StyledPagination = styled(Pagination)`
  padding: ${size('spacing.large')}; 
  justify-content: center;
`;

const FamiliesCountStatusBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.large')};
`;

const tabIDLabelMap = {
  Prospects: 'PROSPECTS',
  Connected: 'CONNECTED',
  Closed: 'CLOSED',
};

const tabIDs = Object.keys(tabIDLabelMap);

const onTabClick = (label) => {
  const event = {
    category: 'AgentDashboardFamilyOverviewTab',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const getBasePath = (tab, params) => {
  const {
    organization, provider, providerType,
  } = params;
  const filters = {};

  if (tab === tabIDs[1]) {
    filters.type = 'Connected';
  } else if (tab === tabIDs[2]) {
    filters.type = 'Closed';
  }

  if (organization) {
    filters.organization = organization;
  }

  if (provider) {
    filters.provider = provider;
  }

  if (providerType) {
    filters.providerType = providerType;
  }

  const filterQs = qs.stringify(filters);

  return filterQs !== '' ? `${AGENT_DASHBOARD_FAMILIES_PATH}?${filterQs}` : AGENT_DASHBOARD_FAMILIES_PATH;
};

const DashboardAgentFamilyOverviewPage = ({
  clients, onClientClick, pagination, activeTab, onSearchTextKeyUp, isPageLoading, params,
}) => {
  const prospectsLabel = tabIDLabelMap[tabIDs[0]];
  const connectedLabel = tabIDLabelMap[tabIDs[1]];
  const closedLabel = tabIDLabelMap[tabIDs[2]];
  let prospectsTabLabel = tabIDLabelMap[tabIDs[0]];
  let connectedTabLabel = tabIDLabelMap[tabIDs[1]];
  let closedTabLabel = tabIDLabelMap[tabIDs[2]];
  if (!isPageLoading) {
    if (activeTab === tabIDs[0]) {
      prospectsTabLabel += ` (${pagination.filteredCount})`;
    } else if (activeTab === tabIDs[1]) {
      connectedTabLabel += ` (${pagination.filteredCount})`;
    } else if (activeTab === tabIDs[2]) {
      closedTabLabel += ` (${pagination.filteredCount})`;
    }
  }

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Tabs activeTab={activeTab} tabsOnly>
        <Tab id={tabIDs[0]} to={getBasePath(tabIDs[0], params)} onClick={() => onTabClick(prospectsLabel)}>
          {prospectsTabLabel}
        </Tab>
        <Tab id={tabIDs[1]} to={getBasePath(tabIDs[1], params)} onClick={() => onTabClick(connectedLabel)}>
          {connectedTabLabel}
        </Tab>
        <Tab id={tabIDs[2]} to={getBasePath(tabIDs[2], params)} onClick={() => onTabClick(closedLabel)}>
          {closedTabLabel}
        </Tab>
      </Tabs>

      <TableHeaderButtons onSearchTextKeyUp={onSearchTextKeyUp} />

      <Section>
        {!isPageLoading && (
          <Fragment>
            <StyledTable>
              <THead>
                {AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS
                  .map(({ text }) => <Th>{text}</Th>)
                }
              </THead>
              <TBody>
                {clients.map(client => (
                  <ClientRowCard client={client} onClientClick={onClientClick} />
                ))}
              </TBody>
            </StyledTable>
            {pagination.show && (
              <StyledPagination
                current={pagination.current}
                total={pagination.total}
                range={1}
                basePath={getBasePath(activeTab, params)}
                pageParam="page-number"
              />
            )}
          </Fragment>
        )}
        {isPageLoading && 'Loading...'}
      </Section>

      {!isPageLoading && (
        <FamiliesCountStatusBlock size="caption">
          {pagination.text}
        </FamiliesCountStatusBlock>
      )}
    </DashboardPageTemplate>
  );
};

DashboardAgentFamilyOverviewPage.propTypes = {
  clients: arrayOf(clientPropType),
  onClientClick: func.isRequired,
  pagination: object,
  paginationString: string,
  activeTab: string,
  showPagination: bool,
  searchTextValue: string,
  onSearchTextKeyUp: func,
  isPageLoading: bool,
  params: object,
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
