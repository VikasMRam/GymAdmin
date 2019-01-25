import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size, assetPath, palette, key } from 'sly/components/themes';
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
    ${palette('slate', 'stroke')};
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
    background: ${palette('white', 'base')};
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('slate', 'filler')}80;

    Button {
      display: initial;
    }
  }
`;

const StyledLazy = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    min-width: 0;
    flex-shrink: 0;
    background: ${palette('slate', 'stroke')};
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
      background: ${palette('white', 'base')};
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
  const { name } = similarProperty;
  if (!imageUrl || imageUrl.indexOf('maps.googleapis.com/maps/api/streetview') > -1) {
    imageUrl = communityDefaultImages[similarProperty.communitySize];
  }

  return (
    <Wrapper onClick={onClick} borderless={borderless}>
      <StyledLazy>
        <ImageWrapper src={imageUrl} aspectRatio="16:9" alt={`${name}`}>
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
