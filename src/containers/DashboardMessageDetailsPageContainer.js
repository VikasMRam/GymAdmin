import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';
import withWS from 'sly/services/ws/withWS';
import { NOTIFY_MESSAGE_NEW } from 'sly/constants/notifications';

@prefetch('messages', 'getConversationMessages', (req, { match }) => req({
  'filter[conversationID]': match.params.id,
  sort: 'created_at',
}))

@prefetch('conversation', 'getConversation', (req, { match }) => req({
  id: match.params.id,
}))

@withUser

@withWS

export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    ws: object.isRequired,
    match: object.isRequired,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object,
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
    const { match, status } = this.props;
    if (message.payload.conversationId === match.params.id) {
      status.messages.refetch();
      // prevent more handlers to be called if page is visible
      return document.hidden;
    }
    return true;
  };

  render() {
    const {
      messages, conversation, user, status,
    } = this.props;
    const { isLoading: userIsLoading, hasStarted: userHasStarted } = status.user;
    const { isLoading: messagesIsLoading, hasStarted: messagesHasStarted } = status.messages;
    const { isLoading: conversationIsLoading, hasStarted: conversationHasStarted } = status.conversation;
    const isStarted = userHasStarted && messagesHasStarted && conversationHasStarted;
    const isLoading = !isStarted || userIsLoading || messagesIsLoading || conversationIsLoading;
    return (
      <DashboardMessageDetailsPage
        messages={messages}
        conversation={conversation}
        user={user}
        isLoading={isLoading}
      />
    );
  }
}
