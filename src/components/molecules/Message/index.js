import React from 'react';
import { bool } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import clientPropType from 'sly/propTypes/client';
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

const Message = ({ message, client, dark }) => {
  let dateString = '';
  const parsedDate = dayjs(message.createdAt);
  if (!parsedDate.isValid()) {
    dateString = 'Failed to parse date';
  } else {
    dateString = parsedDate.format('h:mm A');
  }
  let user;
  if (client) {
    // todo: when we support user avatars modify this
    const { name } = client.clientInfo;
    user = {
      name,
    };
  }

  return (
    <Wrapper>
      {client && <StyledAvatar size="small" user={user} />}
      <StyledBox padding="large" dark={dark}>
        <PaddedBlock size="caption">{message.data.value}</PaddedBlock>
        {client && <Block size="tiny" palette="grey" variant="dark">{dateString}</Block>}
        {!client && <TextAlignRightBlock size="tiny" palette="grey" variant="dark">{dateString}</TextAlignRightBlock>}
      </StyledBox>
    </Wrapper>
  );
};

Message.propTypes = {
  message: messagePropType.isRequired,
  client: clientPropType,
  dark: bool,
};

export default Message;
