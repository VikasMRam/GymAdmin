import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import cursor from 'sly/components/helpers/cursor';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Heading, Button, Block, Span, Hr } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = pad(textAlign(Heading), 'regular');

const Description = pad(textAlign(Block));

const FullWidthButton = fullWidth(Button);

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');

const LoginWithPassword = cursor(Span);

const FooterNote = textAlign(Block);

const getButton = (error, props) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const ResetPasswordForm = ({
  handleSubmit, submitting, invalid, onLoginClicked, error,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Having trouble logging in?</StyledHeading>
    <Description>Enter your email address and we&apos;ll email you a new password.</Description>
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    {getButton(error, { type: 'submit', disabled: submitting || invalid, children: 'Submit' })}
    {error && <Block palette="danger">{error}</Block>}
    <Hr />
    <FooterNote size="caption">
      Remember your password? <LoginWithPassword onClick={onLoginClicked} palette="primary" size="caption">Sign in.</LoginWithPassword>
    </FooterNote>
  </form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onLoginClicked: func,
  error: string,
};

export default ResetPasswordForm;
