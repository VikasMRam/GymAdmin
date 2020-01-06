import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import cursor from 'sly/components/helpers/cursor';
import { Heading, Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = textAlign(pad(Heading));

const FullWidthButton = fullWidth(Button);

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
// todo: revisit to check of there is way to automatically set displayName
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const DoItLater = cursor(textAlign(Block));

const Error = pad(Block);

const PaddedBlock = pad(Block);

const CreatePasswordForm = ({
  handleSubmit, submitting, invalid, error, onDoThisLaterClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading>Create a new account</StyledHeading>
    <PaddedBlock>Please set a password</PaddedBlock>
    <Field
      name="password"
      type="password"
      component={ReduxField}
    />
    <LargePaddedFullWidthButton type="submit" disabled={submitting || invalid}>Save Password</LargePaddedFullWidthButton>
    {error && <Error palette="danger" size="caption">{error}</Error>}
    <DoItLater onClick={onDoThisLaterClick} palette="primary" size="caption">Skip for now</DoItLater>
  </form>
);

CreatePasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onSignupClick: func,
  error: string,
  onDoThisLaterClick: func,
};

export default CreatePasswordForm;
