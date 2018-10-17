import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { resourceCreateRequest } from 'sly/store/resource/actions';

import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';

const validate = createValidator({
  email: [required, email],
});
const ReduxForm = reduxForm({
  form: 'ResetPasswordForm',
  validate,
})(ResetPasswordForm);

class ResetPasswordFormContainer extends Component {
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
        const errorMessage = Object.values(data.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
    });
  }

  render() {
    return <ReduxForm onSubmit={this.handleSubmit} {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  submit: data => dispatch(resourceCreateRequest('recover', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors('ResetPasswordForm')),
});

export default connect(null, mapDispatchToProps)(ResetPasswordFormContainer);
