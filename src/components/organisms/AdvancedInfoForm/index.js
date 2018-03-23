import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const AdvandedInfoForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="type_of_care"
      label="What type of care do you need?"
      type="text"
      component={ReduxField}
    />
    <StyledButton type="submit" disabled={submitting}>
      Contact
    </StyledButton>
  </Form>
);

AdvandedInfoForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default AdvandedInfoForm;
