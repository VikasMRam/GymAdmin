import React, { Component } from 'react';
import { arrayOf, object, func, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import { withUser, query, prefetch } from 'sly/web/services/api';
import conversationPropType from 'sly/common/propTypes/conversation/conversation';
import userPropType from 'sly/common/propTypes/user';
import withWS from 'sly/web/services/ws/withWS';
import { NOTIFY_MESSAGE_NEW } from 'sly/web/constants/notifications';
import { Heading, Box } from 'sly/web/components/atoms';
import LatestMessage from 'sly/web/components/molecules/LatestMessage';
import { getConversationName } from 'sly/web/services/helpers/conversation';
import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';
import Pagination from 'sly/web/components/molecules/Pagination';
import { getDetailedPaginationData } from 'sly/web/services/helpers/pagination';
import { withDatatable } from 'sly/web/services/datatable';

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

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
  bottom: 0;
  background-color: ${palette('grey.background')};
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

@withUser
@withWS
@withDatatable('conversations')
@query('getConversationMessages', 'getConversationMessages')
@prefetch('conversations', 'getConversations', (req, { clientId, agentId, datatable }) => {
  const payload = datatable.query;
  if (clientId) {
    payload['filter[client]'] = clientId;
  } else if (agentId) {
    payload['filter[agent]'] = agentId;
  }
  return req(payload);
})
export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    heading: string,
    conversations: arrayOf(conversationPropType),
    onConversationClick: func,
    getConversationMessages: func,
    ws: object,
    user: userPropType,
    status: object,
    datatable: object,
  };

  componentDidMount() {
    const { ws } = this.props;
    ws.pubsub.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });
  }

  componentWillUnmount() {
    const { ws } = this.props;
    ws.pubsub.off(NOTIFY_MESSAGE_NEW, this.onMessage);
  }

  onMessage = (message) => {
    const { getConversationMessages } = this.props;
    const { refetchConversations } = this;
    if (message.payload.conversationId) {
      refetchConversations();
      getConversationMessages({ 'filter[conversationID]': message.payload.conversationId, sort: '-created_at' });
      // prevent more handlers to be called
      return false;
    }
    return true;
  };

  refetchConversations = () => {
    const { status } = this.props;
    status.conversations.refetch();
  }

  removeDuplicate = (entities) => {
    const result = [];
    const map = {};
    entities.forEach((entity) => {
      if (!map[entity.id]) {
        map[entity.id] = true;
        result.push(entity);
      }
    });
    return result;
  }

  render() {
    const { heading, onConversationClick, user, datatable, status, conversations } = this.props;
    const { conversations: conversationsStatus } = status;
    const { hasFinished: conversationsHasFinished, meta } = conversationsStatus;
    const isLoading = !conversationsHasFinished;
    const { id: userId } = user || {};
    const pagination = getDetailedPaginationData(conversationsStatus, 'conversations');

    let messagesComponent = null;
    let hasMessages = false;
    if (isLoading && !conversations) {
      messagesComponent = <EmptyMessagesWrapper>Loading...</EmptyMessagesWrapper>;
    } else if (conversations.length === 0) {
      messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
    } else {
      hasMessages = true;
      const messages = this.removeDuplicate(conversations)
        .map((conversation) => {
          const { conversationParticipants, latestMessage } = conversation;
          const name = getConversationName(conversation, user);
          if (latestMessage) {
            const userParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.participantID === userId);
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
          }
          return {
            name,
            conversation,
          };
        });
      messagesComponent = messages.map(message => (
        <LatestMessage
          key={message.conversation.id}
          name={message.name}
          message={message.message}
          hasUnread={message.hasUnread}
          onClick={() => onConversationClick(message.conversation)}
        />
      ));
    }
    const modelConfig = { name: 'Conversation', defaultSearchField: 'user-name' };
    return (
      <>
        <HeadingWrapper>
          <Heading size="subtitle">{heading}</Heading>
        </HeadingWrapper>
        <TableHeaderButtons
          datatable={datatable}
          modelConfig={modelConfig}
          meta={meta || {}}
        />
        <MessagesWrapper snap="top" hasMessages={hasMessages}>
          {messagesComponent}
        </MessagesWrapper>
        {pagination.show && (
          <StyledPagination
            current={pagination.current}
            total={pagination.total}
            range={1}
            basePath={datatable.basePath}
            pageParam="page-number"
          />
        )}
      </>
    );
  }
}
