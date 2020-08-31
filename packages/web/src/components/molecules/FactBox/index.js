import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { Box, Paragraph, Block } from 'sly/common/components/atoms';

const StyledBox = styled(Box)`
  padding:  ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  }
`;

const FactBox = ({ title, description }) => (
  <StyledBox>
    <Block size="hero" palette="primary" variation="base" pad="regular">{title}</Block>
    <Paragraph>{description}</Paragraph>
  </StyledBox>
);

FactBox.propTypes = {
  title: string,
  description: string,
};

export default FactBox;
