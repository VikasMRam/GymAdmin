import React, { Component } from 'react';
import { arrayOf, object, func, bool } from 'prop-types';

import { withUser, query } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import withWS from 'sly/services/ws/withWS';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import LatestMessage from 'sly/components/molecules/LatestMessage';

@withUser
@withWS
@query('getConversationMessages', 'getConversationMessages')

export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    isLoading: bool,
    conversations: arrayOf(conversationPropType),
    onConversationClick: func,
    refetchConversations: func,

    getConversationMessages: func,
    ws: object,
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
    const { getConversationMessages, refetchConversations } = this.props;
    if (message.payload.conversationId) {
      refetchConversations();
      getConversationMessages({ 'filter[conversationID]': message.payload.conversationId, sort: '-created_at' });
      // prevent more handlers to be called
      return false;
    }
    return true;
  };

  render() {
    const { conversations, user, onConversationClick } = this.props;
    const { id: userId } = user;
    let messages = [];
    messages = conversations
      .filter(conversation => !!conversation.latestMessage)
      .map((conversation) => {
        const { conversationParticipants, latestMessage } = conversation;
        const { conversationParticipantID } = latestMessage;
        const userParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.participantID === userId);
        const conversationParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.id === conversationParticipantID);
        const { participantInfo } = conversationParticipant;
        const { name } = participantInfo;
        let hasUnread = false;
        if (userParticipant == null) {
          hasUnread = true;
        } else {
          hasUnread = userParticipant.stats ? userParticipant.stats.unreadMessageCount > 0 : false;
        }
        return {
          name,
          message: latestMessage,
          hasUnread,
          conversation,
        };
      });

    return messages.map(message => (
      <LatestMessage
        key={message.message.id}
        name={message.name}
        message={message.message}
        hasUnread={message.hasUnread}
        onClick={() => onConversationClick(message.conversation)}
      />
    ));
  }
}
