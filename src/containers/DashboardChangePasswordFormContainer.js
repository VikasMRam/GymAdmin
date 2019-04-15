import React, { Component } from 'react';
import { reduxForm, SubmissionError, reset } from 'redux-form';
import { object, func } from 'prop-types';

import DashboardChangePasswordForm from 'sly/components/organisms/DashboardChangePasswordForm';
import { createValidator, required, minLength, match } from 'sly/services/validation';
import withApi from 'sly/services/newApi/withApi';

const validate = createValidator({
  oldPassword: [required, minLength(8)],
  newPassword: [required, minLength(8)],
  confirmPassword: [required, minLength(8), match('newPassword')],
});

const formName = 'DashboardChangePasswordForm';
const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate,
})(DashboardChangePasswordForm);

@withApi

class DashboardChangePasswordFormContainer extends Component {
  static propTypes = {
    api: object,
    notifySuccess: func,
  };

  handleSubmit = (values, dispatch) => {
    const { oldPassword, newPassword } = values;
    const payload = { oldPassword, newPassword };
    const { api, notifySuccess } = this.props;
    return api.updatePassword(payload)
      .catch((error) => {
        const { status, body } = error;
        if (status === 400) {
          const { errors } = body;
          const errorMessage = errors[0] && errors[0].title ? errors[0].title : 'Generic Error';
          throw new SubmissionError({ _error: errorMessage });
        }
      })
      .then(() => {
        dispatch(reset(formName));
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


export default DashboardChangePasswordFormContainer;
