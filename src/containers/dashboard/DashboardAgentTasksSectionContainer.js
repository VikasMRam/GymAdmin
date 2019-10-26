import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';
import qs from 'query-string';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import taskPropType from 'sly/propTypes/task';
import { TASK_STATUS_NOT_STARTED_CODE, TASK_STATUS_IN_PROGRESS_CODE } from 'sly/constants/tasks';
import { getSearchParams } from 'sly/services/helpers/search';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import DashboardAgentTasksSection from 'sly/components/organisms/DashboardAgentTasksSection';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';

const getPaginationData = ({ result, meta }) => {
  if (!result) return {};

  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} tasks`;
  const show = filteredCount > size;
  const dueTodayCount = meta.due_today_count;
  const overdueCount = meta.over_due_count;
  const upcomingCount = meta.upcoming_count;
  const completedCount = meta.completed_count;

  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
    dueTodayCount,
    overdueCount,
    upcomingCount,
    completedCount,
  });
};
/*
const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = match.params.taskType
  const taskName = searchParams.title;
  let date;
  let status = `in:${TASK_STATUS_NOT_STARTED_CODE},${TASK_STATUS_IN_PROGRESS_CODE}`;
  if (type === 'DueToday') {
    date = dayjs().format('YYYY-MM-DD');
  } else if (type === 'Overdue') {
    date = `lt:${dayjs().format('YYYY-MM-DD')}`;
  } else if (type === 'Upcoming') {
    date = `gt:${dayjs().format('YYYY-MM-DD')}`;
  }
  if (type === 'Completed') {
    status = '20';
  }

  return {
    status,
    date,
    type,
    taskName,
    pageNumber: searchParams['page-number'],
  };
};
*/
@withRouter

@withUser

@prefetch('tasks', 'getTasks', (req, { datatable, client }) => {
  // const { pageNumber, date, status, taskName } = getPageParams({ match, location });
  // const filters = {
  //   'filter[status]': status,
  //   'page-number': pageNumber,
  //   'filter[title]': taskName,
  // };
  // if (date) {
  //   filters['filter[dueDate]'] = date;
  // }
  const filters  = {};
  if (client) {
    const { id } = client;
    filters['filter[client]'] = id;
    return req(filters);
  }
  return req(datatable.query);
})

export default class DashboardAgentTasksSectionContainer extends Component {
  static propTypes = {
    tasks: arrayOf(taskPropType),
    client: clientPropType,
    status: object,
    history: object,
    datatable: object,
    match: object,
    location: object,
  };

  refetchTasks = () => {
    const { status } = this.props;
    status.tasks.refetch();
  };

  render() {
    const { tasks, status, match, location, datatable, ...props } = this.props;

    // const params = getPageParams({ match, location });
    // const { taskType, taskName } = params;
    const { error, meta, hasFinished, result: tasksRaw } = status.tasks;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <NotificationController>
        {({ notifyInfo, notifyError }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardAgentTasksSection
                {...props}
                isPageLoading={!hasFinished || !datatable.hasFinished}
                datatable={datatable}
                tasks={tasks}
                tasksRaw={tasksRaw}
                pagination={getPaginationData(status.tasks)}
                activeTab={match.params.taskType}
                // onSearchTextKeyUp={this.handleSearchTextKeyUp}
                showModal={show}
                hideModal={hide}
                meta={meta || {}}
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                refetchTasks={this.refetchTasks}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
