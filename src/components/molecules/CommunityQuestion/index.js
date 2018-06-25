import React from 'react';
import styled from 'styled-components';
import { string, shape } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { formatDate } from 'sly/services/helpers/date';

const Wrapper = styled.div`
  
`;

const QuestionTextDiv = styled.div`
  margin-bottom: ${size('spacing.regular')};
  font-size: ${size('text.subtitle')};
  font-weight: bold;
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

const CommunityQuestion = ({ question }) => {
  const { creator, createdAt, contentData } = question;
  return (
    <Wrapper>
      <QuestionTextDiv>Question</QuestionTextDiv>
      <CreatorDateDiv><CreatorDiv>{creator}</CreatorDiv><div>{formatDate(createdAt)}</div></CreatorDateDiv>
      <ContentDiv>{contentData}</ContentDiv>
    </Wrapper>
  );
};

CommunityQuestion.propTypes = {
  question: shape({
    creator: string.isRequired,
    createdAt: string.isRequired,
    contentData: string.isRequired,
  }).isRequired,
};

export default CommunityQuestion;
