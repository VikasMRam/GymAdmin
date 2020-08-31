import React from 'react';
import styled from 'styled-components';
import { string, node, func, bool } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Block, Hr, Button } from 'sly/common/components/atoms';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';

const BottomWrapper = styled.div`
  margin-left: -${size('spacing.xLarge')};
  margin-right: -${size('spacing.xLarge')};
  text-align: right;
`;

const BottomButton = styled(Button)`
  margin-right: ${size('spacing.xLarge')};
`;

const SectionForm = ({
  heading, children, buttonText, error, handleSubmit, pristine, submitting, invalid,
  hasNoBodyPadding,
}) => (
  <form onSubmit={handleSubmit}>
    <HeadingBoxSection heading={heading} hasNoBodyPadding={hasNoBodyPadding}>
      {children}
      {error && <Block palette="danger">{error}</Block>}
      {buttonText &&
        <BottomWrapper>
          <Hr />
          <BottomButton type="submit" disabled={invalid || pristine || submitting}>{buttonText}</BottomButton>
        </BottomWrapper>
      }
    </HeadingBoxSection>
  </form>
);

SectionForm.propTypes = {
  heading: node.isRequired,
  children: node.isRequired,
  buttonText: string,
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  invalid: bool,
  error: string,
  hasNoBodyPadding: bool,
};

export default SectionForm;
