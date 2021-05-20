import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import { withRouter } from 'react-router';
import api from 'sly/web/services/api/apiInstance';
import { createValidator, required } from 'sly/web/services/validation';
import CommunityAskQuestionForm from 'sly/web/components/organisms/CommunityAskQuestionForm';
import Thankyou from 'sly/web/components/molecules/Thankyou';
import { prefetch, query } from 'sly/web/services/api';
import { PROFILE_ASK_QUESTION } from 'sly/web/services/api/constants';
import withUser from 'sly/web/services/api/withUser';

const validate = createValidator({
  question: [required],
  name: [required],
  email: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionForm',
  validate,
})(CommunityAskQuestionForm);

const mapDispatchToProps = {
  createQuestion: api.createQuestion.asAction,
};

@withRouter
@withUser

@prefetch('community', 'getCommunity', (req, { communitySlug }) => req({
  id: communitySlug,
  include: 'similar-communities,questions,agents',
}))

@query('createAction', 'createUuidAction')

@connect(null, mapDispatchToProps)

export default class CommunityAskQuestionFormContainer extends Component {
  static propTypes = {
    user: object,
    status: object,
    communitySlug: string.isRequired,
    createQuestion: func,
    initialValues: object,
    parentSlug: string,
    showModal: func.isRequired,
    createAction: func,
    type: string,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, createQuestion, status, showModal, parentSlug, createAction, match,
    } = this.props;
    const { question, name, email } = values;
    const payload = {
      communitySlug,
      question,
      name,
      email,
      parentSlug,
    };
    return createQuestion(payload)
      .then(({ body }) => createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: communitySlug,
            name,
            email,
            questionText: question,
            questionId: body.data.id,
          },
          actionPage: match.url,
          actionType: PROFILE_ASK_QUESTION,
        },
      }))
      .then(() => {
        showModal(<Thankyou />);
        // Hacky way. to push created question into array for rerender
        status.community.refetch();
      }).catch(({ body }) => {
        const errorMessage = body.errors[0].detail;
        throw new SubmissionError({ _error: errorMessage });
      });
  };

  render() {
    const { user, initialValues: initValues, ...props } = this.props;
    const initialValues = {
      question: '',
      name: '',
      email: '',
      ...initValues,
    };
    if (user) {
      initialValues.name = user.name;
      initialValues.email = user.email;
    }
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleOnSubmit}
        user={user}
        {...props}
      />
    );
  }
}
