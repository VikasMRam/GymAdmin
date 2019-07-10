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

  state = {
    pageNumber: 0,
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

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished: userHasFinished } = status.user;
    const { hasFinished: conversationHasFinished } = status.conversation;

    return userHasFinished && conversationHasFinished;
  };

  render() {
    const { conversation, user } = this.props;
    const { pageNumber } = this.state;
    const isLoading = !this.getHasFinished();

    return (
      <DashboardMessageDetailsPage
        conversation={conversation}
        user={user}
        isLoading={isLoading}
        pageNumber={pageNumber}
        onScrollTopReached={this.onScrollTopReached}
      />
    );
  }
}
