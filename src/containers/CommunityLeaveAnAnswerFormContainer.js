import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { string, func, number } from 'prop-types';

// import { getDetail } from 'sly/store/selectors';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityLeaveAnAnswerForm from 'sly/components/organisms/CommunityLeaveAnAnswerForm';

const validate = createValidator({
  answer: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityLeaveAnAnswerForm',
  destroyOnUnmount: false,
  validate,
})(CommunityLeaveAnAnswerForm);

class CommunityLeaveAnAnswerFormContainer extends Component {
  static propTypes = {
    communitySlug: string.isRequired,
    leaveAnAnswer: func,
    loadCommunity: func,
    answerQuestion: func,
    questionId: string,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, leaveAnAnswer, loadCommunity, answerQuestion, questionId,
    } = this.props;
    const payload = {
      questionId,
      answer: values.answer,
    };
    leaveAnAnswer(payload).then(() => {
      answerQuestion(null);
      loadCommunity(communitySlug);
    });
  }

  render() {
    const { ...props } = this.props;
    const initialValues = {
      answer: '',
    };
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleOnSubmit}
        {...props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  leaveAnAnswer: (data) => {
    return dispatch(resourceCreateRequest('answer', data));
  },
  loadCommunity: slug => dispatch(resourceDetailReadRequest('community', slug, {
    include: 'similar-communities,questions',
  })),
});

export default connect(null, mapDispatchToProps)(CommunityLeaveAnAnswerFormContainer);

