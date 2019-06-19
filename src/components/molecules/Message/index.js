import React from 'react';
import { bool, string } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import participantPropType from 'sly/propTypes/conversation/conversationParticipant';
import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Block, Avatar } from 'sly/components/atoms';

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

const Message = ({
  message, participant, dark, className,
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
      {participant && <StyledAvatar size="small" user={user} />}
      <StyledBox padding="large" dark={dark}>
        <PaddedBlock size="caption">{message.data.value}</PaddedBlock>
        {participant && <Block size="tiny" palette="grey" variant="dark">{dateString}</Block>}
        {!participant && <TextAlignRightBlock size="tiny" palette="grey" variant="dark">{dateString}</TextAlignRightBlock>}
      </StyledBox>
    </Wrapper>
  );
};

Message.propTypes = {
  message: messagePropType.isRequired,
  participant: participantPropType,
  dark: bool,
  className: string,
};

export default Message;
