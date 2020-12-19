import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Button, Block, Form } from 'sly/common/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const AgentSignupForm = ({
  handleSubmit, submitting, invalid, error, onLoginClicked,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="name"
      label="Full Name"
      type="text"
      placeholder="First and Last Name"
      component={ReduxField}
    />
    <Field
      name="email"
      label="Email Address"
      type="email"
      component={ReduxField}
    />
    <Field
      name="phone_number"
      label="Phone"
      type="phone"
      component={ReduxField}
      parens
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={ReduxField}
    />
    <Button
      type="submit"
      disabled={submitting || invalid}
      width="100%"
      pad="regular"
    >
      Continue
    </Button>
    {/* TODO: this should reuse Tos and privacy molecule after Link is migrated for mobile */}
    <Block pad="large" size="tiny" palette="slate" variation="filler">
      By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.
    </Block>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <Block display="flex" size="caption" align="center" direction="row">
      Already have an account?&nbsp;&nbsp;
      <ButtonLink palette="primary" size="caption" onClick={onLoginClicked}>Log in</ButtonLink>
    </Block>
  </Form>
);

AgentSignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onLoginClicked: func,
};

export default AgentSignupForm;
