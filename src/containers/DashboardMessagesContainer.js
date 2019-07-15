import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';

import { withUser, prefetch, query } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import userPropType from 'sly/propTypes/user';
import withWS from 'sly/services/ws/withWS';
import { AGENT_DASHBOARD_MESSAGE_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';

@withUser
@withWS
@prefetch('conversations', 'getConversations', (req, { user }) => req({
  'filter[participant_id]': user && user.id,
}))
@query('getConversationMessages', 'getConversationMessages')

export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    status: object,
    getConversationMessages: func,
    ws: object.isRequired,
    user: userPropType,
  };

  componentDidMount() {
    const { ws } = this.props;
    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });
  }

  componentWillUnmount() {
    const { ws } = this.props;
    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
  }

  onMessage = (message) => {
    const { getConversationMessages, status } = this.props;
    if (message.payload.conversationId) {
      status.conversations.refetch();
      getConversationMessages({ 'filter[conversationID]': message.payload.conversationId, sort: '-created_at' });
      // prevent more handlers to be called
      return false;
    }
    return true;
  };

  render() {
    const { conversations, status, user } = this.props;
    const { id: userId } = user;
    let messages = [];
    const { conversations: conversationsStatus } = status;
    const {
      isLoading, hasStarted, error: conversationsError,
    } = conversationsStatus;
    if (conversationsError) {
      return <RefreshRedirect to="/" />;
    }
    const isPageLoading = !hasStarted || isLoading;
    if (!isPageLoading) {
      messages = conversations
        .filter(conversation => !!conversation.latestMessage)
        .map((conversation) => {
          const { conversationParticipants, latestMessage } = conversation;
          const { conversationParticipantID } = latestMessage;
          const userParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.participantID === userId);
          const conversationParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.id === conversationParticipantID);
          const { participantInfo } = conversationParticipant;
          const { name } = participantInfo;
          const hasUnread = userParticipant.stats ? userParticipant.stats.unreadMessageCount > 0 : false;
          return {
            name,
            message: latestMessage,
            hasUnread,
            to: AGENT_DASHBOARD_MESSAGE_DETAILS_PATH.replace(':id', conversation.id),
          };
        });
    }
    return <DashboardMessagesPage messages={messages} />;
  }
}
