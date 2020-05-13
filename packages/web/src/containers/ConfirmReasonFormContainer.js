import React, { Component } from 'react';
import { string, object, func } from 'prop-types';
import { reduxForm } from 'redux-form';

import {
  createValidator,
  required,
} from 'sly/web/services/validation';
import ConfirmReasonForm from 'sly/web/components/organisms/ConfirmReasonForm';

const ReduxForm = reduxForm({
  form: 'ConfirmReasonForm',
})(ConfirmReasonForm);

export default class ConfirmReasonFormContainer extends Component {
  static propTypes = {
    title: string.isRequired,
    message: string,
    extraFieldProps: object,
    onCancel: func,
    onAgree: func,
    validate: func,
  };

  render() {
    const { onCancel, onAgree, title, message, extraFieldProps, ...props } = this.props;

    const extraFieldValidator = extraFieldProps && extraFieldProps.required
      ? { [extraFieldProps.name]: [required] }
      : {};

    const validate = createValidator({
      reason: [required],
      ...extraFieldValidator,
    });

    return (
      <ReduxForm
        title={title}
        message={message}
        onSubmit={onAgree}
        onCancel={onCancel}
        validate={validate}
        extraFieldProps={extraFieldProps}
        {...props}
      />
    );
  }
}

