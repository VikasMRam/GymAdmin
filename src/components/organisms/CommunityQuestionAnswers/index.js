import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape, func, object, bool } from 'prop-types';

import { content as contentPropType } from 'sly/propTypes/content';
import { size } from 'sly/components/themes';
import cursor from 'sly/components/helpers/cursor';
import { Hr, Block } from 'sly/components/atoms';
import CommunityQuestion from 'sly/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/components/molecules/CommunityAnswer';

const AnswersDiv = styled.div`
  margin-left: ${size('spacing.huge')};
  margin-bottom: ${size('spacing.large')};
`;

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xLarge')} 0;
`;

const StyledCommunityQuestion = styled(CommunityQuestion)`
  margin-bottom: ${size('spacing.large')};
`;

const CursorBlock = cursor(Block);
CursorBlock.displayName = 'CursorBlock';

const sortByCreatedAt = (a, b) => a.createdAt > b.createdAt;

const CommuntityQuestionAndAnswer = ({
  communityName, questions, onLeaveAnswerClick,
}) => {
  const questionsComponent = questions.sort(sortByCreatedAt).map((question, i) => {
    const { contents = [] } = question;

    const answersComponents = contents.sort(sortByCreatedAt).map((answer, i) => (
      <div key={answer.id}>
        <CommunityAnswer answer={answer} />
        {i < contents.length - 1 && <StyledHr />}
      </div>
    ));
    const firstAnswerComponent = answersComponents[0];
    if (answersComponents.length) {
      answersComponents.shift();
    }

    return (
      <div key={question.id}>
        <StyledCommunityQuestion question={question} />
        {firstAnswerComponent}
        <AnswersDiv>
          {answersComponents}
        </AnswersDiv>
        <CursorBlock palette="primary" weight="medium" onClick={() => onLeaveAnswerClick(question.id)}>Leave an Answer</CursorBlock>
        {i < questions.length - 1 && <StyledHr />}
      </div>
    );
  });

  return (
    <div>
      {questionsComponent}
      {questionsComponent.length === 0 && <div>What would you like to know about senior living options at {communityName}? Send a message on the right.</div>}
    </div>
  );
};

CommuntityQuestionAndAnswer.propTypes = {
  communityName: string.isRequired,
  questions: arrayOf(contentPropType).isRequired,
  onLeaveAnswerClick: func.isRequired,
};

export default CommuntityQuestionAndAnswer;
