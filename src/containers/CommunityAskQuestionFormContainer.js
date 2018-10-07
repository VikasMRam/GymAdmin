import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

// import { getDetail } from 'sly/store/selectors';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityAskQuestionForm from 'sly/components/organisms/CommunityAskQuestionForm';

const validate = createValidator({
  question: [required],
  name: [required],
  email: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionForm',
  destroyOnUnmount: false,
  validate,
})(CommunityAskQuestionForm);

class CommunityAskQuestionFormContainer extends Component {
  static propTypes = {
    user: object,
    communitySlug: string.isRequired,
    askQuestion: func,
    loadCommunity: func,
    setModal: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, askQuestion, loadCommunity, setModal,
    } = this.props;
    const { question, name, email } = values;
    const payload = {
      communitySlug,
      question,
      name,
      email,
    };
    return askQuestion(payload).then(() => {
      setModal('thankyou');
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
  }

  render() {
    const { user, ...props } = this.props;
    const initialValues = {
      question: '',
      name: '',
      email: '',
    };
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

