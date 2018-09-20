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
    setIsQuestionModalOpenValue: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, askQuestion, loadCommunity, setIsQuestionModalOpenValue,
    } = this.props;
    const { question, name, email } = values;
    const payload = {
      communitySlug,
      question,
      name,
      email,
    };
    return askQuestion(payload).then(() => {
      setIsQuestionModalOpenValue(false);
      // Hacky way. to push created question into array for rerender
      loadCommunity(communitySlug);
    }).catch((r) => {
      const { status } = r.response;
      let errorMessage = null;
      switch (status) {
        case 400: {
          errorMessage = 'Name and Email are Mandatory';
          break;
        }
        case 409: {
          errorMessage = 'User Already Registered. Please Login to Proceed';
          break;
        }
        default: {
          errorMessage = `Unknown Error. Error Status: ${status}`;
        }
      }
      throw new SubmissionError({ _error: errorMessage });
    });
  }

  render() {
    const { ...props } = this.props;
    const initialValues = {
      question: '',
      name: '',
      email: '',
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
  askQuestion: (data) => {
    return dispatch(resourceCreateRequest('question', data));
  },
  loadCommunity: slug => dispatch(resourceDetailReadRequest('community', slug, {
    include: 'similar-communities,questions,agents',
  })),
});

export default connect(null, mapDispatchToProps)(CommunityAskQuestionFormContainer);

