import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';
import WSContext from 'sly/services/ws/WSContext';

@prefetch('messages', 'getConversationMessages', (req, { match }) => req({
  'filter[conversationID]': match.params.id,
  sort: 'created_at',
}))

@prefetch('conversation', 'getConversation', (req, { match }) => req({
  id: match.params.id,
}))

@withUser

export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
    user: userPropType,
    status: object,
  };

  static contextType = WSContext;

  componentDidMount() {
    const pubsub = this.context;
  }

  componentWillUnmount() {
    const pubsub = this.context;
  }

  onMessage = () => {

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
