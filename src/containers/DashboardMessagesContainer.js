import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import { connect } from 'react-redux';

import { withUser, prefetch, invalidateRequests } from 'sly/services/newApi';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesPage from 'sly/components/pages/DashboardMessagesPage';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';

@withUser
@prefetch('conversations', 'getConversations', (req, { user }) => req({
  'filter[participant_id]': user && user.id,
  latestMessage: true,
}))

@connect(null, (dispatch, { api }) => ({
  invalidateConversations: () => dispatch(invalidateRequests(api.getConversations)),
}))

export default class DashboardMessagesContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    status: object,
    invalidateConversations: func,
  };

  componentDidMount() {
    const { invalidateConversations } = this.props;
    // TODO: Invalidating conversations since they dont have latestMessage populated.
    // Need to fix backend to not to loop when fetching dependencies
    invalidateConversations();
  }

  render() {
    const { conversations, status } = this.props;
    let messages = [];
    const { conversations: conversationsStatus } = status;
    const {
      isLoading, hasStarted, error: conversationsError,
    } = conversationsStatus;
    if (conversationsError) {
      return <RefreshRedirect to="/" />;
    }
    const isPageLoading = !hasStarted || isLoading;
    if (!isPageLoading) {
      messages = conversations.map((conversation) => {
        const { conversationParticipants, latestMessage } = conversation;
        const { conversationParticipantID } = latestMessage;
        const conversationParticipant = conversationParticipants.find(conversationParticipant => conversationParticipant.id === conversationParticipantID);
        const { participantInfo } = conversationParticipant;
        const { name } = participantInfo;
        return {
          name,
          message: latestMessage,
        };
      });
    }
    return <DashboardMessagesPage messages={messages} />;
  }
}
