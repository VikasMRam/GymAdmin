import React, { Component } from 'react';
import { object } from 'prop-types';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessageDetailsPage from 'sly/components/pages/DashboardMessageDetailsPage';

@prefetch('conversation', 'getConversation', (req, { match }) => req({
  id: match.params.id,
}))

@withUser

export default class DashboardMessageDetailsPageContainer extends Component {
  static propTypes = {
    conversation: conversationPropType,
    user: userPropType,
    status: object,
  };

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: conversationHasFinished } = status.conversation;

    return userHasFinished && conversationHasFinished;
  };

  render() {
    const { conversation, user } = this.props;
    const isLoading = !this.getHasFinished();

    return (
      <DashboardMessageDetailsPage
        conversation={conversation}
        user={user}
        isLoading={isLoading}
      />
    );
  }
}
