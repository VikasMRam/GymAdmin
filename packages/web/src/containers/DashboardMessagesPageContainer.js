import React, { Component } from 'react';
import { object } from 'prop-types';
import { generatePath } from 'react-router';

import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import { AGENT_DASHBOARD_MESSAGE_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';

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
    return (
      <DashboardMessagesPage
        onConversationClick={this.onConversationClick}
      />
    );
  }
}
