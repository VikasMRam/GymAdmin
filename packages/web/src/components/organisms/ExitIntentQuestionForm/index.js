import React from 'react';
import { bool, func, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { Button, Heading } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { textAlign } from 'sly/web/components/helpers/text';

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
    <StyledHeading level="title" size="subtitle">Wait! Get support from a Local Senior Living Expert. This is a free service.</StyledHeading>
    <Field
      name="question"
      label="Your question"
      type="textarea"
      component={ReduxField}
    />
    {<Field
      name="name"
      label="Full name"
      type="text"
      component={ReduxField}
    />}
    {<Field
      name="email"
      label="Email"
      type="text"
      component={ReduxField}
    />}
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
