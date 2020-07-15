import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import ConversationMessagesContainer from 'sly/web/containers/ConversationMessagesContainer';

const StyledConversationMessagesContainer = styled(ConversationMessagesContainer)`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
`;

const StyledPageTemplate = styled(DashboardPageTemplate)`
  overflow: auto;
`;

const DashboardMessageDetailsPage = ({ conversationId, onBackClick }) => (
  <StyledPageTemplate activeMenuItem="Messages">
    <StyledConversationMessagesContainer
      conversationId={conversationId}
      onBackClick={onBackClick}
    />
  </StyledPageTemplate>
);

DashboardMessageDetailsPage.propTypes = {
  conversationId: string,
  onBackClick: func,
};

export default DashboardMessageDetailsPage;
