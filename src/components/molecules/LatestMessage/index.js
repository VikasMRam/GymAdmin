import React from 'react';
import { bool, string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { ifProp } from 'styled-tools';

import messagePropType from 'sly/propTypes/conversation/conversationMessage';
import { palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { Box, Block, ClampedText } from 'sly/components/atoms';

const StyledBox = styled(Box)`
  ${ifProp('hasUnread', css`background: ${palette('primary', 'background')}`, '')};
`;

const TopWrapper = pad(styled.div`
  display: flex;
  justify-content: space-between;
`, 'regular');
TopWrapper.displayName = 'TopWrapper';

const LatestMessage = ({
  message, name, hasUnread, onClick,
}) => {
  let dateString = '';
  const parsedDate = dayjs(message.createdAt);
  if (!parsedDate.isValid()) {
    dateString = 'Failed to parse date';
  } else {
    dateString = parsedDate.format('MM/DD/YYYY');
  }
  return (
    <StyledBox noBorderRadius hasUnread={hasUnread} onClick={onClick}>
      <TopWrapper>
        <ClampedText weight="medium" palette="primary">{name}</ClampedText>
        <Block size="caption" palette="grey">{dateString}</Block>
      </TopWrapper>
      <ClampedText size="caption">{message.data.value}</ClampedText>
    </StyledBox>
  );
};

LatestMessage.propTypes = {
  message: messagePropType.isRequired,
  name: string.isRequired,
  hasUnread: bool,
  onClick: func,
};

export default LatestMessage;
