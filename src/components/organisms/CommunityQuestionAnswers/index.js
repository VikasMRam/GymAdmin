import React from 'react';
import styled from 'styled-components';
import { string, arrayOf, shape, func, object, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import CommunityQuestion from 'sly/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/components/molecules/CommunityAnswer';
import Modal from 'sly/components/molecules/Modal';

import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';
import Hr from 'sly/components/atoms/Hr';
import Button from 'sly/components/atoms/Button';
import { isBrowser } from 'sly/config';

const AnswersDiv = styled.div`
  margin-left: ${size('spacing.huge')};
`;

const StyledHr = styled(Hr)`
  margin: ${size('spacing.xLarge')} 0;
`;

export const AnswersCountTextDiv = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.regular')};
`;

export const AskQuestionButton = styled(Button)`
  margin-top: ${size('spacing.large')};
`;

export const LeaveAnswerButton = styled(Button)`
  margin-top: ${size('spacing.large')};
`;

const appElement = isBrowser && document.querySelector('#app');

const sortByCreatedAt = (a, b) => a.createdAt > b.createdAt;

const CommuntityQuestionAndAnswer = ({
  user, communitySlug, communityName, questions, isQuestionModalOpenValue, setIsQuestionModalOpenValue, answerQuestion, answerQuestionValue,
}) => {
  const questionsComponent = questions.sort(sortByCreatedAt).map((question) => {
    if (typeof question.contents === 'undefined') {
      question.contents = [];
    }
    const answersCount = question.contents.length;
    let answersCountText = 'No answers yet.';
    if (answersCount === 1) {
      answersCountText = '1 Answer';
    } else if (answersCount > 1) {
      answersCountText = `${answersCount} Answers`;
    }
    const answersComponent = question.contents.sort(sortByCreatedAt).map((answer, index) => {
      return (
        <div key={answer.id}>
          <CommunityAnswer answer={answer} />
          {index !== (answersCount - 1) && <StyledHr />}
        </div>
      );
    });
    return (
      <div key={question.id}>
        <CommunityQuestion question={question} />
        <AnswersDiv>
          <StyledHr />
          <AnswersCountTextDiv>
            {answersCountText}
          </AnswersCountTextDiv>
          {answersComponent}
          <LeaveAnswerButton onClick={() => answerQuestion(question)}>Leave an Answer</LeaveAnswerButton>
          <StyledHr />
        </AnswersDiv>
      </div>
    );
  });
  return (
    <div>
      {questionsComponent}
      <div>What would you like to know about senior living options at {communityName}? Send a message on the right.</div>
      <AskQuestionButton onClick={() => setIsQuestionModalOpenValue(true)}>Ask a Question</AskQuestionButton>
      {isQuestionModalOpenValue &&
        <Modal
          appElement={appElement}
          onClose={() => setIsQuestionModalOpenValue(false)}
          isOpen
          closeable
        >
          <CommunityAskQuestionFormContainer communityName={communityName} communitySlug={communitySlug} setIsQuestionModalOpenValue={setIsQuestionModalOpenValue} user={user} />
        </Modal>
      }
      {(answerQuestionValue !== null && answerQuestionValue !== undefined) &&
        <Modal
          appElement={appElement}
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
  questions: arrayOf(shape).isRequired,
  isQuestionModalOpenValue: bool,
  setIsQuestionModalOpenValue: func,
  answerQuestion: func,
  answerQuestionValue: object,
  user: object,
};

export default CommuntityQuestionAndAnswer;
