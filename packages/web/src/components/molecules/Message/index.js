import React from 'react';
import { bool, string, func, object } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import messagePropType from 'sly/web/propTypes/conversation/conversationMessage';
import participantPropType from 'sly/web/propTypes/conversation/conversationParticipant';
import { size, palette } from 'sly/web/components/themes';
import {
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST,
  CONVERSATION_MESSAGE_DATA_TYPE_TEXT,
  CONVERSATION_MESSAGE_DATA_TYPE_HTML,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK,
} from 'sly/web/constants/conversations';
import pad from 'sly/web/components/helpers/pad';
import { Box, Block, Button } from 'sly/web/components/atoms';
import Avatar from 'sly/web/components/molecules/Avatar';
import HelpBubble from 'sly/web/components/molecules/HelpBubble';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledBox = styled(Box)`
  ${ifProp('dark', css`background: ${palette('grey', 'background')}`, '')};
  ${ifProp('dark', 'border: none', '')};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) minmax(min-content, max-content);
`;

const PaddedBlock = pad(Block, 'regular');
PaddedBlock.displayName = 'PaddedBlock';

const StyledAvatar = styled(Avatar)`
  margin-right: ${size('spacing.regular')};
`;

const TextAlignRightBlock = textAlign(Block, 'right');
TextAlignRightBlock.displayName = 'TextAlignRightBlock';

const ButtonsWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.regular')};
`;

const TimestampAndStatusWrapper = styled.div`
  display: flex;
`;

const HelpBubbleWrapper = styled.div`
  margin-left: auto;
`;

const onClickTypeButtons = [CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE];

const textMessageTypes = [CONVERSATION_MESSAGE_DATA_TYPE_TEXT, CONVERSATION_MESSAGE_DATA_TYPE_HTML, CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE];

const isClickableButtonType = button => onClickTypeButtons.includes(button.action.type);

const isLinkButtonType = button => button.action.type === CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK;

const isButtonSelected = (message, button) => message.data.valueButtonList.selectedButtons.includes(button.text);

const isHtmlMessage = message => message.data.type === CONVERSATION_MESSAGE_DATA_TYPE_HTML;

const getValue = message => message.data[`value${message.data.type}`];

const Message = ({
  message, participant, participantsById, viewingAsConversationParticipant, dark, className, onButtonClick,
}) => {
  let dateString = '';
  const sentToArray = [];
  let sentToString = '';
  const parsedDate = dayjs(message.createdAt);
  if (!parsedDate.isValid()) {
    dateString = 'Failed to parse date';
  } else {
    dateString = parsedDate.format('h:mm A');
  }
  let user;
  if (participant) {
    ({ participantInfo: user } = participant);
  }
  const { info } = message;
  if (info) {
    if (info.sendgridEmailStatuses) {
      for (let i = 0; i < info.sendgridEmailStatuses.length; i++) {
        const status = info.sendgridEmailStatuses[i];
        if (status.receivingParticipantSlug) {
          const { receivingParticipantSlug, emailStatus } = status;
          const participant = participantsById[receivingParticipantSlug];
          if (participant) {
            const { participantInfo } = participant;
            const { name } = participantInfo;
            sentToArray.push({ name, status: emailStatus, type: 'Email' });
          }
        }
      }
    }
    if (info.twilioSMSStatuses) {
      for (let i = 0; i < info.twilioSMSStatuses.length; i++) {
        const status = info.twilioSMSStatuses[i];
        if (status.receivingParticipantSlug) {
          const { receivingParticipantSlug, smsStatus } = status;
          const participant = participantsById[receivingParticipantSlug];
          if (participant) {
            const { participantInfo } = participant;
            const { name } = participantInfo;
            sentToArray.push({ name, status: smsStatus, type: 'SMS' });
          }
        }
      }
    }
  }
  for (let i = 0; i < sentToArray.length; i++) {
    const element = sentToArray[i];
    sentToString += `${element.type} ${element.status} to ${element.name}. `;
  }
  return (
    <Wrapper className={className}>
      {user && <StyledAvatar size="small" user={user} />}
      {textMessageTypes.includes(message.data.type) && (
        <StyledBox padding="large" dark={dark}>
          {!isHtmlMessage(message) && <PaddedBlock size="caption">{getValue(message)}</PaddedBlock>}
          {isHtmlMessage(message) && <PaddedBlock size="caption" dangerouslySetInnerHTML={{ __html: getValue(message) }} />}
          <TimestampAndStatusWrapper>
            {user && <Block size="tiny" palette="grey" variant="dark">{dateString}</Block>}
            {!user && <TextAlignRightBlock size="tiny" palette="grey" variant="dark">{dateString}</TextAlignRightBlock>}
            {sentToString !== '' && (
              <HelpBubbleWrapper>
                <HelpBubble>{sentToString}</HelpBubble>
              </HelpBubbleWrapper>
            )}
          </TimestampAndStatusWrapper>
        </StyledBox>
      )}
      {message.data.type === CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST &&
        <ButtonsWrapper>
          {getValue(message).buttons.map(b => (
            <Button
              ghost
              disabled={!viewingAsConversationParticipant} // only participants should be able to click; eg: admin viewing shouldn't click
              selected={isButtonSelected(message, b)}
              key={b.text}
              onClick={() => isClickableButtonType(b) && !isButtonSelected(message, b) && onButtonClick(message, b)}
              to={isLinkButtonType(b) ? b.action.value : null}
            >
              {b.text}
            </Button>
          ))}
        </ButtonsWrapper>
      }
    </Wrapper>
  );
};

Message.propTypes = {
  message: messagePropType.isRequired,
  participant: participantPropType,
  participantsById: object,
  viewingAsConversationParticipant: bool,
  dark: bool,
  className: string,
  onButtonClick: func,
};

export default Message;
