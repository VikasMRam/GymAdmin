import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { resourceCreateRequest } from 'sly/store/resource/actions';
import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityAskQuestionAgentForm from 'sly/components/organisms/CommunityAskQuestionAgentForm';

const validate = createValidator({
  question: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAskQuestionAgentForm',
  validate,
})(CommunityAskQuestionAgentForm);

class CommunityAskQuestionAgentFormContainer extends Component {
  static propTypes = {
    postUserAction: func,
  };

  handleOnSubmit = () => {
    // todo: create user action
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommunityAskQuestionAgentFormContainer);
