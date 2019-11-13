import React from 'react';
import { bool, func, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { Button, Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import { size } from 'sly/components/themes';

const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);

StyledButton.displayName = 'StyledButton';

const StyledHeading = textAlign(styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`);

StyledHeading.displayName = 'StyledHeading';

const ExitIntentQuestionForm = ({
  handleSubmit, submitting, error,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading level="title" size="subtitle">Wait! Get support from a local senior living expert. This is a free service.</StyledHeading>
    <Field
      name="question"
      label="Your question"
      type="textarea"
      component={ReduxField} />
    {<Field
      name="name"
      label="Full name"
      type="text"
      component={ReduxField} />}
    {<Field
      name="email"
      label="Email"
      type="text"
      component={ReduxField} />}
    {error && <strong>{error}</strong>}
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        Get Free Support
    </StyledButton>
    <TosAndPrivacy />
  </form >

);

ExitIntentQuestionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
};

export default ExitIntentQuestionForm;
