import React, { Component } from 'react';
import { reduxForm, SubmissionError, reset } from 'redux-form';
import { object, func } from 'prop-types';

import DashboardAddPasswordForm from 'sly/web/components/organisms/DashboardAddPasswordForm';
import { createValidator, minLength, match } from 'sly/web/services/validation';
import userPropType from 'sly/web/propTypes/user';
import { withAuth } from 'sly/web/services/api';

const validate = createValidator({
  newPassword: [minLength(8)],
  confirmPassword: [minLength(8), match('newPassword')],
});

const formName = 'DashboardAddPasswordForm';

const afterSubmit = (result, dispatch) =>
  dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate,
  onSubmitSuccess: afterSubmit,
})(DashboardAddPasswordForm);

@withAuth

export default class DashboardAddPasswordFormContainer extends Component {
  static propTypes = {
    setPassword: func,
    user: userPropType,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const { setPassword, user, notifySuccess } = this.props;
    const { email } = user;
    const { newPassword, confirmPassword } = values;
    if (newPassword && confirmPassword) {
      const payload = { email, password: confirmPassword };
      return setPassword(payload)
        .catch((error) => {
          const { status, body } = error;
          if (status === 400) {
            const { errors } = body;
            const errorMessage = errors[0] && errors[0].title ? errors[0].title : 'Generic Error';
            throw new SubmissionError({ _error: errorMessage });
          }
        })
        .then(() => {
          notifySuccess('Password Set Successfully');
        });
    }
    const errorMessage = 'Password fields cannot be blank';
    throw new SubmissionError({ _error: errorMessage });
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
