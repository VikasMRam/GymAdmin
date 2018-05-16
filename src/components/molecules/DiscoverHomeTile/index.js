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
  margin-bottom: ${size('spacing.regular')};
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
  align-self: flex-end;
  margin-top: ${size('spacing.large')};
  ${switchProp('size', {
    xLarge: css`
    margin-top: ${size('spacing.large')};
    @media screen and (min-width: ${width}) {
      margin-top: 0;
    }`,
  })};
`;
const StyledBox = styled(Box)`
  padding: ${size('spacing.xLarge')};
  border-color: ${palette('primary', 3)};
  border-top: 0;
`;
const TwoColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${switchProp('size', {
    xLarge: css`
      @media screen and (min-width: ${width}) {
        flex-direction: row;
      }`,
  })};
`;
const StyledTextWrapper = styled.div`
  text-align: left;
`;

const DiscoverHomeTile = ({
  size, image, title, description, link,
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
          <Button href={link.href}>{link.text}</Button>
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
  size: oneOf(['regular', 'large', 'xLarge']),
};

DiscoverHomeTile.defaultProps = {
  size: 'xLarge',
};

export default DiscoverHomeTile;