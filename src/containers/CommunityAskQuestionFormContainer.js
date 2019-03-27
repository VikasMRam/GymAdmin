import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { createValidator, required } from 'sly/services/validation';
import CommunityAskQuestionForm from 'sly/components/organisms/CommunityAskQuestionForm';
import Thankyou from 'sly/components/molecules/Thankyou';

const validate = createValidator({
  question: [required],
  name: [required],
  email: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionForm',
  validate,
})(CommunityAskQuestionForm);

class CommunityAskQuestionFormContainer extends Component {
  static propTypes = {
    user: object,
    communitySlug: string.isRequired,
    askQuestion: func,
    loadCommunity: func,
    initialValues: object,
    parentSlug: string,
    showModal: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, askQuestion, loadCommunity, showModal, parentSlug,
    } = this.props;
    const { question, name, email } = values;
    const payload = {
      communitySlug,
      question,
      name,
      email,
      parentSlug,
    };
    return askQuestion(payload).then(() => {
      showModal(<Thankyou />);
      // Hacky way. to push created question into array for rerender
      loadCommunity(communitySlug);
    }).catch((r) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then((data) => {
        const errorMessage = data.errors[0].detail;
        throw new SubmissionError({ _error: errorMessage });
      });
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

const mapDispatchToProps = dispatch => ({
  askQuestion: (data) => {
    return dispatch(resourceCreateRequest('question', data));
  },
  loadCommunity: slug => dispatch(resourceDetailReadRequest('community', slug, {
    include: 'similar-communities,questions,agents',
  })),
});

export default connect(null, mapDispatchToProps)(CommunityAskQuestionFormContainer);

