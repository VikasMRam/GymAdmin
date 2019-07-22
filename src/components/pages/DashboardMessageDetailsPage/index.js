import React, { Fragment } from 'react';
import { bool, number } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import {
  AGENT_DASHBOARD_MESSAGES_PATH,
  FAMILY_DASHBOARD_MESSAGES_PATH,
  DASHBOARD_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
} from 'sly/constants/dashboardAppPaths';
import { CUSTOMER_ROLE, AGENT_ROLE } from 'sly/constants/roles';
import { CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import Role from 'sly/components/common/Role';
import textAlign from 'sly/components/helpers/textAlign';
import fullWidth from 'sly/components/helpers/fullWidth';
import fullHeight from 'sly/components/helpers/fullHeight';
import pad from 'sly/components/helpers/pad';
import { Block, Link } from 'sly/components/atoms';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import HeadingBoxSection from 'sly/components/molecules/HeadingBoxSection';
import BackLink from 'sly/components/molecules/BackLink';
import SendMessageFormContainer from 'sly/containers/SendMessageFormContainer';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';

const TextCenterBlock = fullHeight(textAlign(Block));

const FullWidthTextCenterBlock = fullWidth(TextCenterBlock);

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeadingBoxSection = styled(HeadingBoxSection)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSendMessageFormContainer = pad(styled(SendMessageFormContainer)`
  margin-left: ${size('spacing.xLarge')};
  margin-right: ${size('spacing.xLarge')};
  margin-top: ${size('spacing.xLarge')};
  flex-grow: 0;
`, 'large');

const StyledConversationMessagesContainer = styled(ConversationMessagesContainer)`
  flex-grow: 1;
  overflow: auto;
`;

const DashboardMessageDetailsPage = ({
  user, conversation, isLoading,
}) => {
  let heading = '';
  let conversationParticipants = [];
  let viewingAsParticipant;
  let otherParticipant;

  if (!isLoading) {
    ({ conversationParticipants } = conversation);
    const { id } = user;
    viewingAsParticipant = conversationParticipants.find(p => p.participantID === id);
    (otherParticipant = conversationParticipants.find(p => p.participantID !== id));
    const name = otherParticipant && otherParticipant.participantInfo ? otherParticipant.participantInfo.name : '';
    const otherParticipantIsClient = otherParticipant.participantType === CONVERSATION_PARTICIPANT_TYPE_CLIENT;

    heading = (
      <HeaderWrapper>
        <Role is={CUSTOMER_ROLE}>
          <BackLink to={FAMILY_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <Role is={AGENT_ROLE}>
          <BackLink to={AGENT_DASHBOARD_MESSAGES_PATH} />
        </Role>
        <FullWidthTextCenterBlock size="subtitle" palette={otherParticipantIsClient && 'primary'}>
          {otherParticipantIsClient ?
            <Link size="subtitle" to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id: otherParticipant.participantID })}>{name}</Link> : name}
        </FullWidthTextCenterBlock>
      </HeaderWrapper>
    );
  }

  return (
    <DashboardPageTemplate activeMenuItem="Messages" bodyHasOverflow>
      {!isLoading && !conversation && <Redirect to={DASHBOARD_PATH} />}
      <StyledHeadingBoxSection heading={heading} hasNoBodyPadding>
        {isLoading &&
          <Fragment>
            <br />
            <FullWidthTextCenterBlock size="caption">Loading...</FullWidthTextCenterBlock>
          </Fragment>
        }
        {!isLoading &&
          <Fragment>
            <StyledConversationMessagesContainer
              conversation={conversation}
              viewingAsParticipant={viewingAsParticipant}
              participants={conversationParticipants}
            />
            <StyledSendMessageFormContainer otherParticipant={otherParticipant} viewingAsParticipant={viewingAsParticipant} />
          </Fragment>
        }
      </StyledHeadingBoxSection>
    </DashboardPageTemplate>
  );
};

DashboardMessageDetailsPage.propTypes = {
  conversation: conversationPropType,
  user: userPropType,
  isLoading: bool,
  pageNumber: number,
};

export default DashboardMessageDetailsPage;
