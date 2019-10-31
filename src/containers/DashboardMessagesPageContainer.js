import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { generatePath } from 'react-router';

import { prefetch } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import userPropType from 'sly/propTypes/user';
import { AGENT_DASHBOARD_MESSAGE_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';

@prefetch('conversations', 'getConversations', req => req())

export default class DashboardMessagesPageContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    status: object,
    history: object,
    user: userPropType,
  };

  onConversationClick = (conversation) => {
    const { history } = this.props;
    const to = generatePath(AGENT_DASHBOARD_MESSAGE_DETAILS_PATH, { id: conversation.id });
    history.push(to);
  }

  refetchConversations = () => {
    const { status } = this.props;
    status.conversations.refetch();
  }

  render() {
    const { conversations, status } = this.props;
    const { conversations: conversationsStatus } = status;
    const {
      hasFinished, error: conversationsError,
    } = conversationsStatus;
    if (conversationsError) {
      return <RefreshRedirect to="/" />;
    }
    return (
      <DashboardMessagesPage
        isLoading={!hasFinished}
        conversations={conversations}
        onConversationClick={this.onConversationClick}
        refetchConversations={this.refetchConversations}
      />
    );
  }
}
