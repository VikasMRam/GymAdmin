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

const getBasePath = (activeTab) => {
  if (activeTab === tabIDs[1]) {
    return `${AGENT_DASHBOARD_FAMILIES_PATH}?type=Connected`;
  } else if (activeTab === tabIDs[2]) {
    return `${AGENT_DASHBOARD_FAMILIES_PATH}?type=Closed`;
  }
  return AGENT_DASHBOARD_FAMILIES_PATH;
};

const DashboardAgentFamilyOverviewPage = ({
  tableContents, pagination, paginationString, activeTab, showPagination, onSearchTextKeyUp, isPageLoading,
}) => {
  const tableHeaderButtons = (
    <TableHeaderButtons
      onSearchTextKeyUp={onSearchTextKeyUp}
    />
  );
  const prospectsLabel = tabIDLabelMap[tabIDs[0]];
  const connectedLabel = tabIDLabelMap[tabIDs[1]];
  const closedLabel = tabIDLabelMap[tabIDs[2]];
  let prospectsTabLabel = tabIDLabelMap[tabIDs[0]];
  let connectedTabLabel = tabIDLabelMap[tabIDs[1]];
  let closedTabLabel = tabIDLabelMap[tabIDs[2]];
  let paginationComponent = null;
  if (!isPageLoading) {
    const { current, total, filteredCount } = pagination;
    const paginationParams = {
      current,
      total,
      range: 1,
      basePath: `${getBasePath(activeTab)}`,
      pageParam: 'page-number',
    };
    paginationComponent = (showPagination && <Pagination {...paginationParams} />);
    if (activeTab === tabIDs[0]) {
      prospectsTabLabel += ` (${filteredCount})`;
    } else if (activeTab === tabIDs[1]) {
      connectedTabLabel += ` (${filteredCount})`;
    } else if (activeTab === tabIDs[2]) {
      closedTabLabel += ` (${filteredCount})`;
    }
  }

  return (
    <DashboardPageTemplate activeMenuItem="My Families">
      <BigScreenSection>
        <StyledTabs activeTab={activeTab} tabsOnly>
          <div id={tabIDs[0]} label={prospectsTabLabel} to={AGENT_DASHBOARD_FAMILIES_PATH} onClick={() => onTabClick(prospectsLabel)} />
          <div id={tabIDs[1]} label={connectedTabLabel} to={`${AGENT_DASHBOARD_FAMILIES_PATH}?type=Connected`} onClick={() => onTabClick(connectedLabel)} />
          <div id={tabIDs[2]} label={closedTabLabel} to={`${AGENT_DASHBOARD_FAMILIES_PATH}?type=Closed`} onClick={() => onTabClick(closedLabel)} />
        </StyledTabs>
        <Fragment>
          {tableHeaderButtons}
          {!isPageLoading && (
            <Fragment>
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
          {isPageLoading && 'Loading...'}
        </Fragment>
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
};

DashboardAgentFamilyOverviewPage.defaultProps = {
  mobileContents: [],
};

export default DashboardAgentFamilyOverviewPage;
