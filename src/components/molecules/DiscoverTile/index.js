import React from 'react';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';
import { string, func, shape } from 'prop-types';

import { size } from 'sly/components/themes';
import { Image, Button, Link } from 'sly/components/atoms';

const Wrapper = styled(Link)`
  margin-top: ${size('element.xxLarge')};
  display: flex;
  flex-direction: column;

  color: ${palette('slate', 0)};

  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  border-radius: ${size('spacing.tiny')};
  padding: ${size('spacing.large')};
  padding-top: 0;

  transition: box-shadow ${key('transitions.default')}
    , opacity ${key('transitions.default')}
    , transform ${key('transitions.default')};

  &:hover {
    color: ${palette('slate', 0)};
    cursor: pointer;
    background: ${palette('white', 0)};
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
  width: ${size('element.huge')};
  height: ${size('element.huge')};
  margin-top: -${size('element.xxLarge')};
  margin-bottom: ${size('spacing.large')};
`;

const HeadingWrapper = styled.div`
  margin: 0 auto;
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.regular')};
`;

const SubheadingWrapper = styled.div`
  flex: 1 0;
  font-size: ${size('text.subtitle')};
  margin-bottom: ${size('spacing.large')};
  text-align: center;
`;

const StyledButton = styled(Button)`
  flex: 0 0 ${size('element.regular')};
  margin: 0 auto;
  margin-bottom: ${size('spacing.large')};
`;

const DiscoverTile = ({ content, ...props }) => {
  const {
    badgeImageUrl,
    badgeName,
    badgeText,
  } = content;

  return (
    <Wrapper {...props}>
      <ImageWrapper src={badgeImageUrl} />
      <HeadingWrapper>{badgeName}</HeadingWrapper>
      <SubheadingWrapper>{badgeText}</SubheadingWrapper>
      <StyledButton palette="primary">Learn More</StyledButton>
    </Wrapper>
  );
};

DiscoverTile.propTypes = {
  content: shape({
    badgeImageUrl: string,
    badgeName: string,
    badgeText: string,
  }),
  onClick: func,
};

export default DiscoverTile;
