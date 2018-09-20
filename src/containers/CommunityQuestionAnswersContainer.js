import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { string, func, array, object, bool } from 'prop-types';
// import queryString from 'query-string';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';

import { setIsQuestionModalOpenValue, answerQuestion } from 'sly/store/actions';
import { isQuestionModalOpenSelector, answerQuestionValueSelector } from 'sly/store/selectors';
import { getSearchParams, filterLinkPath } from 'sly/services/helpers/search';

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
  }
  constructor() {
    super();
    this.setQuestionModalOpenValue = this.setQuestionModalOpenValue.bind(this);
  }
  componentWillReceiveProps({ searchParams, isQuestionModalOpenValue, setIsQuestionModalOpenValue }) {
    const { modal } = searchParams;
    if (modal === 'questions' && isQuestionModalOpenValue === false) {
      setIsQuestionModalOpenValue(true);
    }
    if (modal !== 'questions' && isQuestionModalOpenValue === true) {
      setIsQuestionModalOpenValue(false);
    }
  }
  setQuestionModalOpenValue(value) {
    if (value === true) {
      this.changeSearchParams({ changedParams: { modal: 'questions' } });
    } else if (value === false) {
      this.changeSearchParams({ changedParams: { modal: '' } });
    }
  }
  changeSearchParams = ({ changedParams }) => {
    const { searchParams, history } = this.props;
    const { path } = filterLinkPath(searchParams, changedParams);
    // const event = {
    //   action: 'search', category: searchParams.toc, label: queryString.stringify(searchParams),
    // };
    // SlyEvent.getInstance().sendEvent(event);

    history.push(path);
  };
  render() {
    const {
      communityName, communitySlug, questions, isQuestionModalOpenValue, answerQuestion, answerQuestionValue, user,
    } = this.props;
    return (
      <CommunityQuestionAnswers
        communityName={communityName}
        communitySlug={communitySlug}
        questions={questions}
        setIsQuestionModalOpenValue={this.setQuestionModalOpenValue}
        isQuestionModalOpenValue={isQuestionModalOpenValue}
        answerQuestion={answerQuestion}
        answerQuestionValue={answerQuestionValue}
        user={user}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  const isQuestionModalOpenValue = isQuestionModalOpenSelector(state);
  const answerQuestionValue = answerQuestionValueSelector(state);
  return {
    isQuestionModalOpenValue,
    answerQuestionValue,
    searchParams,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsQuestionModalOpenValue: value => dispatch(setIsQuestionModalOpenValue(value)),
    answerQuestion: value => dispatch(answerQuestion(value)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityQuestionAnswersContainer));
