import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import { reduxForm } from 'redux-form';

import {
  createValidator,
  required,
} from 'sly/services/validation';

import ConfirmReasonForm from 'sly/components/organisms/ConfirmReasonForm';

const validate = createValidator({
  reason: [required],
});

const ReduxForm = reduxForm({
  form: 'ConfirmReasonForm',
  validate,
})(ConfirmReasonForm);

export default class ConfirmReasonFormContainer extends Component {
  static propTypes = {
    title: string.isRequired,
    message: string.isRequired,
    onCancel: func,
    onAgree: func,
  };

  render() {
    const { onCancel, onAgree, title, message } = this.props;

    return (
      <ReduxForm
        title={title}
        message={message}
        onSubmit={onAgree}
        onCancel={onCancel}
      />
    );
  }
}

