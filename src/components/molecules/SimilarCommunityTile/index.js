import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Lazy } from 'react-lazy';
import { Image, Button } from 'sly/components/atoms';
import SimilarCommunityInfo from 'sly/components/molecules/SimilarCommunityInfo';

const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

// TODO : Tech Debt - Similar Code as of RoomTile Molecule. Find how to reuse

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid
    ${palette('grayscale', 2)};
  transition: box-shadow ${key('transitions.default')}
    , opacity ${key('transitions.default')}
    , transform ${key('transitions.default')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    transform: scale(1);
    box-sizing: content-box;
    height: ${size('tile.regular.height')};
    overflow: hidden;

    padding: ${size('spacing.large')};
    flex-direction: row;
    border-radius: ${size('spacing.tiny')};
  }

  // because we are passing aspectRatio prop, we have a relative position
  // in the Image so we can use here absolute
  Button {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      transform: scale(1.002);
      border-radius: ${size('spacing.small')};
    }

    cursor: pointer;
    background: ${palette('white', 0)};
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grayscale', 0)}80;

    Button {
      display: initial;
    }
  }
`;

const StyledLazy = styled(Lazy)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    min-width: 0;
    flex-shrink: 0;
    background: ${palette('grayscale', 2)};
    width: ${size('tile.regular.width')};
    height: ${size('tile.regular.height')};
  }
`;

const ImageWrapper = styled(Image)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tile.regular.width')};
    height: ${size('tile.regular.height')};
    padding-top: unset;

    > img {
      position: relative;
      width: ${size('tile.regular.width')};
      height: ${size('tile.regular.height')};
      max-width: none;
      background: ${palette('white', 0)};
    }
  }
`;

const Info = styled(SimilarCommunityInfo)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-grow: 1;
    margin-top: 0;
    margin-left: ${size('spacing.large')};
  }
`;

const SimilarCommunityTile = ({ similarProperty, onClick, borderless }) => {
  let { imageUrl } = similarProperty;
  if (!imageUrl || imageUrl.indexOf('maps.googleapis.com/maps/api/streetview') > -1) {
    imageUrl = communityDefaultImages[similarProperty.communitySize];
  }

  return (
    <Wrapper onClick={onClick} borderless={borderless}>
      <StyledLazy component="div" ltIE9>
        <ImageWrapper src={imageUrl} aspectRatio="16:9">
          <Button onClick={onClick}>See More Details</Button>
        </ImageWrapper>
      </StyledLazy>
      <Info similarProperty={similarProperty} />
    </Wrapper>
  );
};

SimilarCommunityTile.propTypes = {
  similarProperty: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  borderless: PropTypes.bool,
};

SimilarCommunityTile.defaultProps = {
  borderless: false,
};

export default SimilarCommunityTile;
