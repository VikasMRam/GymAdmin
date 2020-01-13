import React, { Component } from 'react';
import { object } from 'prop-types';
import { parse } from 'query-string';
import { generatePath } from 'react-router';

import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import { AGENT_DASHBOARD_MESSAGE_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import { Datatable } from 'sly/services/datatable';

export default class DashboardMessagesPageContainer extends Component {
  static propTypes = {
    location: object,
    history: object,
  };

  onConversationClick = (conversation) => {
    const { history } = this.props;
    const to = generatePath(AGENT_DASHBOARD_MESSAGE_DETAILS_PATH, { id: conversation.id });
    history.push(to);
  }

  render() {
    const { location } = this.props;

    const { 'page-number': pageNumber, ...filters } = parse(location.search);
    const sectionFilters = {
      'page-number': pageNumber,
    };
    return (
      <Datatable
        id="conversations"
        sectionFilters={sectionFilters}
        filters={filters}
      >
        {datatable => (
          <DashboardMessagesPage
            datatable={datatable}
            onConversationClick={this.onConversationClick}
          />
        )}
      </Datatable>
    );
  }
}
