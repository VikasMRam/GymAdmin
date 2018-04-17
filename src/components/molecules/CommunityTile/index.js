import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { bool, string, shape, number } from 'prop-types';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';

const defaultImage =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const PaddingWrapper = styled.div`
  padding-bottom: 16px;
`;

const CommunityTileDiv = styled.div`
  display: flex;
  column-count: 2;
  border: ${size('border')} solid ${palette('secondary', 0)};
`;

const CommunityTileImageDiv = styled.img`
  width: 112px;
  height: 84px;
`;
const CommunityTileInfoDiv = styled.div`
  margin: 16px;
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
  size, palette, community, selectable, ...props
}) => {
  const {
    name, uri, picture, rating, startingRate, numReviews,
  } = community;
  return (
    <PaddingWrapper>
      <CommunityTileDiv>
        <CommunityTileImageDiv src={picture || defaultImage} />
        <CommunityTileInfoDiv>
          <CommunityTileTitleDiv>{name}</CommunityTileTitleDiv>
          <CommunityTilePriceRatingDiv>
            <div>${startingRate} per month</div>
            <CommunityTileyRatingDiv>
              <Rating value={rating} size="medium" />
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
  size: string,
  palette: string,
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
  size: 'small',
};

export default CommunityTile;
