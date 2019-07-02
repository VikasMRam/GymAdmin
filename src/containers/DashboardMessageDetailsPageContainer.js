import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';
import withWS from 'sly/services/ws/withWS';

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
    ws: object.isRequired,
    match: object.isRequired,
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object,
  };

  componentDidMount() {
    const { ws } = this.props;
    ws.on('notify.message.new', this.onMessage, { capture: true });
  }

  componentWillUnmount() {
    const { ws } = this.props;
    ws.off('notify.message.new', this.onMessage);
  }

  onMessage = (message) => {
    const { match, status } = this.props;
    if (message.payload.conversationId === match.params.id) {
      status.messages.refetch();
      // prevent more handlers to be called
      return false;
    }
    return true;
  };

  computeIsStarted() {
    const { status } = this.props;
    const { hasStarted: userHasStarted } = status.user;
    const { hasStarted: messagesHasStarted } = status.messages;
    const { hasStarted: conversationHasStarted } = status.conversation;

    return userHasStarted && messagesHasStarted && conversationHasStarted;
  }

  computeIsLoading() {
    const { status } = this.props;
    const { isLoading: userIsLoading } = status.user;
    const { isLoading: messagesIsLoading } = status.messages;
    const { isLoading: conversationIsLoading } = status.conversation;
    const isStarted = this.computeIsStarted();

    return !isStarted || userIsLoading || messagesIsLoading || conversationIsLoading;
  }

  render() {
    const { messages, conversation, user } = this.props;
    const isLoading = !this.computeIsStarted() || this.computeIsLoading();
    if (!isLoading && !this.pageLoaded) {
      this.pageLoaded = true;
    }

    return (
      <DashboardMessageDetailsPage
        messages={messages}
        conversation={conversation}
        user={user}
        isLoading={isLoading && !this.pageLoaded}
      />
    );
  }
}
