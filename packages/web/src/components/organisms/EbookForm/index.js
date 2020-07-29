import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { Button, Block, Heading } from 'sly/web/components/atoms';
import { textAlign } from 'sly/web/components/helpers/text';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${size('spacing.xLarge')} 1fr ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('spacing.xxxLarge')} 1fr ${size('spacing.xxxLarge')};
  }`;

Wrapper.displayName = 'Wrapper';

const Header = styled.div`
  padding: ${size('spacing.xxxLarge')};
  background-image: url(${assetPath('images/ebook-form-bg.png')});
  background-size: cover;
  background-position: center;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
 `;

Header.displayName = 'Header';

const Content = styled.div`
  border-top-right-radius: ${size('border.xxLarge')};
  border-top-left-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.xLarge')};
  background: ${palette('white', 'base')};
  top: -${size('spacing.xLarge')} ;
  position: relative;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
`;

Content.displayName = 'Content';

const StyledHeading = textAlign(Heading);

StyledHeading.displayName = 'StyledHeading';

const Description = textAlign(Block);

Description.displayName = 'Description';

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
}) => (<Wrapper>
  <Header>
    <StyledHeading palette="white">
      Exclusive Offer!
      <br />
      Get our free eBook
    </StyledHeading>
    <Description palette="white">
      The Healthy Aging Handbook
      <br />
      A simple and comprehensive guide on senior living
    </Description>
  </Header>
  <Content>
    <Form onSubmit={handleSubmit}>
      <StyledField
        name="email"
        label="Email Address"
        type="email"
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
      <BottomWrapper>
        <StyledButton error={error} type="submit" disabled={submitting}>
          Email me the free eBook
        </StyledButton>
      </BottomWrapper>
    </Form>

  </Content>
</Wrapper>
);

EbookForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  onLoginClicked: func,
  error: string,
};

export default EbookForm;
