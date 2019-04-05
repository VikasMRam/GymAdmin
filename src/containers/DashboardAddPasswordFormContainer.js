import React, { Component } from 'react';
import { reduxForm, SubmissionError, reset } from 'redux-form';
import { object, func } from 'prop-types';

import DashboardAddPasswordForm from 'sly/components/organisms/DashboardAddPasswordForm';
import { createValidator, minLength, match } from 'sly/services/validation';
import userPropType from 'sly/propTypes/user';
import prefetch from 'sly/services/newApi/prefetch';

const validate = createValidator({
  newPassword: [minLength(8)],
  confirmPassword: [minLength(8), match('newPassword')],
});

const formName = 'DashboardAddPasswordForm';

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  validate,
})(DashboardAddPasswordForm);

@prefetch('user', 'getUser', getUser => getUser({ id: 'me' }))
class DashboardAddPasswordFormContainer extends Component {
  static propTypes = {
    api: object,
    user: userPropType,
    notifySuccess: func,
  }
  handleSubmit = (values, dispatch) => {
    const { api, user, notifySuccess, getUser } = this.props;
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
          getUser({ id: 'me' });
          dispatch(reset(formName));
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

