import React, { Component } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { object, func } from 'prop-types';

import DashboardAddPasswordForm from 'sly/components/organisms/DashboardAddPasswordForm';
import { createValidator, minLength, match } from 'sly/services/validation';
import userPropType from 'sly/propTypes/user';
import query from 'sly/services/newApi/query';

const validate = createValidator({
  newPassword: [minLength(8)],
  confirmPassword: [minLength(8), match('newPassword')],
});

const ReduxForm = reduxForm({
  form: 'DashboardAddPasswordForm',
  destroyOnUnmount: false,
  validate,
})(DashboardAddPasswordForm);

@query('user', 'getUser', getUser => getUser({ id: 'me' }))
class DashboardAddPasswordFormContainer extends Component {
  static propTypes = {
    api: object,
    user: userPropType,
    notifySuccess: func,
  }
  handleSubmit = (values) => {
    const { api, user, notifySuccess } = this.props;
    const { email } = user;
    const { newPassword, confirmPassword } = values;
    if (newPassword && confirmPassword) {
      const payload = { email, password: confirmPassword };
      return api.setPassword(payload)
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
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default DashboardAddPasswordFormContainer;

