import React, { Component } from 'react';
import { arrayOf } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardAgentMessageDetailsPage from 'sly/components/pages/DashboardAgentMessageDetailsPage';

@prefetch('messages', 'getConversationMessages', (req, { match }) => req({
  'filter[conversationID]': match.params.id,
  sort: '-created_at',
}))

@prefetch('conversation', 'getConversation', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardAgentMessageDetailsPageContainer extends Component {
  static propTypes = {
    messages: arrayOf(messagePropType),
    conversation: conversationPropType,
  }

  render() {
    const { messages, conversation } = this.props;

    // todo: temp
    console.log(messages);
    console.log(conversation);

    return (
      <DashboardAgentMessageDetailsPage />
    );
  }
}
