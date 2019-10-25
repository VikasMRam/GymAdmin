import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Block } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;
Form.displayName = 'Form';

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const BottomWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  flex: 1 1 0;
  margin-bottom: ${size('spacing.regular')};
  margin-bottom: ${ifProp('error', size('spacing.large'), 'initial')};
`;

const EbookForm = ({
  handleSubmit, submitting, error,
}) => (
  <Form onSubmit={handleSubmit}>
    <StyledField
      name="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
    <BottomWrapper>
      <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
        Email me the free eBook
      </StyledButton>
    </BottomWrapper>
  </Form>
);

EbookForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  onLoginClicked: func,
  error: string,
};

export default EbookForm;
