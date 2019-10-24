import React from 'react';
import { arrayOf, func, bool } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessages from 'sly/components/organisms/DashboardMessages';

const DashboardMessagesPage = ({ isLoading, conversations, onConversationClick, refetchConversations }) => {
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <DashboardMessages
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
