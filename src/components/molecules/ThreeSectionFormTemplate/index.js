import React from 'react';
import { func, node, string, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Heading, Hr, Button } from 'sly/components/atoms';

const StyledHeading = styled(Heading)`
  padding: 0 ${size('spacing.xLarge')};
  padding-top: ${size('spacing.xLarge')};
`;

const Wrapper = styled.div`
  padding: 0 ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.xLarge')};
`;

const Bottom = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  background: ${palette('grey.background')};
  border-top: ${size('border.regular')} solid ${palette('grey.stroke')};
  display: flex;
  justify-content: space-between;
`;

const ThreeSectionFormTemplate = ({
  onCancelClick, onSubmitClick, submitButtonText, children, heading, hasCancel, hasSubmit,
}) => (
  <section>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
    <Hr />
    <Wrapper>
      {children}
    </Wrapper>
    <Bottom>
      {hasCancel && <Button secondary onClick={onCancelClick}>Cancel</Button>}
      {hasSubmit && <Button onClick={onSubmitClick}>{submitButtonText}</Button>}
    </Bottom>
  </section>
);

ThreeSectionFormTemplate.propTypes = {
  onCancelClick: func,
  onSubmitClick: func,
  children: node,
  heading: string,
  hasCancel: bool,
  hasSubmit: bool,
  submitButtonText: string.isRequired,
};

ThreeSectionFormTemplate.defaultProps = {
  submitButtonText: 'Submit',
};

export default ThreeSectionFormTemplate;
