import React, { Component } from 'react';
import { reduxForm, SubmissionError, reset } from 'redux-form';
import { func } from 'prop-types';

import DashboardChangePasswordForm from 'sly/components/organisms/DashboardChangePasswordForm';
import { createValidator, required, minLength, match } from 'sly/services/validation';
import { withAuth } from 'sly/services/newApi';

const validate = createValidator({
  oldPassword: [required, minLength(8)],
  newPassword: [required, minLength(8)],
  confirmPassword: [required, minLength(8), match('newPassword')],
});

const formName = 'DashboardChangePasswordForm';

const afterSubmit = (result, dispatch) =>
  dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate,
  onSubmitSuccess: afterSubmit,
})(DashboardChangePasswordForm);

@withAuth

export default class DashboardChangePasswordFormContainer extends Component {
  static propTypes = {
    updatePassword: func,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const { updatePassword, notifySuccess } = this.props;

    const { oldPassword, newPassword } = values;
    const payload = { oldPassword, newPassword };

    return updatePassword(payload)
      .catch((error) => {
        const { status, body } = error;
        if (status === 400) {
          const { errors } = body;
          const errorMessage = errors[0] && errors[0].title ? errors[0].title : 'Generic Error';
          throw new SubmissionError({ _error: errorMessage });
        }
      })
      .then(() => {
        notifySuccess('Password Successfully Updated');
      });
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
