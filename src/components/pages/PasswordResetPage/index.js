import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import Footer from 'sly/components/organisms/Footer';
import { Heading, Block, Button } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
  margin: auto;
  margin-bottom: ${size('spacing.xxLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 50%;
  }
`;
Form.displayName = 'StyledForm';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xxLarge')};
`;
StyledBlock.displayName = 'StyledBlock';

const StyledButton = styled(Button)`
  margin-bottom: ${ifProp('error', size('spacing.large'), 'initial')};
`;
StyledButton.displayName = 'StyledButton';

const PasswordResetPage = ({ handleSubmit, submitting, error }) => (
  <>
    <TemplateHeader><HeaderContainer /></TemplateHeader>
    <TemplateContent>
      <Form onSubmit={handleSubmit}>
        <Heading>Reset your password</Heading>
        <StyledBlock>Enter a new password</StyledBlock>
        <Field
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          component={ReduxField}
        />
        <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
          Change my password
        </StyledButton>
        {error && <Block palette="danger">{error}</Block>}
      </Form>
    </TemplateContent>
    <Footer />
  </>
);

PasswordResetPage.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
};

export default PasswordResetPage;
