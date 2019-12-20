import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import HrWithText from 'sly/components/molecules/HrWithText';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Icon } from 'sly/components/atoms';

const StyledHeading = pad(Heading);

const FullWidthButton = fullWidth(Button);

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');

const RegularPaddedFullWidthButton = pad(FullWidthButton, 'regular');

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const getSubmitButton = (error, props = {}) => error ? <LargePaddedFullWidthButton {...props} /> : <RegularPaddedFullWidthButton {...props} />;

const LoginForm = ({
  handleSubmit, submitting, invalid, error,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading>Sign in or Register</StyledHeading>
    <Field
      name="email"
      type="text"
      placeholder="Enter your email or phone"
      component={ReduxField}
    />
    {getSubmitButton(error, { children: 'Submit', type: 'submit', disabled: submitting || invalid })}
    {error && <Block palette="danger">{error}</Block>}
    <HrWithText text="or" />
    <RegularPaddedFullWidthButton ghost palette="slate" borderPalette="grey">
      <StyledIcon icon="facebook-f" size="caption" /> Continue with Facebook
    </RegularPaddedFullWidthButton>
    <RegularPaddedFullWidthButton ghost palette="slate" borderPalette="grey">
      <StyledIcon icon="google" size="caption" /> Continue with Google
    </RegularPaddedFullWidthButton>
    <TosAndPrivacy />
  </form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  onForgotPasswordClicked: func,
  submitting: bool,
  invalid: bool,
  onSignupClicked: func,
  error: string,
};

export default LoginForm;
