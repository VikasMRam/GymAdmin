import React, { Component } from 'react';
import { object, arrayOf } from 'prop-types';
import dayjs from 'dayjs';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import conversationMessagePropType from 'sly/propTypes/conversation/conversationMessage';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';
import withWS from 'sly/services/ws/withWS';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';
import { MESSAGES_UPDATE_LAST_READ_TIMEOUT } from 'sly/constants/conversations';

@prefetch('messages', 'getConversationMessages', (req, { match }) => req({
  'filter[conversationID]': match.params.id,
  sort: '-created_at',
}))

@prefetch('conversation', 'getConversation', (req, { match }) => req({
  id: match.params.id,
}))

@withUser

@withWS

export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    conversation: conversationPropType,
    user: userPropType,
    status: object,
    ws: object,
    messages: arrayOf(conversationMessagePropType),
  };

  componentDidMount() {
    const { updateLastReadMessageAt } = this;
    const {
      ws, messages, conversation, user,
    } = this.props;
    ws.on(NOTIFY_MESSAGE_NEW, this.onMessage, { capture: true });

    if (messages && messages.length) {
      const parsedLastestMessageCreatedAt = dayjs(messages[0].createdAt).utc();
      const { conversationParticipants } = conversation;
      const { id: userId } = user;
      const viewingAsParticipant = conversationParticipants.find(p => p.participantID === userId);
      const parsedViewedCreatedAt = dayjs(viewingAsParticipant.stats.lastReadMessageAt).utc();
      if (parsedLastestMessageCreatedAt.isAfter(parsedViewedCreatedAt)) {
        setTimeout(updateLastReadMessageAt, MESSAGES_UPDATE_LAST_READ_TIMEOUT);
      }
    }
  }

  componentWillUnmount() {
    const { ws } = this.props;
    ws.off(NOTIFY_MESSAGE_NEW, this.onMessage);
  }

  onMessage = (message) => {
    const { conversation, status } = this.props;
    const { id } = conversation;
    if (message.payload.conversationId === id) {
      status.messages.refetch();
      // prevent more handlers to be called
      return false;
    }
    return true;
  };

  onScrollTopReached = (numberOfMessages) => {
    const { conversation } = this.props;
    let { pageNumber } = this.state;
    const { info } = conversation;
    const { messageCount } = info;

    if (numberOfMessages < messageCount) {
      pageNumber += 1;
      this.setState({
        pageNumber,
      });
    }
  };

  computeIsStarted = () => {
    const { status } = this.props;
    const { hasStarted: userHasStarted } = status.user;
    const { hasStarted: conversationHasStarted } = status.conversation;

    return userHasStarted && conversationHasStarted;
  };

  computeIsLoading = () => {
    const { status } = this.props;
    const { isLoading: userIsLoading } = status.user;
    const { isLoading: conversationIsLoading } = status.conversation;
    const isStarted = this.computeIsStarted();

    return !isStarted || userIsLoading || conversationIsLoading;
  };

  render() {
    const { onScrollTopReached } = this;
    const { conversation, user } = this.props;
    const { pageNumber } = this.state;
    const isLoading = !this.computeIsStarted() || this.computeIsLoading();

    return (
      <DashboardMessageDetailsPage
        conversation={conversation}
        user={user}
        isLoading={isLoading}
        pageNumber={pageNumber}
        onScrollTopReached={onScrollTopReached}
      />
    );
  }
}
