import React from 'react';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { bool, string, shape, number, func } from 'prop-types';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';
import { Input } from 'sly/components/atoms';
import Checkbox from 'sly/components/molecules/Checkbox';

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const PaddingWrapper = styled.div`
  padding-bottom: 16px;
`;

const CommunityTileDiv = styled.div`
  position: relative;
  display: flex;
  column-count: 2;
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
  width: 112px;
  height: 84px;
`;
const CommunityTileInfoDiv = styled.div`
  margin: 16px;
`;

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  top: ${size('spacing.small')};
  right: ${size('spacing.small')};
`;

const CommunityTileTitleDiv = styled.div`
  font-size: 18px;
`;

const CommunityTilePriceRatingDiv = styled.div`
  display: flex;
  font-size: 16px;
`;

const CommunityTileyRatingDiv = styled.div`
  display: flex;
  margin-left: 24px;
`;

const CommunityTileNumberReviewDiv = styled.div`
  margin-left: 8px;
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
    <PaddingWrapper onClick={onClick}>
      <CommunityTileDiv selected={selected}>
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
    </PaddingWrapper>
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
