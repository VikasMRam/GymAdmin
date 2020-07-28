import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/web/components/helpers/pad';
import cursor from 'sly/web/components/helpers/cursor';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Button, Block, Span, Hr } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledHeading = pad(Heading, 'regular');

const Description = pad(Block);

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const LoginWithPassword = cursor(Span);
LoginWithPassword.displayName = 'LoginWithPassword';

const FooterNote = textAlign(Block);

const getButton = (error, props) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const ResetPasswordForm = ({
  handleSubmit, submitting, invalid, onLoginClick, error,
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
      Remember your password? <LoginWithPassword onClick={onLoginClick} palette="primary" size="caption">Sign in.</LoginWithPassword>
    </FooterNote>
  </form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onLoginClick: func,
  error: string,
};

export default ResetPasswordForm;
