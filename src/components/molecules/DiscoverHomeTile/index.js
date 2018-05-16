import React from 'react';
import styled, { css } from 'styled-components';
import { string, shape, oneOf } from 'prop-types';
import { switchProp } from 'styled-tools';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import { Box, Heading, Block, Button, Image } from 'sly/components/atoms';

const width = p => size('picture', p.size, 'width');
const height = p => size('picture', p.size, 'height');
const Wrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${width}) {
    width: ${width};
  }
`;
const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.small')};
`;
const StyledImage = styled(Image)`
  width: 100%;
  height: initial;
  display: block;
  @media screen and (min-width: ${width}) {
    width: ${width};
    height: ${height};
  }
`;
const ButtonWrapper = styled.div`
  align-self: center;
  ${switchProp('size', {
    regular: css`
      align-self: flex-end;
      margin-top: ${size('spacing.regular')};`,
    large: css`
      align-self: flex-end;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        align-self: initial;
      }`,
  })};
`;
const StyledBox = styled(Box)`
  padding: ${size('spacing.xLarge')};
  padding-bottom: ${size('spacing.regular')};
  border-color: ${palette('primary', 3)};
  border-top: 0;
  ${switchProp('size', {
    regular: css`
      padding-bottom: ${size('spacing.xLarge')};`,
    large: css`
      padding-bottom: ${size('spacing.xLarge')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        padding-bottom: initial;
      }`,
  })};
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${switchProp('size', {
    regular: css`
      flex-direction: column;`,
    large: css`
      flex-direction: column;
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        flex-direction: initial;
      }`,
  })};
`;
const StyledTextWrapper = styled.div`
  text-align: left;
`;

const DiscoverHomeTile = ({
  size, image, title, description,
}) => (
  <Wrapper size={size}>
    <StyledImage src={image} size={size} />
    <StyledBox palette="grayscale" size={size}>
      <TwoColumnWrapper size={size}>
        <StyledTextWrapper>
          <StyledHeading>{title}</StyledHeading>
          <Block palette="grayscale">{description}</Block>
        </StyledTextWrapper>
        <ButtonWrapper size={size}>
          <Button href="#">See more</Button>
        </ButtonWrapper>
      </TwoColumnWrapper>
    </StyledBox>
  </Wrapper>
);

DiscoverHomeTile.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  link: shape({
    text: string.isRequired,
    href: string.isRequired,
  }).isRequired,
  size: oneOf(['regular', 'large']),
};

DiscoverHomeTile.defaultProps = {
  size: 'large',
};

export default DiscoverHomeTile;
