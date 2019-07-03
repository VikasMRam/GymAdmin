import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { withUser, prefetch } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';

@withUser
@prefetch('conversations', 'getConversations', (req, { user }) => req({
  'filter[participant_id]': user && user.id,
  latestMessage: true,
}))

export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    status: object,
  };

  render() {
    const { conversations, status } = this.props;
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
      messages = conversations.map((conversation) => {
        const { conversationParticipants, latestMessage } = conversation;
        const { conversationParticipantID } = latestMessage;
        const conversationParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.id === conversationParticipantID);
        const { participantInfo } = conversationParticipant;
        const { name } = participantInfo;
        return {
          name,
          message: latestMessage,
        };
      });
    }
    return <DashboardMessagesPage messages={messages} />;
  }
}
