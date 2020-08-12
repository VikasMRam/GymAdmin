import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { email } from 'sly/web/services/validation';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { Heading, Button, Block, Form } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const OtpLoginForm = ({
  handleSubmit, submitting, invalid, error, emailOrPhone, onResendCodeClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading size="subtitle" pad="xLarge">
      Enter the code sent to {!email(emailOrPhone) ? emailOrPhone : phoneFormatter(emailOrPhone, true)}
    </Heading>
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
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </Form>
);

OtpLoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  emailOrPhone: string.isRequired,
  onResendCodeClick: func,
};

export default OtpLoginForm;
