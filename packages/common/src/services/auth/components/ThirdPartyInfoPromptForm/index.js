import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block, Button, Form, Grid } from 'sly/common/components/atoms';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/common/components/organisms/ReduxField';


const ThirdPartyInfoPromptForm = ({
  handleSubmit, error,
  hasPreference, hasName, hasPhoneNumber,
}) => (
  <Form onSubmit={handleSubmit}>
    {!hasName && <Grid gap="small">
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
    </Grid>}
    {!hasPhoneNumber && <Field
      name="phone_number"
      label="Phone"
      type="phone"
      component={ReduxField}
      parens
    />}

    {hasPreference &&
    <Field
      name="phonePreference"
      fullWidth
      type="checkbox"
      component={ReduxField}
      options={[{ value: 'text', label: 'I prefer text over calls' }]}
    />

    }
    <Block marginBottom="large">
      <Button type="submit" width="100%" pad="regular">
        Finish Sign Up
      </Button>
    </Block>

    <Block marginBottom="xLarge"> <TosAndPrivacy openLinkInNewTab /> </Block>
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </Form>
);

ThirdPartyInfoPromptForm.propTypes = {
  handleSubmit: func.isRequired,
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
  hasName: bool,
  hasPhoneNumber: bool,
};

ThirdPartyInfoPromptForm.defaultProps = {
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
  hasPreference: true,
};

export default ThirdPartyInfoPromptForm;
