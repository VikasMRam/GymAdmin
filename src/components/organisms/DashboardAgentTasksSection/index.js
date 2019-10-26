import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import qs from 'query-string';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import taskPropType from 'sly/propTypes/task';
import clientPropType from 'sly/propTypes/client';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Table, THead, TBody, Tr, Td, Heading, Block } from 'sly/components/atoms';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Pagination from 'sly/components/molecules/Pagination';
import Tabs from 'sly/components/molecules/Tabs';
import Tab from 'sly/components/molecules/Tab';
import Th from 'sly/components/molecules/Th';
import IconButton from 'sly/components/molecules/IconButton';
import TaskRowCard from 'sly/components/organisms/TaskRowCard';
import AddOrEditTaskFormContainer from 'sly/containers/AddOrEditTaskFormContainer';
import {
  AGENT_DASHBOARD_TASKS_PATH, TODAY, OVERDUE, UPCOMING, COMPLETED,
} from 'sly/constants/dashboardAppPaths';
import { stripPageNumber } from 'sly/services/helpers/appPaths';


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

const StyledFamiliesCountStatusBlock = styled(FamiliesCountStatusBlock)`
  margin-bottom: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

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

const StyledTableHeaderButtons = styled(TableHeaderButtons)`
  border: none;
`;

const StyledSection = styled(Section)`
  border: none;
`;

const TabMap = {
  Today: TODAY,
  Overdue: OVERDUE,
  Upcoming: UPCOMING,
  Completed: COMPLETED,
};
const tabIDLabelMap = {
  today: 'DUE TODAY',
  overdue: 'OVERDUE',
  upcoming: 'UPCOMING',
  completed: 'COMPLETED',
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

const getBasePath = (taskType, location) => {
  const path = generatePath(AGENT_DASHBOARD_TASKS_PATH, { taskType });
  // TODO: Apply default filters.
  return location && location.search ? `${path}${stripPageNumber(location.search)}` : path;
};

export default class DashboardAgentTasksSection extends Component {
  static propTypes = {
    datatable: object,
    client: clientPropType,
    tasks: arrayOf(taskPropType),
    tasksRaw: arrayOf(object),
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
    refetchTasks: func,
    noBorder: bool,
    basePath: string,
    searchTextBoxValue: string,
  };

  handleAddTaskClick = () => {
    const { showModal, hideModal, notifyInfo, notifyError, meta, client, refetchTasks } = this.props;
    const { priorities, statuses } = meta;
    const event = {
      category: 'AgentDashboardTasks',
      action: 'click',
      label: 'addTask',
    };
    SlyEvent.getInstance().sendEvent(event);
    showModal(
      (
        <AddOrEditTaskFormContainer
          priorities={priorities}
          statuses={statuses}
          onCancel={hideModal}
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          onSuccess={hideModal}
          client={client}
          refetchTasks={refetchTasks}
        />
      ), null, 'noPadding', false
    );
  };

  handleTaskClick = (task) => {
    const { showModal, hideModal, notifyInfo, notifyError, meta, tasksRaw, refetchTasks, client } = this.props;
    const { priorities, statuses } = meta;
    const event = {
      category: 'AgentDashboardTasks',
      action: 'click',
      label: 'viewTask',
    };
    SlyEvent.getInstance().sendEvent(event);
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
          tasksRaw={tasksRaw}
          refetchTasks={refetchTasks}
          client={client}
        />
      ), null, 'noPadding', false
    );
  };

  render() {
    const {
      tasks, pagination, activeTab, isPageLoading, noBorder, meta, basePath, location,
      datatable,
    } = this.props;
    const beforeTabHeader = (
      <TwoColumn>
        <Heading level="subtitle">Tasks</Heading>
        <IconButton icon="plus" hideTextInMobile onClick={this.handleAddTaskClick}>
          Add task
        </IconButton>
      </TwoColumn>
    );
    const noResultMessage = 'Nice! You are on top of all your tasks here.';


    const TableHeaderButtonComponent = noBorder ? StyledTableHeaderButtons : TableHeaderButtons;
    const SectionComponent = noBorder ? StyledSection : Section;
    const StatusBlock = noBorder ? StyledFamiliesCountStatusBlock : FamiliesCountStatusBlock;
    const modelConfig = { name: 'Task', defaultSearchField: 'title' };

    return (
      <>
        <Tabs activeTab={activeTab} beforeHeader={beforeTabHeader} tabsOnly>
          {Object.entries(TabMap)
            .map(([name, key]) => (
              <Tab
                id={key}
                key={key}
                to={getBasePath(key, location)}
                onClick={() => onTabClick(name)}
              >
                {`${name} (${pagination[`${key}Count`] || '0'})`}
              </Tab>
            ))}
        </Tabs>
        <TableHeaderButtonComponent
          datatable={datatable}
          modelConfig={modelConfig}
          meta={meta}
        />


        <SectionComponent>
          {!isPageLoading && (
            <>
              <StyledTable>
                <THead>
                  <Tr>
                    {TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}
                  </Tr>
                </THead>
                <TBody>
                  {tasks.map(task => (
                    <TaskRowCard key={task.id} task={task} onTaskClick={() => this.handleTaskClick(task)} />
                  ))}
                  {tasks.length === 0 &&
                    <Tr>
                      <Td colSpan={TABLE_HEADINGS.length} borderless={noBorder}>
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
                  basePath={datatable.basePath}
                  pageParam="page-number"
                />
              )}
            </>
          )}
          {isPageLoading && 'Loading...'}
        </SectionComponent>

        {!isPageLoading && tasks.length > 0 &&
          <StatusBlock padding="regular" size="caption" snap="top">
            {pagination.text}
          </StatusBlock>
        }
      </>
    );
  }
}
