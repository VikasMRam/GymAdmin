import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import qs from 'query-string';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr, Heading } from 'sly/components/atoms';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import { ACTIVITY, AGENT_DASHBOARD_FAMILIES_PATH, SUMMARY } from 'sly/constants/dashboardAppPaths';
import Th from 'sly/components/molecules/Th';
import IconButton from 'sly/components/molecules/IconButton';
import ClientRowCard from 'sly/components/organisms/ClientRowCard';
import AddFamilyFormContainer from 'sly/containers/dashboard/AddFamilyFormContainer';

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
    border-top: 0;
    border-bottom: 0;
  }
`;

const StyledTable = styled(Table)`
  border-right: 0;
  border-left: 0;
`;

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

const FamiliesCountStatusBlock = pad(styled(Box)`
  border-radius: 0;
  padding-left: ${size('spacing.regular')};
  padding-left: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`, 'large');

const TwoColumn = pad(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;

  ${Heading} {
    margin-bottom: 0;
  }
`);

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
    clientName, organization, provider, providerType,
  } = params;
  const filters = {};

  if (tab === tabIDs[1]) {
    filters.type = 'Connected';
  } else if (tab === tabIDs[2]) {
    filters.type = 'Closed';
  }

  if (clientName) {
    filters.name = clientName;
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
  clients, onClientClick, pagination, activeTab, onSearchTextKeyUp, isPageLoading, params, breakpoint, showModal,
  meta, hideModal, notifyInfo,
}) => {
  const prospectsLabel = tabIDLabelMap[tabIDs[0]];
  const connectedLabel = tabIDLabelMap[tabIDs[1]];
  const closedLabel = tabIDLabelMap[tabIDs[2]];
  let prospectsTabLabel = tabIDLabelMap[tabIDs[0]];
  let connectedTabLabel = tabIDLabelMap[tabIDs[1]];
  let closedTabLabel = tabIDLabelMap[tabIDs[2]];
  let handleAddFamilyClick;
  if (!isPageLoading) {
    const { prospectingCount, connectedCount, closedCount } = pagination;
    prospectsTabLabel += ` (${prospectingCount})`;
    connectedTabLabel += ` (${connectedCount})`;
    closedTabLabel += ` (${closedCount})`;
    const { lookingFor, timeToMove } = meta;
    handleAddFamilyClick = () =>
      showModal(<AddFamilyFormContainer notifyInfo={notifyInfo} lookingFor={lookingFor} timeToMove={timeToMove} onCancel={hideModal} />, null, 'noPadding', false);
  }

  const defaultTab = breakpoint.atLeastLaptop() ? ACTIVITY : SUMMARY;
  const beforeTabHeader = (
    <TwoColumn>
      <Heading level="subtitle">My Families</Heading>
      <IconButton icon="user-add" onClick={handleAddFamilyClick} hideTextInMobile>
        Add family
      </IconButton>
    </TwoColumn>
  );

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <Tabs activeTab={activeTab} beforeHeader={beforeTabHeader} tabsOnly>
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
                <Tr>
                  {AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS
                    .map(({ text }) => <Th key={text}>{text}</Th>)
                  }
                </Tr>
              </THead>
              <TBody>
                {clients.map(client => (
                  <ClientRowCard key={client.id} client={client} defaultTab={defaultTab} onClientClick={onClientClick} />
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
        <FamiliesCountStatusBlock padding="regular" size="caption" snap="top">
          {pagination.text}
        </FamiliesCountStatusBlock>
      )}
    </DashboardPageTemplate>
  );
};

DashboardAgentFamilyOverviewPage.propTypes = {
  clients: arrayOf(clientPropType),
  onClientClick: func.isRequired,
  meta: clientMetaPropType,
  pagination: object,
  breakpoint: object,
  paginationString: string,
  activeTab: string,
  showPagination: bool,
  searchTextValue: string,
  onSearchTextKeyUp: func,
  isPageLoading: bool,
  params: object,
  showModal: func.isRequired,
  hideModal: func.isRequired,
  notifyInfo: func.isRequired,
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
