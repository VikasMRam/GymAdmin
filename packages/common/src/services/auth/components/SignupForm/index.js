import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';

const StyledHeading = pad(Heading);
StyledHeading.displayName = 'StyledHeading';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.small')};
`;

const StyledBlock = styled(Block)`
  color: ${palette('slate', 'filler')};
  font-size: ${size('text.tiny')};
  margin-bottom: ${size('spacing.large')};
`;

const BottomWrapper = textAlign(styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
  align-items: center;
  justify-content: center;
`);

const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: ${size('spacing.regular')};
`;

const SignupForm = ({
  handleSubmit, submitting, invalid, error, onLoginClicked, onProviderClicked, heading, submitButtonText, hasPassword,
  hasProviderSignup,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
    <FieldsWrapper>
      <Field
        name="firstName"
        label="First Name"
        type="text"
        component={ReduxField}
      />
      <Field
        name="lastName"
        label="Last Name"
        type="text"
        component={ReduxField}
      />
    </FieldsWrapper>
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
      parens
      component={ReduxField}
    />
    {hasPassword &&
      <Field
        name="password"
        label="Password"
        type="password"
        component={ReduxField}
      />
    }
    <StyledButton type="submit"  disabled={submitting || invalid}>
      {submitButtonText}
    </StyledButton>
    <StyledBlock error={error}>By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.</StyledBlock>
    {error && <Block palette="danger">{error}</Block>}
    <BottomWrapper>
      <Block size="caption">
        Already have an account?{' '}
        <ButtonLink palette="primary" onClick={onLoginClicked}>Log in</ButtonLink>
      </Block>
      {hasProviderSignup &&
        <Block size="caption">
          Are you a community manager?{' '}
          <ButtonLink palette="primary" onClick={onProviderClicked}>Click here</ButtonLink>
        </Block>
      }
    </BottomWrapper>
  </form>
);

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  hasProviderSignup: bool.isRequired,
  invalid: bool,
  error: string,
  onLoginClicked: func,
  onProviderClicked: func,
  heading: string.isRequired,
  submitButtonText: string.isRequired,
  hasPassword: bool,
};

SignupForm.defaultProps = {
  heading: 'Sign Up',
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
};

export default SignupForm;
