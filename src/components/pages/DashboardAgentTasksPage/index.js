import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import qs from 'query-string';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import { Box, Table, THead, TBody, Tr, Td, Heading, Block } from 'sly/components/atoms';
import IconButton from 'sly/components/molecules/IconButton';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import taskPropType from 'sly/propTypes/task';
import { AGENT_DASHBOARD_TASKS_PATH } from 'sly/constants/dashboardAppPaths';
import Th from 'sly/components/molecules/Th';
import TaskRowCard from 'sly/components/organisms/TaskRowCard';
import AddOrEditTaskFormContainer from 'sly/containers/AddOrEditTaskFormContainer';

const TABLE_HEADINGS = [
  { text: 'Task' },
  { text: 'Related To' },
  { text: 'Due Date' },
  { text: 'Status' },
  { text: 'Priority' },
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

const NoResultMessage = styled(textAlign(Block))`
  padding-top: ${size('spacing.xxxLarge')};
  padding-bottom: ${size('spacing.xxxLarge')};
`;

const tabIDLabelMap = {
  DueToday: 'DUE TODAY',
  Overdue: 'OVERDUE',
  Upcoming: 'UPCOMING',
  Completed: 'COMPLETED',
};

const tabIDs = Object.keys(tabIDLabelMap);

const onTabClick = (label) => {
  const event = {
    category: 'DashboardAgentTasksTab',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const getBasePath = (tab) => {
  const filters = {
    type: tabIDs[0],
  };

  if (tab === tabIDs[1]) {
    filters.type = 'Overdue';
  } else if (tab === tabIDs[2]) {
    filters.type = 'Upcoming';
  } else if (tab === tabIDs[3]) {
    filters.type = 'Completed';
  }

  const filterQs = qs.stringify(filters);

  return filterQs !== '' ? `${AGENT_DASHBOARD_TASKS_PATH}?${filterQs}` : AGENT_DASHBOARD_TASKS_PATH;
};

const DashboardAgentTasksPage = ({
  tasks, pagination, activeTab, onSearchTextKeyUp, isPageLoading,
  showModal, hideModal, meta, notifyInfo, notifyError,
}) => {
  const dueTodayLabel = tabIDLabelMap[tabIDs[0]];
  const overdueLabel = tabIDLabelMap[tabIDs[1]];
  const upcomingLabel = tabIDLabelMap[tabIDs[2]];
  const completedLabel = tabIDLabelMap[tabIDs[3]];

  let dueTodayTabLabel = tabIDLabelMap[tabIDs[0]];
  let overdueTabLabel = tabIDLabelMap[tabIDs[1]];
  let upcomingTabLabel = tabIDLabelMap[tabIDs[2]];
  let completedTabLabel = tabIDLabelMap[tabIDs[3]];

  let handleAddTaskClick;
  let handleTaskClick;
  if (!isPageLoading) {
    const {
      dueTodayCount,
      overdueCount,
      upcomingCount,
      completedCount,
    } = pagination;
    dueTodayTabLabel += ` (${dueTodayCount})`;
    overdueTabLabel += ` (${overdueCount})`;
    upcomingTabLabel += ` (${upcomingCount})`;
    completedTabLabel += ` (${completedCount})`;

    const { priorities, statuses } = meta;
    handleAddTaskClick = () =>
      showModal(
        (
          <AddOrEditTaskFormContainer
            priorities={priorities}
            statuses={statuses}
            onCancel={hideModal}
            notifyInfo={notifyInfo}
            notifyError={notifyError}
            onSuccess={hideModal}
          />
        ), null, 'noPadding', false
      );
    handleTaskClick = task =>
      showModal(
        (
          <AddOrEditTaskFormContainer
            priorities={priorities}
            statuses={statuses}
            onCancel={hideModal}
            notifyInfo={notifyInfo}
            notifyError={notifyError}
            onSuccess={hideModal}
            task={task}
          />
        ), null, 'noPadding', false
      );
  }

  const beforeTabHeader = (
    <TwoColumn>
      <Heading level="subtitle">Tasks</Heading>
      <IconButton icon="plus" hideTextInMobile onClick={handleAddTaskClick}>
        Add task
      </IconButton>
    </TwoColumn>
  );
  let noResultMessage = 'Nice! You are on top of all your tasks for today';
  if (activeTab === tabIDs[1]) {
    noResultMessage = 'Nice! You are on top of all your overdue tasks';
  } else if (activeTab === tabIDs[2]) {
    noResultMessage = 'Nice! You are on top of all your upcoming tasks';
  } else if (activeTab === tabIDs[3]) {
    noResultMessage = 'Nice! You are on top of all your completed tasks';
  }

  return (
    <DashboardPageTemplate activeMenuItem="Tasks">
      <Tabs activeTab={activeTab} tabsOnly beforeHeader={beforeTabHeader}>
        <Tab id={tabIDs[0]} to={getBasePath(tabIDs[0])} onClick={() => onTabClick(dueTodayLabel)}>
          {dueTodayTabLabel}
        </Tab>
        <Tab id={tabIDs[1]} to={getBasePath(tabIDs[1])} onClick={() => onTabClick(overdueLabel)}>
          {overdueTabLabel}
        </Tab>
        <Tab id={tabIDs[2]} to={getBasePath(tabIDs[2])} onClick={() => onTabClick(upcomingLabel)}>
          {upcomingTabLabel}
        </Tab>
        <Tab id={tabIDs[3]} to={getBasePath(tabIDs[3])} onClick={() => onTabClick(completedLabel)}>
          {completedTabLabel}
        </Tab>
      </Tabs>

      <TableHeaderButtons onSearchTextKeyUp={onSearchTextKeyUp} />

      <Section>
        {!isPageLoading && (
          <Fragment>
            <StyledTable>
              <THead>
                <Tr>
                  {TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}
                </Tr>
              </THead>
              <TBody>
                {tasks.map(task => (
                  <TaskRowCard key={task.id} task={task} onTaskClick={() => handleTaskClick(task)} />
                ))}
                {tasks.length === 0 &&
                  <Tr>
                    <Td colSpan={TABLE_HEADINGS.length}>
                      <NoResultMessage>{noResultMessage}</NoResultMessage>
                    </Td>
                  </Tr>
                }
              </TBody>
            </StyledTable>
            {pagination.show && (
              <StyledPagination
                current={pagination.current}
                total={pagination.total}
                range={1}
                basePath={getBasePath(activeTab)}
                pageParam="page-number"
              />
            )}
          </Fragment>
        )}
        {isPageLoading && 'Loading...'}
      </Section>

      {!isPageLoading && tasks.length > 0 &&
        <FamiliesCountStatusBlock padding="regular" size="caption" snap="top">
          {pagination.text}
        </FamiliesCountStatusBlock>
      }
    </DashboardPageTemplate>
  );
};

DashboardAgentTasksPage.propTypes = {
  tasks: arrayOf(taskPropType),
  pagination: object,
  paginationString: string,
  activeTab: string,
  showPagination: bool,
  searchTextValue: string,
  onSearchTextKeyUp: func,
  isPageLoading: bool,
  showModal: func,
  hideModal: func,
  meta: object,
  notifyInfo: func,
  notifyError: func,
};

export default DashboardAgentTasksPage;
