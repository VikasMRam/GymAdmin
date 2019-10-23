import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';

const StyledConversationMessagesContainer = styled(ConversationMessagesContainer)`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
`;

const DashboardMessageDetailsPage = ({ conversationId }) => (
  <DashboardPageTemplate activeMenuItem="Messages" bodyHasOverflow>
    <StyledConversationMessagesContainer
      conversationId={conversationId}
    />
  </DashboardPageTemplate>
);

DashboardMessageDetailsPage.propTypes = {
  conversationId: string,
};

export default DashboardMessageDetailsPage;
