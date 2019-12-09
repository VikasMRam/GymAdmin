import React from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import qs from 'query-string';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr } from 'sly/components/atoms';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import clientPropType from 'sly/propTypes/client';
import { AGENT_DASHBOARD_TASKS_PATH } from 'sly/constants/dashboardAppPaths';
import Th from 'sly/components/molecules/Th';

const TASK_TABLE_HEADINGS = [
  { text: 'Title' },
  { text: 'Status' },
  { text: 'Due Date' },
  { text: 'Related' },
  { text: 'Owner' },
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


const tabIDLabelMap = {
  Overdue: 'Overdue',
  Upcoming: 'Upcoming',
  Completed: 'Completed',
};

const tabIDs = Object.keys(tabIDLabelMap);

const onTabClick = (label) => {
  const event = {
    category: 'AgentDashboardFamilyDetailsTaskTab',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const getBasePath = (tab, params) => {
  const filters = {};
  const filterQs = qs.stringify(filters);
  return filterQs !== '' ? `${AGENT_DASHBOARD_TASKS_PATH}?${filterQs}` : AGENT_DASHBOARD_TASKS_PATH;
};

const TasksOverviewPage = ({
  tasks, onClientClick, onAddNewTask, pagination, activeTab, onSearchTextKeyUp, isPageLoading,
}) => {
  const prospectsLabel = tabIDLabelMap[tabIDs[0]];
  const connectedLabel = tabIDLabelMap[tabIDs[1]];
  const closedLabel = tabIDLabelMap[tabIDs[2]];
  const prospectsTabLabel = tabIDLabelMap[tabIDs[0]];
  const connectedTabLabel = tabIDLabelMap[tabIDs[1]];
  const closedTabLabel = tabIDLabelMap[tabIDs[2]];
  const params = {};
  const defaultTab = SUMMARY;
  return (
    <div activeMenuItem="Upcoming">
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

      <TableHeaderButtons onSearchTextKeyUp={onSearchTextKeyUp} onAddNewButtonClick={onAddNewTask} modelName="Task" />

      <Section>
        {!isPageLoading && (
          <>
            <StyledTable>
              <THead>
                <Tr>
                  {TASK_TABLE_HEADINGS
                  .map(({ text }) => <Th key={text}>{text}</Th>)
                }
                </Tr>
              </THead>
              <TBody>
                {tasks.map(task => (
                  <div><div> {task.title}</div><div> {task.title}</div><div> {task.title}</div></div>
               ))}
              </TBody>
            </StyledTable>
            {/* {pagination.show && ( */}
              {/* <StyledPagination */}
            {/* current={pagination.current} */}
            {/* total={pagination.total} */}
            {/* range={1} */}
            {/* basePath={getBasePath(activeTab, params)} */}
            {/* pageParam="page-number" */}
              {/* /> */}
            {/* )} */}
          </>
        )}
        {isPageLoading && 'Loading...'}
      </Section>

    </div>
  );
};

TasksOverviewPage.propTypes = {
  clients: arrayOf(clientPropType),
  onClientClick: func.isRequired,
  onAddNewClient: func,
  pagination: object,
  breakpoint: object,
  paginationString: string,
  activeTab: string,
  showPagination: bool,
  searchTextValue: string,
  onSearchTextKeyUp: func,
  isPageLoading: bool,
  params: object,
  tasks: arrayOf(object),
};

TasksOverviewPage.defaultProps = {
  mobileContents: [],
};

export default TasksOverviewPage;
