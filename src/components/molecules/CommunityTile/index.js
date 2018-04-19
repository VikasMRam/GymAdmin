import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { bool, string, shape, number, func } from 'prop-types';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';
import Checkbox from 'sly/components/molecules/Checkbox';

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

export const CommunityTileDiv = styled.div`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};

  position: relative;
  display: flex;
  border: ${size('border')} solid ${palette('secondary', 0)};
  ${props =>
    props.selected &&
    css`
      background-color: ${palette('secondary', 3)};
    `};

  input[type='checkbox'] {
    margin: 0px;
  }
  input[type='checkbox']:checked {
    background-color: ${palette('secondary', 0)};
  }

  :hover {
    cursor: pointer;
  }

  // Disabling Text selection on the Tile
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const CommunityTileImageDiv = styled.img`
  width: ${size('tile', 'communityRCB', 'width')};
  height: ${size('tile', 'communityRCB', 'height')};
`;
const CommunityTileInfoDiv = styled.div`
  margin: ${size('spacing.large')};
`;

export const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  top: ${size('spacing.small')};
  right: ${size('spacing.small')};
`;

const CommunityTileTitleDiv = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const CommunityTilePriceRatingDiv = styled.div`
  display: flex;
  font-size: ${size('spacing.large')};
`;

const CommunityTileyRatingDiv = styled.div`
  display: flex;
  margin-left: ${size('spacing.xLarge')};
`;

const CommunityTileNumberReviewDiv = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const CommunityTile = ({
  size,
  palette,
  community,
  selectable,
  selected,
  onClick,
  ...props
}) => {
  const {
    name, uri, picture, rating, startingRate, numReviews,
  } = community;
  return (
    <CommunityTileDiv selected={selected} onClick={onClick}>
      <CommunityTileImageDiv src={picture || defaultImage} />
      {selectable && <StyledCheckbox checked={selected} />}
      <CommunityTileInfoDiv>
        <CommunityTileTitleDiv>{name}</CommunityTileTitleDiv>
        <CommunityTilePriceRatingDiv>
          <div>${startingRate} per month</div>
          <CommunityTileyRatingDiv>
            <Rating value={rating} size={size} palette={palette} />
            <CommunityTileNumberReviewDiv>
              {numReviews}
            </CommunityTileNumberReviewDiv>
          </CommunityTileyRatingDiv>
        </CommunityTilePriceRatingDiv>
      </CommunityTileInfoDiv>
    </CommunityTileDiv>
  );
};

CommunityTile.propTypes = {
  selectable: bool,
  selected: bool,
  size: string,
  palette: string,
  onClick: func,
  community: shape({
    name: string.isRequired,
    uri: string.isRequired,
    picture: string.isRequired,
    rating: number,
    startingRate: number,
    numReviews: number,
  }),
};

CommunityTile.defaultProps = {
  palette: 'secondary',
  size: 'medium',
};

export default CommunityTile;
