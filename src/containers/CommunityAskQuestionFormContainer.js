import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { string, func } from 'prop-types';

// import { getDetail } from 'sly/store/selectors';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityAskQuestionForm from 'sly/components/organisms/CommunityAskQuestionForm';

const validate = createValidator({
  question: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionForm',
  destroyOnUnmount: false,
  validate,
})(CommunityAskQuestionForm);

class CommunityAskQuestionFormContainer extends Component {
  static propTypes = {
    communitySlug: string.isRequired,
    askQuestion: func,
    loadCommunity: func,
    setIsQuestionModalOpenValue: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, askQuestion, loadCommunity, setIsQuestionModalOpenValue,
    } = this.props;
    const payload = {
      communitySlug,
      question: values.question,
    };
    askQuestion(payload).then(() => {
      setIsQuestionModalOpenValue(false);
      // Hacky way. to push created question into array for rerender
      loadCommunity(communitySlug);
    });
  }

  render() {
    const { ...props } = this.props;
    const initialValues = {
      question: '',
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
    include: 'similar-communities',
  })),
});

export default connect(null, mapDispatchToProps)(CommunityAskQuestionFormContainer);

