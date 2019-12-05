import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import {
  createValidator,
  required,
} from 'sly/services/validation';
import CommunityLeaveAnAnswerForm from 'sly/components/organisms/CommunityLeaveAnAnswerForm';
import { ensureAuthenticated } from 'sly/store/authenticated/actions';
import { prefetch } from 'sly/services/newApi';
import api from 'sly/services/newApi/apiInstance';

const validate = createValidator({
  answer: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityLeaveAnAnswerForm',
  validate,
})(CommunityLeaveAnAnswerForm);

const mapDispatchToProps = {
  leaveAnAnswer: data => ensureAuthenticated(
    'Please Login to Answer this Question',
    api.createAnswer.asAction(data),
  ),
};

@prefetch('community', 'getCommunity', (req, { communitySlug }) => req({
  id: communitySlug,
  include: 'similar-communities,questions,agents',
}))

@connect(null, mapDispatchToProps)

export default class CommunityLeaveAnAnswerFormContainer extends Component {
  static propTypes = {
    status: object,
    communitySlug: string.isRequired,
    leaveAnAnswer: func,
    onSuccess: func,
    questionId: string,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, leaveAnAnswer, status, questionId, onSuccess,
    } = this.props;
    const payload = {
      communitySlug,
      questionId,
      answer: values.answer,
    };
    return leaveAnAnswer(payload).then(() => {
      onSuccess();
      status.community.refetch();
    }).catch(({ status, body }) => {
      let errorMessage = 'Error Answering Question';
      if (body.errors) {
        errorMessage = body.errors[0].detail;
      } else if (status === 401) {
        errorMessage = 'Please Login to Answer this Question';
      } else {
        console.error(body);
      }
      throw new SubmissionError({ answer: errorMessage });
    });
  };

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
