import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, node, func, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Block, Hr, Button } from 'sly/components/atoms';

const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
  background-color: ${palette('white.base')};
`;

const HeadingBlock = styled(Block)`
  padding: ${size('spacing.xLarge')};
  padding-bottom: 0;
`;

const BottomButton = styled(Button)`
  margin-bottom: ${size('spacing.xLarge')};
  margin-right: ${size('spacing.xLarge')};
  margin-left: auto;
`;

const Body = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${ifProp('hasBottom', 0, size('spacing.xLarge'))};
`;

const FormSection = ({
  heading, children, buttonText, error, handleSubmit, pristine, submitting, invalid,
}) => (
  <WrapperForm onSubmit={handleSubmit}>
    <HeadingBlock size="subtitle" weight="medium">{heading}</HeadingBlock>
    <Hr />
    <Body hasBottom={buttonText}>
      {children}
      {error && <Block palette="danger">{error}</Block>}
    </Body>
    {buttonText &&
      <Fragment>
        <Hr />
        <BottomButton type="submit" kind="jumbo" disabled={invalid || pristine || submitting}>{buttonText}</BottomButton>
      </Fragment>
      }
  </WrapperForm>
);

FormSection.propTypes = {
  heading: string.isRequired,
  children: node.isRequired,
  buttonText: string,
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  invalid: bool,
  error: string,
};

export default FormSection;
