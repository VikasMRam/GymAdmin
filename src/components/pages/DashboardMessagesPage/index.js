import React from 'react';
import { func, object } from 'prop-types';

import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';

const DashboardMessagesPage = ({ datatable, onConversationClick }) => {
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <DashboardMessagesContainer
        datatable={datatable}
        heading="Conversations"
        onConversationClick={onConversationClick}
      />
    </DashboardPageTemplate>
  );
};

DashboardMessagesPage.propTypes = {
  datatable: object,
  onConversationClick: func,
};

export default DashboardMessagesPage;
