import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';
import qs from 'query-string';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import taskPropType from 'sly/propTypes/task';
import { TASK_STATUS_NOT_STARTED_CODE, TASK_STATUS_IN_PROGRESS_CODE } from 'sly/constants/tasks';
import { getSearchParams } from 'sly/services/helpers/search';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import DashboardAgentTasksSection from 'sly/components/organisms/DashboardAgentTasksSection';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';

const getPaginationData = ({ result, meta }) => {
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

const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = searchParams.type || 'DueToday';
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
    pageNumber: searchParams['page-number'],
  };
};

@withRouter

@prefetch('tasks', 'getTasks', (getClients, { match, location }) => {
  const { pageNumber, date, status } = getPageParams({ match, location });
  const filters = {
    'filter[status]': status,
    'page-number': pageNumber,
  };
  if (date) {
    filters['filter[dueDate]'] = date;
  }

  return getClients(filters);
})

@withUser

export default class DashboardAgentTasksSectionContainer extends Component {
  static propTypes = {
    tasks: arrayOf(taskPropType),
    status: object,
    history: object,
    match: object,
    location: object,
  };

  refetchTasks = () => {
    const { status } = this.props;
    status.tasks.refetch();
  };

  handleSearchTextKeyUp = (event) => {
    const { value } = event.target;
    const { match, location, history } = this.props;
    const {
      pageNumber, date, status, type,
    } = getPageParams({ match, location });
    const filters = {
      name: value,
      'filter[status]': status,
      pageNumber,
      type,
    };
    if (date) {
      filters['filter[dueDate]'] = date;
    }

    this.sendQuery(history, qs.stringify(filters));
  };

  sendQuery = debounce((history, filtersQs) => {
    history.push({ search: `?${filtersQs}` });
  }, 200);

  render() {
    const { tasks, status, match, location, ...props } = this.props;

    const params = getPageParams({ match, location });
    const { type } = params;
    const { tasks: tasksStatus } = status;
    const { hasFinished, error: tasksError, meta, result: tasksRaw } = tasksStatus;

    if (tasksError) {
      return <RefreshRedirect to="/" />;
    }
    if (!hasFinished) {
      return (
        <DashboardAgentTasksSection
          isPageLoading={!hasFinished}
        />
      );
    }
    const pagination = getPaginationData(tasksStatus);

    return (
      <NotificationController>
        {({ notifyInfo, notifyError }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardAgentTasksSection
                {...props}
                isPageLoading={!hasFinished}
                tasks={tasks}
                tasksRaw={tasksRaw}
                pagination={pagination}
                activeTab={type}
                onSearchTextKeyUp={this.handleSearchTextKeyUp}
                showModal={show}
                hideModal={hide}
                meta={meta}
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