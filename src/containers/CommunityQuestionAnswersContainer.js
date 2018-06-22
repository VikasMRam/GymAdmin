import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, object, bool } from 'prop-types';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';

import { setIsQuestionModalOpenValue, answerQuestion } from 'sly/store/actions';
import { isQuestionModalOpenSelector, answerQuestionValueSelector } from 'sly/store/selectors';

const CommunityQuestionAnswersContainer = ({
  communityName, communitySlug, questions, setIsQuestionModalOpenValue, isQuestionModalOpenValue, answerQuestion, answerQuestionValue,
}) => {
  return (
    <CommunityQuestionAnswers
      communityName={communityName}
      communitySlug={communitySlug}
      questions={questions}
      setIsQuestionModalOpenValue={setIsQuestionModalOpenValue}
      isQuestionModalOpenValue={isQuestionModalOpenValue}
      answerQuestion={answerQuestion}
      answerQuestionValue={answerQuestionValue}
    />
  );
};

CommunityQuestionAnswersContainer.propTypes = {
  communityName: string,
  communitySlug: string,
  questions: array,
  setIsQuestionModalOpenValue: func,
  isQuestionModalOpenValue: bool,
  answerQuestion: func,
  answerQuestionValue: object,
};

const mapStateToProps = (state) => {
  const isQuestionModalOpenValue = isQuestionModalOpenSelector(state);
  const answerQuestionValue = answerQuestionValueSelector(state);
  return {
    isQuestionModalOpenValue,
    answerQuestionValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsQuestionModalOpenValue: value => dispatch(setIsQuestionModalOpenValue(value)),
    answerQuestion: value => dispatch(answerQuestion(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityQuestionAnswersContainer);
