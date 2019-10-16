import React from 'react';
import { bool, number, func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import {
  AGENT_DASHBOARD_MESSAGES_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  DASHBOARD_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, SUMMARY,
} from 'sly/constants/dashboardAppPaths';
import { CUSTOMER_ROLE, AGENT_ND_ROLE } from 'sly/constants/roles';
import { CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import Role from 'sly/components/common/Role';
import textAlign from 'sly/components/helpers/textAlign';
import fullWidth from 'sly/components/helpers/fullWidth';
import fullHeight from 'sly/components/helpers/fullHeight';
import { Block, Link } from 'sly/components/atoms';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import BackLink from 'sly/components/molecules/BackLink';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';

const TextCenterBlock = fullHeight(textAlign(Block));

const FullWidthTextCenterBlock = fullWidth(TextCenterBlock);

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledConversationMessagesContainer = styled(ConversationMessagesContainer)`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
`;

const DashboardMessageDetailsPage = ({
  user, conversation, isLoading, refetchConversation,
}) => {
  let headingBoxSection = '';
  let conversationParticipants = [];
  let viewingAsParticipant;
  let otherParticipant;
  let sendMessageFormPlaceholder = '';

  if (!isLoading) {
    if (!conversation) {
      return (
        <>
          <Role is={CUSTOMER_ROLE}>
            <Redirect to={FAMILY_DASHBOARD_MESSAGES_PATH} />;
          </Role>
          <Role is={AGENT_ND_ROLE}>
            <Redirect to={AGENT_DASHBOARD_MESSAGES_PATH} />;
          </Role>
        </>
      );
    }
    ({ conversationParticipants } = conversation);
    const { id } = user;
    viewingAsParticipant = conversationParticipants.find(p => p.participantID === id);
    (otherParticipant = conversationParticipants.find(p => p.participantID !== id));
    const name = otherParticipant && otherParticipant.participantInfo ? otherParticipant.participantInfo.name : '';
    const otherParticipantIsClient = otherParticipant.participantType === CONVERSATION_PARTICIPANT_TYPE_CLIENT;
    sendMessageFormPlaceholder = otherParticipant && otherParticipant.participantInfo && `Message ${otherParticipant.participantInfo.name.split(' ').shift()}...`;

    const heading = (
      <HeaderWrapper>
        <Role is={CUSTOMER_ROLE}>
          <BackLink to={FAMILY_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <Role is={AGENT_ND_ROLE}>
          <BackLink to={AGENT_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <FullWidthTextCenterBlock size="subtitle" palette={otherParticipantIsClient && 'primary'}>
          {otherParticipantIsClient
            ? <Link size="subtitle" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: otherParticipant.participantID, tab: SUMMARY })}>{name}</Link>
            : name
          }
        </FullWidthTextCenterBlock>
      </HeaderWrapper>
    );

    headingBoxSection = (
      <HeadingBoxSection heading={heading} hasNoBodyPadding hasNoBorder />
    );
  }

  return (
    <DashboardPageTemplate activeMenuItem="Messages" bodyHasOverflow>
      {!isLoading && !conversation && <Redirect to={DASHBOARD_PATH} />}
      {isLoading &&
        <>
          <br />
          <FullWidthTextCenterBlock size="caption">Loading...</FullWidthTextCenterBlock>
        </>
      }
      {!isLoading &&
        <>
          <StyledConversationMessagesContainer
            conversation={conversation}
            viewingAsParticipant={viewingAsParticipant}
            participants={conversationParticipants}
            headingBoxSection={headingBoxSection}
            sendMessageFormPlaceholder={sendMessageFormPlaceholder}
            refetchConversation={refetchConversation}
          />
        </>
      }
    </DashboardPageTemplate>
  );
};

DashboardMessageDetailsPage.propTypes = {
  conversation: conversationPropType,
  user: userPropType,
  isLoading: bool,
  pageNumber: number,
  refetchConversation: func,
};

export default DashboardMessageDetailsPage;
