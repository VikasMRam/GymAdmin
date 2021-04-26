import React, { Component } from 'react';
import { parse } from 'query-string';
import { func, object } from 'prop-types';
import { withRouter, generatePath } from 'react-router';

import DashboardAgentIndexPage from 'sly/web/components/pages/DashboardAgentIndexPage';
import AddAgentFormContainer from 'sly/web/containers/dashboard/agents/AddAgentFormContainer'
import withNotification from 'sly/web/components/helpers/notification';
import withModal from 'sly/web/controllers/withModal';
import SlyEvent from 'sly/web/services/helpers/events';
import {
  ADMIN_DASHBOARD_AGENT_DETAILS_PATH,
  AGENT_DETAILS,
} from 'sly/web/constants/dashboardAppPaths';

@withNotification
@withModal
@withRouter

export default class DashboardAgentsIndexPageContainer extends Component {
  static propTypes = {
    location: object,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    history: object,
  };

  onAddAgentSuccess= (resp) => {
    const { history } = this.props;
    const { id } = resp;
    const path = generatePath(ADMIN_DASHBOARD_AGENT_DETAILS_PATH, { id: id, tab: AGENT_DETAILS });
    history.push(path);
  };

  handleAddAgent = () => {
    const {
      showModal,
      hideModal,
      notifyInfo,
      notifyError,
    } = this.props;

    const event = {
      category: 'DashboardAgent',
      action: 'click',
      label: 'addAgent',
    };
    SlyEvent.getInstance().sendEvent(event);
    showModal((
      <AddAgentFormContainer
        notifyInfo={notifyInfo}
        notifyError={notifyError}
        onCancel={hideModal}
        onSuccess={this.onAddAgentSuccess}
      />
    ), null, 'noPadding', false);
  };

  render() {
    const { location } = this.props;
    const { 'page-number': pageNumber, ...filters } = parse(location.search);
    const sectionFilters = {
      'page-number': pageNumber,
    };
    return (
      <DashboardAgentIndexPage
        sectionFilter={sectionFilters}
        filters={filters}
        onAddAgent={this.handleAddAgent}>
      </DashboardAgentIndexPage>

    );
  }
};
