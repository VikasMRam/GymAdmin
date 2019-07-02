import React, { Component } from 'react';
import { arrayOf, shape, object } from 'prop-types';

import { withUser, prefetch } from 'sly/services/newApi';
import DashboardAgentMessagesPage from 'sly/components/pages/DashboardAgentMessagesPage';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';

@withUser
@prefetch('conversations', 'getConversations', (req, { user }) => req({
  'filter[participant_id]': user && user.id,
  latestMessage: true,
}))

export default class DashboardAgentMessagesContainer extends Component {
  static propTypes = {
    conversations: arrayOf(shape({})),
    status: object,
  }

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
        const conversationParticipant = conversationParticipants.filter(conversationParticipant => conversationParticipant.id === conversationParticipantID)[0];
        const { participantInfo } = conversationParticipant;
        const { name } = participantInfo;
        return {
          name,
          message: latestMessage,
        };
      });
    }
    return <DashboardAgentMessagesPage messages={messages} />;
  }
}
