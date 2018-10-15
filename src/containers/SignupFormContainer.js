import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { resourceCreateRequest } from 'sly/store/resource/actions';

import SignupForm from 'sly/components/organisms/SignupForm';

const validate = createValidator({
  email: [required, email],
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);

class SignupFormContainer extends Component {
  static propTypes = {
    submit: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmitSuccess: func,
  };

  handleSubmit = (data) => {
    const { submit, clearSubmitErrors, onSubmitSuccess } = this.props;
    clearSubmitErrors();
    return submit(data).then(onSubmitSuccess).catch((e) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = e;
      return response.json().then((data) => {
        const errorMessage = data.errors[0].detail;
        throw new SubmissionError({ _error: errorMessage });
      });
    });
  }

  render() {
    return <ReduxForm onSubmit={this.handleSubmit} />;
  }
}

const mapDispatchToProps = dispatch => ({
  submit: data => dispatch(resourceCreateRequest('register', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors('signupForm')),
});

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormContainer);
