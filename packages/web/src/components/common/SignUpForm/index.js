import React, { useCallback } from 'react';
import { func, bool, string, object } from 'prop-types';

import { Button, Grid } from 'sly/common/components/atoms';
import FinalForm from 'sly/common/system/Form';
import InputFormField from 'sly/common/system/Form/InputFormField';
import { required, email, usPhone, minLength } from 'sly/web/services/validation';

const SignUpForm = ({
  submitButtonText,
}) => {
  const requireValidation = useCallback(value => required(value), []);
  const emailValidation = useCallback(value => email(value) || required(value), []);
  const phoneValidation = useCallback(value => usPhone(value) || required(value), []);
  const passwordValidation = useCallback(value => minLength(8)(value) || requireValidation(value), []);

  return (
    <>
      <FinalForm onSubmit={() => {}}>
        {props => (
          <>
            <Grid gap="small">
              <InputFormField
                label="First Name"
                name="firstName"
                placeholder="User name"
                validate={requireValidation}
              />
              <InputFormField
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                validate={requireValidation}
              />
            </Grid>
            <InputFormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email Address"
              validate={emailValidation}
            />
            <InputFormField
              label="Phone"
              name="phone_number"
              type="phone"
              placeholder="Phone"
              validate={phoneValidation}
            />
            <InputFormField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              validate={passwordValidation}
            />
            <InputFormField
              name="phonePreference"
              type="checkbox"
              labelCheckbox="I prefer text over calls"
              marginRight="10px"
            />
            <Button
              type="submit"
              width="100%"
              pad="regular"
              disabled={props.submitting || !!(props.errors)}
            >
              {submitButtonText}
            </Button>
          </>
        )}
      </FinalForm>
    </>
  );
};
SignUpForm.propTypes = {
  handleSubmit: func.isRequired,
  onFacebookSignUpClick: func.isRequired,
  onGoogleSignUpClick: func.isRequired,
  submitting: bool,
  hasProviderSignup: bool.isRequired,
  invalid: bool,
  error: string,
  socialLoginError: string,
  onLoginClicked: func,
  onProviderClicked: func,
  submitButtonText: string.isRequired,
  hasPassword: bool,
  hasPreference: bool,
  socialSignupError: string,
  handleOtpClick: func.isRequired,
  errors: object,
};
SignUpForm.defaultProps = {
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
  hasPreference: true,
};
export default SignUpForm;
