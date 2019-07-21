import qs from 'querystring';

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Block from 'sly/components/atoms/Block';
import TableRowCard from 'sly/components/molecules/TableRowCard';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Table from 'sly/components/organisms/Table';
import { AGENT_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import SlyEvent from 'sly/services/helpers/events';

const SmallScreenSection = styled.div`
  display: block;
  background-color: ${palette('white.base')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const BigScreenSection = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    background-color: ${palette('white.base')};
  }
`;

const TableRowCardsWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey.background')};
  border-top: ${size('border.regular')} 0 solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const FamiliesCountStatusBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.large')};
`;

const TableRowCardWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`;

const TableSectionWrapper = styled.div`
  overflow: auto;
`;

const TableWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const BigScreenPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${size('spacing.xxxLarge')} ${size('spacing.xxLarge')};
  height: 100vh;
  text-align: center;
`;

const StyledTabs = styled(Tabs)`
  > *:nth-child(1) {
    border-top: 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > *:nth-child(1) {
      border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    }
  }
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
  mobileContents, tableContents, pagination, paginationString, activeTab, showPagination, onSearchTextKeyUp, isPageLoading, params,
}) => {
  const tableHeaderButtons = (
    <TableHeaderButtons
      onSearchTextKeyUp={onSearchTextKeyUp}
    />
  );
  const prospectsLabel = tabIDLabelMap[tabIDs[0]];
  const connectedLabel = tabIDLabelMap[tabIDs[1]];
  const closedLabel = tabIDLabelMap[tabIDs[2]];
  const tabsViewTemplate = (view, prospectsTabLabel, connectedTabLabel, closedTabLabel) => (
    <StyledTabs activeTab={activeTab}>
      <div id={tabIDs[0]} label={prospectsTabLabel} to={getBasePath(tabIDs[0], params)} onClick={() => onTabClick(prospectsLabel)}>
        {view}
      </div>
      <div id={tabIDs[1]} label={connectedTabLabel} to={getBasePath(tabIDs[1], params)} onClick={() => onTabClick(connectedLabel)}>
        {view}
      </div>
      <div id={tabIDs[2]} label={closedTabLabel} to={getBasePath(tabIDs[2], params)} onClick={() => onTabClick(closedLabel)}>
        {view}
      </div>
    </StyledTabs>
  );
  let prospectsTabLabel = tabIDLabelMap[tabIDs[0]];
  let connectedTabLabel = tabIDLabelMap[tabIDs[1]];
  let closedTabLabel = tabIDLabelMap[tabIDs[2]];
  let paginationComponent = null;
  let emptyTextComponent = null;
  if (!isPageLoading) {
    const { current, total, filteredCount } = pagination;
    const paginationParams = {
      current,
      total,
      range: 1,
      basePath: `${getBasePath(activeTab, params)}`,
      pageParam: 'page-number',
    };
    const { tableEmptyText } = tableContents;
    paginationComponent = (showPagination && <Pagination {...paginationParams} />);
    if (activeTab === tabIDs[0]) {
      prospectsTabLabel += ` (${filteredCount})`;
    } else if (activeTab === tabIDs[1]) {
      connectedTabLabel += ` (${filteredCount})`;
    } else if (activeTab === tabIDs[2]) {
      closedTabLabel += ` (${filteredCount})`;
    }
    emptyTextComponent = <EmptyTextWrapper><Block palette="grey">{tableEmptyText}</Block></EmptyTextWrapper>;
  }
  const loadingMessage = <EmptyTextWrapper>Loading...</EmptyTextWrapper>;
  const bigScreenView = (
    <Fragment>
      {!isPageLoading && (
        <Fragment>
          {tableHeaderButtons}
          <TableSectionWrapper>
            <TableWrapper>
              <Table {...tableContents} />
            </TableWrapper>
          </TableSectionWrapper>
          <BigScreenPaginationWrapper>
            {paginationComponent}
          </BigScreenPaginationWrapper>
          <FamiliesCountStatusBlock size="caption">{paginationString}</FamiliesCountStatusBlock>
        </Fragment>
      )}
      {isPageLoading && loadingMessage}
    </Fragment>
  );
  const smallScreenView = (
    <Fragment>
      {!isPageLoading && (
        <Fragment>
          {tableHeaderButtons}
          <TableRowCardsWrapper>
            {mobileContents.length > 0 && (
              <Fragment>
                <FamiliesCountStatusBlock size="caption">{paginationString}</FamiliesCountStatusBlock>
                {mobileContents.map(content => <TableRowCardWrapper key={content.id}><TableRowCard {...content} /></TableRowCardWrapper>)}
                {paginationComponent}
              </Fragment>
            )}
            {mobileContents.length === 0 && emptyTextComponent}
          </TableRowCardsWrapper>
        </Fragment>
      )}
      {isPageLoading && loadingMessage}
    </Fragment>
  );

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <SmallScreenSection>
        {tabsViewTemplate(smallScreenView, prospectsTabLabel, connectedTabLabel, closedTabLabel)}
      </SmallScreenSection>
      <BigScreenSection>
        {tabsViewTemplate(bigScreenView, prospectsTabLabel, connectedTabLabel, closedTabLabel)}
      </BigScreenSection>
    </DashboardPageTemplate>
  );
};

DashboardAgentFamilyOverviewPage.propTypes = {
  mobileContents: arrayOf(object),
  tableContents: object,
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
