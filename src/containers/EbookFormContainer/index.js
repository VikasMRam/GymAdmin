import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, bool } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';
import EbookForm from 'sly/components/organisms/EbookForm';

const validate = createValidator({
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'EbookForm',
  validate,
})(EbookForm);

const mapDispatchToProps = dispatch => ({
  clearSubmitErrors: () => dispatch(clearSubmitErrors('EbookForm')),
});

@withAuth

@connect(null, mapDispatchToProps)

export default class EbookFormContainer extends Component {
  static propTypes = {
    sendEbook: func,
    clearSubmitErrors: func,
    submitFailed: bool,
    onSubmitSuccess: func,
  };

  handleSubmit = (data) => {
    const { sendEbook, clearSubmitErrors, onSubmitSuccess } = this.props;

    clearSubmitErrors();

    return sendEbook(data).then(onSubmitSuccess).catch((response) => {
      const errorMessage = Object.values(response.body.errors).join('. ');

      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return <ReduxForm onSubmit={this.handleSubmit} {...this.props} />;
  }
}
