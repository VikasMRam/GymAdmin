import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Heading, Block, Button, Form, Hr } from 'sly/common/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const ResetPasswordForm = ({
  handleSubmit, submitting, invalid, onLoginClick, error,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading pad="regular" size="subtitle">Having trouble logging in?</Heading>
    <Block pad="xLarge">Enter your email address and we&apos;ll email you a new password.</Block>
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    <Button
      type="submit"
      pad={error ? 'large' : null}
      disabled={submitting || invalid}
      width="100%"
    >
      Submit
    </Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <Hr />
    <Block align="center" direction="row" size="caption">
      Remember your password?&nbsp;&nbsp;
      <ButtonLink palette="primary" onClick={onLoginClick}>Sign in</ButtonLink>
    </Block>
  </Form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onLoginClick: func,
  error: string,
};

export default ResetPasswordForm;
