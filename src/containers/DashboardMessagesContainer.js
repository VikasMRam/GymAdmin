import React, { Component } from 'react';
import { arrayOf, object, func, bool, string } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { withUser, query } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import withWS from 'sly/services/ws/withWS';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import { Heading, Box } from 'sly/components/atoms';
import LatestMessage from 'sly/components/molecules/LatestMessage';

const HeadingWrapper = styled.div`
  padding: ${size('spacing', 'xLarge')};
  background-color: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-top-left-radius: ${size('border.xLarge')};
  border-top-right-radius: ${size('border.xLarge')};
`;

const MessagesWrapper = styled(Box)`
  background-color: ${palette('white', 'base')};
  padding: ${ifProp('hasMessages', 0, null)};
  border: ${ifProp('hasMessages', 0, null)};

  > * {
    border-top: 0;
  }
`;

const EmptyMessagesWrapper = styled.div`
  padding: ${size('spacing', 'large')};
  text-align: center;
`;

@withUser
@withWS
@query('getConversationMessages', 'getConversationMessages')

export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    isLoading: bool,
    heading: string,
    conversations: arrayOf(conversationPropType),
    onConversationClick: func,
    refetchConversations: func,

    getConversationMessages: func,
    ws: object,
    user: userPropType,
  };

  state = {
    conversations: null,
  };

  static getDerivedStateFromProps(props, state) {
    const conversations = props.conversations || state.conversations;
    return {
      ...state,
      conversations,
    };
  }

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
    const { isLoading, heading, user, onConversationClick } = this.props;
    const { conversations } = this.state;
    const { id: userId } = user;

    let messagesComponent = null;
    let hasMessages = false;
    if (isLoading && !conversations) {
      messagesComponent = <EmptyMessagesWrapper>Loading...</EmptyMessagesWrapper>;
    } else if (conversations.length === 0) {
      messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
    } else if (conversations.length === 1 && !conversations[0].latestMessage) {
      // Scenario where there is a single conversation without a latest message
      messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
    } else {
      hasMessages = true;
      const messages = conversations
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

      messagesComponent = messages.map(message => (
        <LatestMessage
          key={message.message.id}
          name={message.name}
          message={message.message}
          hasUnread={message.hasUnread}
          onClick={() => onConversationClick(message.conversation)}
        />
      ));
    }
    return (
      <>
        <HeadingWrapper>
          <Heading size="subtitle">{heading}</Heading>
        </HeadingWrapper>
        <MessagesWrapper snap="top" hasMessages={hasMessages}>
          {messagesComponent}
        </MessagesWrapper>
      </>
    );
  }
}
