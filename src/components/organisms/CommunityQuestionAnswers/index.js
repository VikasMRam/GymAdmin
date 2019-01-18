import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape, func, object, bool } from 'prop-types';

import { content as contentPropType } from 'sly/propTypes/content';
import { size } from 'sly/components/themes';
import cursor from 'sly/components/helpers/cursor';
import { Hr, Block } from 'sly/components/atoms';
import CommunityQuestion from 'sly/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/components/molecules/CommunityAnswer';
import Modal from 'sly/components/molecules/Modal';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';

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
  communitySlug, communityName, questions, answerQuestion, answerQuestionValue,
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
        <CursorBlock palette="primary" weight="medium" onClick={() => answerQuestion(question)}>Leave an Answer</CursorBlock>
        {i < questions.length - 1 && <StyledHr />}
      </div>
    );
  });

  return (
    <div>
      {questionsComponent}
      {questionsComponent.length === 0 && <div>What would you like to know about senior living options at {communityName}? Send a message on the right.</div>}
      {answerQuestionValue !== null && answerQuestionValue !== undefined &&
        <Modal
          onClose={() => answerQuestion(null)}
          isOpen
          closeable
        >
          <CommunityLeaveAnAnswerFormContainer questionText={answerQuestionValue.contentData} questionId={answerQuestionValue.id} communitySlug={communitySlug} answerQuestion={answerQuestion} />
        </Modal>
      }
    </div>
  );
};

CommuntityQuestionAndAnswer.propTypes = {
  communityName: string.isRequired,
  communitySlug: string.isRequired,
  questions: arrayOf(contentPropType).isRequired,
  answerQuestion: func,
  answerQuestionValue: object,
};

export default CommuntityQuestionAndAnswer;
