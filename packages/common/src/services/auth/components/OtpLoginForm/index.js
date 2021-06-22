import React from 'react';
import { func, bool, string, object } from 'prop-types';
import { Field } from 'redux-form';


import { Heading, Button, Block, Form } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const OtpLoginForm = ({
  handleSubmit, submitting, invalid, error, formState, onResendCodeClick, sentCode, handleOtpClick,
}) => (
  <Form onSubmit={handleSubmit}>
    {sentCode &&
    <Heading size="subtitle" pad="xLarge">
      Enter the code sent to {formState && formState.email ? formState.email : ''}
    </Heading>}
    {!sentCode &&
    <>
      <Block pad="xLarge">Looks like you have already registered with this email, request a one-time code to login below.</Block><Field
        name="email"
        label="Email Address"
        type="email"
        component={ReduxField}
      />
    </>}
    {sentCode ?
      <>
        <Field
          name="code"
          label="Code"
          labelRight={<Block cursor="pointer" palette="primary" size="caption" onClick={onResendCodeClick}>Resend code</Block>}
          type="text"
          placeholder="6-digit code"
          component={ReduxField}
        />
        <Button
          type="submit"
          width="100%"
          disabled={submitting || invalid}
          pad={error ? 'large' : 'xLarge'}
        >
          Log in
        </Button>
      </> :
      <Button
        type="button"
        width="100%"
        disabled={submitting || invalid}
        pad={error ? 'large' : 'xLarge'}
        onClick={handleOtpClick}
      >
        Send Code
      </Button>
    }
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </Form>
);

OtpLoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  formState: object.isRequired,
  onResendCodeClick: func,
  sentCode: bool,
  handleOtpClick: func,
};

export default OtpLoginForm;
