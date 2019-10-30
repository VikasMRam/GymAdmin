import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import textAlign from 'sly/components/helpers/textAlign';
import { size, assetPath } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Block, Heading } from 'sly/components/atoms';


const Wrapper =  styled.div`
  display: grid;
  grid-template-columns: ${size('spacing.xxxLarge')} 1fr ${size('spacing.xxxLarge')};
  grid-template-rows: 1fr 1fr;
`;

const Header = styled.div`
  /* background: orangered; */
  padding: ${size('spacing.xxxLarge')};
  background-image: url(${assetPath('images/ebook-form-bg.png')});
  background-size: cover;
  background-position: center;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;`;

const Content = styled.div`
  border-top-right-radius: ${size('border.xxLarge')};
  border-top-left-radius: ${size('border.xxLarge')};
  padding: ${size('spacing.xLarge')};
  background: #FFF;
  top: -${size('spacing.xLarge')} ;
  position: relative;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
`;

const StyledHeading = textAlign(Heading);

const StyledDescrition = styled.div`
  color: #FFF
`;

const Description = textAlign(StyledDescrition);

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
  <Wrapper>
    <Header>
      <StyledHeading>
      Exclusive Offer!
        <br />
      Get our free eBook
      </StyledHeading>
      <Description>
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
