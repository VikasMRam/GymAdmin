import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import { Heading } from 'sly/components/atoms';
import LatestMessage from 'sly/components/molecules/LatestMessage';
import messagePropType from 'sly/propTypes/conversation/conversationMessage';

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

const MessagesWrapper = styled.div`
  background-color: ${palette('white', 'base')};
  > * {
    border-top: 0;
  }
`;

const DashboardAgentMessagesPage = ({ messages }) => {
  let messagesComponent = 'No messages';
  if (messages.length > 0) {
    messagesComponent = messages.map((message) => {
      return <LatestMessage key={message.message.id} name={message.name} message={message.message} />;
    });
  }
  return (
    <DashboardPageTemplate activeMenuItem="Messages">
      <Wrapper>
        <HeadingWrapper>
          <Heading size="subtitle">Messages</Heading>
        </HeadingWrapper>
        <MessagesWrapper>
          {messagesComponent}
        </MessagesWrapper>
      </Wrapper>
    </DashboardPageTemplate>
  );
};

DashboardAgentMessagesPage.propTypes = {
  messages: arrayOf(shape({
    message: messagePropType.isRequired,
    name: string.isRequired,
    hasUnread: bool,
  })),
};

export default DashboardAgentMessagesPage;
