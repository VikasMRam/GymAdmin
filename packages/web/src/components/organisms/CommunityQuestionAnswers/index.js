import React, { Fragment } from 'react';
import { string, arrayOf, func } from 'prop-types';

import { content as contentPropType } from 'sly/common/propTypes/content';
import pad from 'sly/web/components/helpers/pad';
import cursor from 'sly/web/components/helpers/cursor';
import { Hr, Block } from 'sly/common/components/atoms';
import CommunityQuestion from 'sly/web/components/molecules/CommunityQuestion';
import CommunityAnswer from 'sly/web/components/molecules/CommunityAnswer';

const PaddedCommunityQuestion = pad(CommunityQuestion, 'large');
PaddedCommunityQuestion.displayName = 'PaddedCommunityQuestion';

const CursorBlock = cursor(Block);
CursorBlock.displayName = 'CursorBlock';

const PaddedBlock = pad(Block);

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
        {/* <CursorBlock palette="primary" weight="medium" onClick={() => onLeaveAnswerClick(question)}>Leave an Answer</CursorBlock> */}
        {i < questions.length - 1 && <Hr />}
      </Fragment>
    );
  });

  const communityFaQsComponent = communityFaQs.sort(sortByCreatedAt).map((communityFaQ, i) => (
    <Fragment key={communityFaQ.id}>
      <PaddedCommunityQuestion question={communityFaQ} />
      <CursorBlock palette="primary" weight="medium" onClick={() => onAskQuestionClick(communityFaQ)}>Be the first to ask this question</CursorBlock>
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
          <PaddedBlock size="subtitle" weight="medium">Other questions to consider</PaddedBlock>
          {communityFaQsComponent}
        </>
      }
      {/* <Button width="100%" marginTop="xLarge" onClick={() => onAskQuestionClick()}>Ask a Question</Button> */}
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
