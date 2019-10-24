import React from 'react';
import styled from 'styled-components';
import { arrayOf, func, bool, string } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Heading, Box } from 'sly/components/atoms';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';

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

const DashboardMessages = ({ isLoading, heading, conversations, onConversationClick, refetchConversations }) => {
  let messagesComponent = null;
  let hasMessages = false;
  if (isLoading) {
    messagesComponent = <EmptyMessagesWrapper>Loading...</EmptyMessagesWrapper>;
  } else if (conversations.length === 0) {
    messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
  } else if (conversations.length === 1 && !conversations[0].latestMessage) {
    // Scenario where there is a single conversation without a latest message
    messagesComponent = <EmptyMessagesWrapper>No messages</EmptyMessagesWrapper>;
  } else {
    hasMessages = true;
    messagesComponent = <DashboardMessagesContainer conversations={conversations} onConversationClick={onConversationClick} refetchConversations={refetchConversations} />;
  }
  return (
    <>
      <HeadingWrapper>
        <Heading size="subtitle">{heading}</Heading>
      </HeadingWrapper>
      <MessagesWrapper snap="top" hasMessages={hasMessages}>
        {messagesComponent}
      </MessagesWrapper>
    </>
  );
};

DashboardMessages.propTypes = {
  isLoading: bool,
  heading: string.isRequired,
  conversations: arrayOf(conversationPropType),
  onConversationClick: func,
  refetchConversations: func,
};

export default DashboardMessages;
