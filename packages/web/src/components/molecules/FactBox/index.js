import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import { Box, Paragraph, Block } from 'sly/components/atoms';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBox = styled(Box)`
  padding:  ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  }
`;

const FactBox = ({ title, description }) => (
  <StyledBox>
    <StyledBlock size="hero" palette="secondary" variation="dark35">{title}</StyledBlock>
    <Paragraph>{description}</Paragraph>
  </StyledBox>
);

FactBox.propTypes = {
  title: string,
  description: string,
};

export default FactBox;
