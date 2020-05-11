import React from 'react';
import { func } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';

const DashboardMessagesPage = ({ onConversationClick }) => {
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <DashboardMessagesContainer
        heading="Conversations"
        onConversationClick={onConversationClick}
      />
    </DashboardPageTemplate>
  );
};

DashboardMessagesPage.propTypes = {
  onConversationClick: func,
};

export default DashboardMessagesPage;
