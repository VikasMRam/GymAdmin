import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/web/services/api';
import withNotification from 'sly/web/components/helpers/notification';
import clientPropType from 'sly/common/propTypes/client';
import taskPropType from 'sly/common/propTypes/task';
import DashboardAgentTasksSection from 'sly/web/components/organisms/DashboardAgentTasksSection';
import ModalController from 'sly/web/controllers/ModalController';

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
  const todayCount = meta.due_today_count;
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
    todayCount,
    overdueCount,
    upcomingCount,
    completedCount,
  });
};

@withRouter
@withUser
@prefetch('tasks', 'getTasks', (req, { datatable, client }) => {
  if (client) {
    const qs = datatable.query;
    const { id } = client;
    qs['filter[client]'] = id;
    return req(qs);
  }
  return req(datatable.query);
})
@withNotification

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
    const { tasks, status, match, location, datatable, notifyError, notifyInfo, ...props } = this.props;

    // const params = getPageParams({ match, location });
    // const { taskType, taskName } = params;
    const { error, meta, hasFinished, result: tasksRaw } = status.tasks;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
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
    );
  }
}
