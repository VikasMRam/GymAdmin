import React from 'react';
import styled from 'styled-components';
import { string, shape } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { formatDate } from 'sly/services/helpers/date';

const Wrapper = styled.div`
  
`;

const CreatorDateDiv = styled.div`
  display: flex;
  color: ${palette('grayscale', 2)};
  margin-bottom: ${size('spacing.regular')};
`;

const CreatorDiv = styled.div`
  padding-right: ${size('spacing.large')};
`;

const ContentDiv = styled.div`

`;

const CommunityAnswer = ({ answer }) => {
  const { creator, createdAt, contentData } = answer;
  return (
    <Wrapper>
      <CreatorDateDiv><CreatorDiv>{creator}</CreatorDiv><div>{formatDate(new Date(createdAt))}</div></CreatorDateDiv>
      <ContentDiv>{contentData}</ContentDiv>
    </Wrapper>
  );
};

CommunityAnswer.propTypes = {
  answer: shape({
    creator: string.isRequired,
    createdAt: string.isRequired,
    contentData: string.isRequired,
  }).isRequired,
};

export default CommunityAnswer;
