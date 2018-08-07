import React from 'react';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';
import { string, func, shape } from 'prop-types';

import { size, assetPath } from 'sly/components/themes';
import { Image, Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;

  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-radius: ${size('spacing.tiny')};
  padding: ${size('spacing.large')}; 

  transition: box-shadow ${key('transitions.default')}
    , opacity ${key('transitions.default')}
    , transform ${key('transitions.default')};

  &:hover {
    cursor: pointer;
    background: #fff;
    box-shadow:
      0
      ${size('spacing.small')}
      ${size('spacing.large')}
      ${palette('grayscale', 0)}80;
    transform: scale(1.002);
    border-radius: ${size('spacing.small')};
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

const DiscoverTile = ({ content, onClick, ...props }) => {
  const { imageUrl, heading, subHeading } = content;
  return (
    <Wrapper onClick={onClick} {...props}>
      <ImageWrapper src={assetPath(imageUrl)} />
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
