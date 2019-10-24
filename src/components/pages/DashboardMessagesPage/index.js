import React from 'react';
import { arrayOf, func, bool } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';

const DashboardMessagesPage = ({ isLoading, conversations, onConversationClick, refetchConversations }) => {
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <DashboardMessagesContainer
        isLoading={isLoading}
        heading="Conversations"
        conversations={conversations}
        onConversationClick={onConversationClick}
        refetchConversations={refetchConversations}
      />
    </DashboardPageTemplate>
  );
};

DashboardMessagesPage.propTypes = {
  isLoading: bool,
  conversations: arrayOf(conversationPropType),
  onConversationClick: func,
  refetchConversations: func,
};

export default DashboardMessagesPage;
