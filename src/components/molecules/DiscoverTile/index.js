import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { string, func, shape } from 'prop-types';

import { size } from 'sly/components/themes';
import { Image, Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-radius: ${size('spacing.tiny')};
  padding: 0 24px;
  margin-top: 100px;

  &:hover {
    cursor: pointer;
    background: #fff;
    box-shadow: 0 ${size('spacing.regular')} ${size('spacing.large')} ${palette('grayscale', 0)}80;
  }
`;

export const ImageWrapper = styled(Image)`
  margin: 0 auto;
  margin-top: -100px;
  margin-bottom: ${size('spacing.large')};
`;

const HeadingWrapper = styled.div`
  margin: 0 auto;
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.regular')};
`;

const SubheadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
  margin-bottom: ${size('spacing.xxxLarge')};
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
  margin-bottom: ${size('spacing.large')};
`;

const DiscoverTile = ({ content, onClick }) => {
  const { imageUrl, heading, subHeading } = content;
  return (
    <Wrapper onClick={onClick}>
      <ImageWrapper src={imageUrl} />
      <HeadingWrapper>{heading}</HeadingWrapper>
      <SubheadingWrapper>{subHeading}</SubheadingWrapper>
      <StyledButton>Learn More</StyledButton>
    </Wrapper>
  );
};

DiscoverTile.propTypes = {
  content: shape({
    imageUrl: string,
    heading: string,
    subHeading: string,
  }),
  onClick: func,
};

export default DiscoverTile;
