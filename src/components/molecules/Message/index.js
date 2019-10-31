import React from 'react';
import { bool, string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import participantPropType from 'sly/propTypes/conversation/conversationParticipant';
import { size, palette } from 'sly/components/themes';
import {
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST,
  CONVERSATION_MESSAGE_DATA_TYPE_TEXT,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE,
  CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK,
} from 'sly/constants/conversations';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Block, Avatar, Button } from 'sly/components/atoms';

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

const onClickTypeButtons = [CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE];

const textMessageTypes = [CONVERSATION_MESSAGE_DATA_TYPE_TEXT, CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_AUTOMATED_RESPONSE];

const isClickableButtonType = button => onClickTypeButtons.includes(button.action.type);

const isLinkButtonType = button => button.action.type === CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST_ACTION_OPEN_LINK;

const isButtonSelected = (message, button) => message.data.valueButtonList.selectedButtons.includes(button.text);

const Message = ({
  message, participant, dark, className, onButtonClick,
}) => {
  let dateString = '';
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

  return (
    <Wrapper className={className}>
      {user && <StyledAvatar size="small" user={user} />}
      {textMessageTypes.includes(message.data.type) && (
        <StyledBox padding="large" dark={dark}>
          <PaddedBlock size="caption">{message.data.valueText}</PaddedBlock>
          {user && <Block size="tiny" palette="grey" variant="dark">{dateString}</Block>}
          {!user && <TextAlignRightBlock size="tiny" palette="grey" variant="dark">{dateString}</TextAlignRightBlock>}
        </StyledBox>
      )}
      {message.data.type === CONVERSATION_MESSAGE_DATA_TYPE_BUTTONLIST &&
        <ButtonsWrapper>
          {message.data.valueButtonList.buttons.map(b => (
            <Button
              ghost
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
  dark: bool,
  className: string,
  onButtonClick: func,
};

export default Message;
