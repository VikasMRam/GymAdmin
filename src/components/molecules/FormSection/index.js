import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, node, func, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Block, Hr, Button } from 'sly/components/atoms';

const WrapperForm = styled.form`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
  padding: ${size('spacing.large')};
`;

const HeadingBlock = styled(Block)`
  padding: ${size('spacing.regular')};
  padding-bottom: 0;
`;

const BottomButton = styled(Button)`
  float: right;
  margin-bottom: ${size('spacing.regular')};
`;

const FormSection = ({
  heading, children, buttonText, onSubmit, pristine, submitting,
}) => (
  <WrapperForm onSubmit={onSubmit}>
    <HeadingBlock size="subtitle" weight="medium">{heading}</HeadingBlock>
    <Hr fullWidth />
    {children}
    {buttonText && onSubmit &&
      <Fragment>
        <Hr fullWidth />
        <BottomButton type="submit" palette="primary" disabled={pristine || submitting}>{buttonText}</BottomButton>
      </Fragment>
      }
  </WrapperForm>
);

FormSection.propTypes = {
  heading: string.isRequired,
  children: node.isRequired,
  buttonText: string,
  onSubmit: func,
  pristine: bool,
  submitting: bool,
};

export default FormSection;
