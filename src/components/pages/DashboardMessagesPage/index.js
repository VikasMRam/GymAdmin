import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import { Heading, Box } from 'sly/components/atoms';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';

const Wrapper = styled.div`
  padding: ${size('spacing', 'xLarge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: 0;
  }
`;

const HeadingWrapper = styled.div`
  padding: ${size('spacing', 'xLarge')};
  background-color: ${palette('white', 'base')};
  border: ${size('spacing.nano')} solid ${palette('slate', 'stroke')};
  border-top-left-radius: ${size('border.xLarge')};
  border-top-right-radius: ${size('border.xLarge')};
`;

const MessagesWrapper = styled(Box)`
  background-color: ${palette('white', 'base')};
  padding: ${ifProp('hasMessages', 0, null)};
  border: ${ifProp('hasMessages', 0, null)};

  > * {
    border-top: 0;
  }
`;

const EmptyMessagesWrapper = styled.div`
  padding: ${size('spacing', 'large')};
  text-align: center;
`;

const DashboardMessagesPage = ({ isLoading, conversations, onConversationClick, refetchConversations }) => {
  let messagesComponent = null;
  let hasMessages = false;
  if (isLoading) {
    messagesComponent = <EmptyMessagesWrapper>Loading...</EmptyMessagesWrapper>;
  } else if (conversations.length === 0) {
    messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
  } else {
    hasMessages = true;
    messagesComponent = <DashboardMessagesContainer conversations={conversations} onConversationClick={onConversationClick} refetchConversations={refetchConversations} />;
  }
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <Wrapper>
        <HeadingWrapper>
          <Heading size="subtitle">Messages</Heading>
        </HeadingWrapper>
        <MessagesWrapper snap="top" hasMessages={hasMessages}>
          {messagesComponent}
        </MessagesWrapper>
      </Wrapper>
    </DashboardPageTemplate>
  );
};

DashboardMessagesPage.propTypes = {
  // messages: arrayOf(shape({
  //   message: messagePropType.isRequired,
  //   name: string.isRequired,
  //   hasUnread: bool,
  // })),
  isLoading: bool,
  conversations: arrayOf(conversationPropType),
  onConversationClick: func,
  refetchConversations: func,
};

export default DashboardMessagesPage;
