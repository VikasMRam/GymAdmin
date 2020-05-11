import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { ClampedText } from 'sly/components/atoms';


const Wrapper = styled.div`
  padding: ${size('spacing.regular')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};

  :hover {
    cursor: pointer;
    background: ${palette('grey', 'stroke')};
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grey', 'stroke')};
  }
`;

const NameTimestampWrapper = styled.div`
  display: flex
`;

const TimestampText = styled(ClampedText)`
  margin-left: auto;
`;

const EmailListItem = ({ from, subject, body, timestamp, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <NameTimestampWrapper>
        <ClampedText weight="bold">{from}</ClampedText>
        <TimestampText size="caption">{timestamp}</TimestampText>
      </NameTimestampWrapper>
      <ClampedText>{subject}</ClampedText>
      <ClampedText size="caption" dangerouslySetInnerHTML={{ __html: body }} />
    </Wrapper>
  );
};

EmailListItem.propTypes = {
  from: string,
  subject: string,
  body: string,
  timestamp: string,
  onClick: func,
};

export default EmailListItem;
