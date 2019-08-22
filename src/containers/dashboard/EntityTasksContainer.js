import React, { Component } from 'react';
import qs from 'query-string';
import { arrayOf, object,string } from 'prop-types';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { withUser, prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { delayedExecutor, getSearchParams } from 'sly/services/helpers/search';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP } from 'sly/constants/familyDetails';
import SlyEvent from 'sly/services/helpers/events';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import { AGENT_DASHBOARD_FAMILIES_NEW_PATH } from 'sly/constants/dashboardAppPaths';
import TasksOverviewPage from 'sly/components/pages/dashboard/TasksOverviewPage';


@prefetch('tasks', 'getTasks', (req, { entityId, entityType }) => req({
  entityId,
  entityType,
}))

@withUser


export default class EntityTasksContainer extends Component {
  static propTypes = {
    entityType: string,
    entityId: string,
    tasks: arrayOf(object),//TODO Change to task property type
  };

  clientClick = (e) => {
    console.log('Would have gone to task detail page',e);
  };

  render() {
    const { tasks } = this.props;
    if (!tasks ){
      return <div>Loading...</div>;
    }
    return <TasksOverviewPage tasks={tasks} onClientClick={this.clientClick} />;


  }
}
