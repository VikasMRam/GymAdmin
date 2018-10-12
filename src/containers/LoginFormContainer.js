import React from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';

import LoginForm from 'sly/components/organisms/LoginForm';

const validate = createValidator({
  email: [required, email],
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);

const LoginFormContainer = ({ submit, ...props }) => (
  <ReduxForm
    onSubmit={submit}
    {...props}
  />
);

LoginFormContainer.propTypes = {
  submit: func,
};

export default LoginFormContainer;
