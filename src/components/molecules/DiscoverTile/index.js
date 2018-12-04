import React from 'react';
import styled from 'styled-components';
import { string, func, shape } from 'prop-types';

import { size, assetPath, palette, key } from 'sly/components/themes';
import { Image, Button, Link } from 'sly/components/atoms';

const Wrapper = styled(Link)`
  display: block;
  margin-top: ${size('element.xxLarge')};
  text-align: center;

  color: ${palette('slate', 0)};

  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.tiny')};
  padding: 0 ${size('spacing.large')};
  padding-bottom: ${size('spacing.xLarge')};

  transition: box-shadow ${key('transitions.default')}
    , opacity ${key('transitions.default')}
    , transform ${key('transitions.default')};

  &:hover {
    color: ${palette('slate', 0)};
    cursor: pointer;
    background: ${palette('white', 'base')};
    box-shadow:
      0
      ${size('spacing.small')}
      ${size('spacing.large')}
      ${palette('slate', 'filler')}80;
    transform: scale(1.002);
    border-radius: ${size('spacing.small')};
  }
`;

export const ImageWrapper = styled(Image)`
  width: ${size('element.xHuge')};
  height: ${size('element.xHuge')};
  margin-top: -${size('element.xxLarge')};
  margin-bottom: ${size('spacing.regular')};
`;

const HeadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.regular')};
`;

const SubheadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
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
      <ImageWrapper src={assetPath(badgeImageUrl)} />
      <HeadingWrapper>{badgeName}</HeadingWrapper>
      <SubheadingWrapper>{badgeText}</SubheadingWrapper>
      <Button>Learn More</Button>
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
