import React from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Label, Link } from 'sly/common/components/atoms';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledLabel = styled(Label)`
  margin-bottom: ${size('spacing.large')};
`;

const PhoneCTAWrapper = styled.div`
  background-color: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  padding: ${size('spacing.massive')} ${size('spacing.large')};
  margin: ${size('spacing.xLarge')} auto 0 auto;
  width: 100%;
  text-align: center;
`;

const PhoneCTAFooter = () => (
  <PhoneCTAWrapper>
    <StyledHeading level="subtitle" size="title" palette="white">
      Seniorly is here to help you at no cost
    </StyledHeading>
    <StyledHeading level="subtitle" size="title" palette="white">
      Call us at{' '}
      <Link href="tel:+18558664515" palette="white">(855) 866-4515</Link>
    </StyledHeading>
    <StyledLabel palette="white">
      Our Local Senior Living Experts are standing by
    </StyledLabel>
  </PhoneCTAWrapper>
);

export default PhoneCTAFooter;
