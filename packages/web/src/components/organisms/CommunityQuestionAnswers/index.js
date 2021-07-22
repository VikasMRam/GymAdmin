import React, { Fragment } from 'react';
import { string, arrayOf, func } from 'prop-types';
import styled from 'styled-components';

import { content as contentPropType } from 'sly/common/propTypes/content';
import CommunityQuestion from 'sly/web/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/web/components/molecules/CommunityAnswer';
import { Button, Hr, Block, color, space } from 'sly/common/system';

const PaddedCommunityQuestion = styled(CommunityQuestion)`
  margin-bottom: ${space('m')};
`;
PaddedCommunityQuestion.displayName = 'PaddedCommunityQuestion';

const CursorBlock = styled(Block)`
  background: ${color('primary.base')};
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
`;
CursorBlock.displayName = 'CursorBlock';

const sortByCreatedAt = (a, b) => a.createdAt > b.createdAt;

const CommunityQuestionAnswers = ({
  communityName, questions, onLeaveAnswerClick, communityFaQs, onAskQuestionClick,
}) => {
  const questionsComponent = questions.sort(sortByCreatedAt).map((question, i) => {
    const { contents = [] } = question;

    const answersComponents = contents.sort(sortByCreatedAt).map((answer, i) => (
      <Fragment key={answer.id}>
        <CommunityAnswer answer={answer} />
        {i < contents.length - 1 && <Hr />}
      </Fragment>
    ));
    const firstAnswerComponent = answersComponents[0];
    if (answersComponents.length) {
      answersComponents.shift();
    }

    return (
      <Fragment key={question.id}>
        <PaddedCommunityQuestion question={question} />
        {firstAnswerComponent}
        <Block marginLeft="huge">
          {answersComponents}
        </Block>
        <CursorBlock onClick={() => onLeaveAnswerClick(question)}>Leave an Answer</CursorBlock>
        {i < questions.length - 1 && <Hr />}
      </Fragment>
    );
  });

  const communityFaQsComponent = communityFaQs.sort(sortByCreatedAt).map((communityFaQ, i) => (
    <Fragment key={communityFaQ.id}>
      <PaddedCommunityQuestion question={communityFaQ} />
      <CursorBlock onClick={() => onAskQuestionClick(communityFaQ)}>Be the first to ask this question</CursorBlock>
      {i < communityFaQs.length - 1 && <Hr />}
    </Fragment>
  ));

  return (
    <>
      {questionsComponent}
      {questionsComponent.length === 0 && <>What would you like to know about senior living options at {communityName}? To ask a question, click the button below.</>}
      {communityFaQsComponent.length > 0 &&
        <>
          <Hr />
          <Block mb="l" fontSize="20px" fontWeight="500">Other questions to consider</Block>
          {communityFaQsComponent}
        </>
      }
      <Button width="100%" mt="l" onClick={() => onAskQuestionClick()}>Ask a Question</Button>
    </>
  );
};

CommunityQuestionAnswers.propTypes = {
  communityName: string.isRequired,
  questions: arrayOf(contentPropType).isRequired,
  communityFaQs: arrayOf(contentPropType),
  onLeaveAnswerClick: func.isRequired,
  onAskQuestionClick: func.isRequired,
};

CommunityQuestionAnswers.defaultProps = {
  communityFaQs: [],
};

export default CommunityQuestionAnswers;
