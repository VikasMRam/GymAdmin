import React from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';

import SignupForm from 'sly/components/organisms/SignupForm';

const validate = createValidator({
  email: [required, email],
  password: [required],
});
const ReduxForm = reduxForm({
  form: 'signupForm',
  validate,
})(SignupForm);

const SignupFormContainer = ({ submit, ...props }) => (
  <ReduxForm
    onSubmit={submit}
    {...props}
  />
);

SignupFormContainer.propTypes = {
  submit: func,
};

export default SignupFormContainer;
