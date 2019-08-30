import React, { Component } from 'react';
import qs from 'query-string';
import { arrayOf, object } from 'prop-types';

import taskPropType from 'sly/propTypes/task';
import { withUser, prefetch } from 'sly/services/newApi';
import { delayedExecutor, getSearchParams } from 'sly/services/helpers/search';
import DashboardAgentTasksPage from 'sly/components/pages/DashboardAgentTasksPage';
import ModalController from 'sly/controllers/ModalController';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';

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
  const overdueCount = meta.overdue_count;
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
  const clientName = searchParams.name;
  const { organization } = searchParams;

  return {
    pageNumber: searchParams['page-number'],
    clientName,
    organization,
  };
};

@prefetch('tasks', 'getTasks', (getClients, { match, location }) => {
  const {
    pageNumber, clientName, organization,
  } = getPageParams({ match, location });
  const filters = {
    'filter[name]': clientName,
    'filter[organization]': organization,
    'page-number': pageNumber,
  };
  return getClients(filters);
})

@withUser

export default class DashboardAgentTasksPageContainer extends Component {
  static propTypes = {
    tasks: arrayOf(taskPropType),
    status: object,
    match: object,
    location: object,
    history: object,
  };

  handleSearchTextKeyUp = (event) => {
    const { value } = event.target;
    const { match, location, history } = this.props;
    const { pageNumber, organization } = getPageParams({ match, location });
    const filters = {
      name: value,
      organization,
    };
    if (pageNumber) {
      filters.pageNumber = pageNumber;
    }
    this.sendQuery(history, qs.stringify(filters));
  };

  sendQuery = delayedExecutor((history, filtersQs) => {
    history.push({ search: `?${filtersQs}` });
  }, 'agentTasksSearch', 500);

  render() {
    const {
      tasks, status, match, location,
    } = this.props;

    const params = getPageParams({ match, location });
    const { type } = params;
    const { tasks: tasksStatus } = status;
    const { hasFinished, error: tasksError, meta } = tasksStatus;

    if (tasksError) {
      return <RefreshRedirect to="/" />;
    }
    if (!hasFinished) {
      return (
        <DashboardAgentTasksPage
          isPageLoading={!hasFinished}
          params={params}
        />
      );
    }
    const pagination = getPaginationData(tasksStatus);
    return (
      <ModalController>
        {({ show, hide }) => (
          <DashboardAgentTasksPage
            tasks={tasks}
            pagination={pagination}
            activeTab={type}
            onSearchTextKeyUp={this.handleSearchTextKeyUp}
            params={params}
            showModal={show}
            hideModal={hide}
            meta={meta}
          />
        )}
      </ModalController>
    );
  }
}
