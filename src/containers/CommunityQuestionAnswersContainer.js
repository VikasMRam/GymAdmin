import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { string, func, array, object, bool } from 'prop-types';
// import queryString from 'query-string';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';

import { answerQuestion } from 'sly/store/actions';
import { answerQuestionValueSelector } from 'sly/store/selectors';

class CommunityQuestionAnswersContainer extends Component {
  static propTypes = {
    communityName: string,
    communitySlug: string,
    questions: array,
    setIsQuestionModalOpenValue: func,
    isQuestionModalOpenValue: bool,
    answerQuestion: func,
    answerQuestionValue: object,
    user: object,
    searchParams: object.isRequired,
    setModal: func,
  }
  render() {
    const {
      communityName, communitySlug, questions, answerQuestion, answerQuestionValue, user, searchParams, setModal,
    } = this.props;
    const { modal } = searchParams;
    return (
      <CommunityQuestionAnswers
        communityName={communityName}
        communitySlug={communitySlug}
        questions={questions}
        setIsQuestionModalOpenValue={value => setModal(value ? 'askQuestion' : null)}
        isQuestionModalOpenValue={modal==="askQuestion"}
        answerQuestion={answerQuestion}
        answerQuestionValue={answerQuestionValue}
        user={user}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const answerQuestionValue = answerQuestionValueSelector(state);
  return {
    answerQuestionValue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    answerQuestion: value => dispatch(answerQuestion(value)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityQuestionAnswersContainer));
