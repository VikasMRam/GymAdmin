import React from 'react';
import styled, { css } from 'styled-components';
import { string, number } from 'prop-types';
import NumberFormat from 'react-number-format';

import { size } from 'sly/components/themes';

import { Image, Block } from 'sly/components/atoms';

import Rating from 'sly/components/molecules/Rating';

const clamp = css`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Wrapper = styled.div`
  width: ${size('tile.small.width')};
`;

const ImageWrapper = styled(Image)`
  margin-bottom: ${size('spacing.large')};

  > img {
    border-radius: ${size('border.xxLarge')};
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

const Name = styled.div`
  ${clamp};
  margin-bottom: ${size('spacing.regular')};
`;
Name.displayName = 'Name';

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;
RatingWrapper.displayName = 'RatingWrapper';

const StyledRating = styled(Rating)`
  margin-right: ${size('spacing.regular')};
`;

const renderEstimatedRate = startingRate => startingRate ? (
  <Block>
    Estimated <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
  </Block>
) : null;

const renderProviderRate = startingRate => startingRate ? (
  <Block>
    <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" /> per month
  </Block>
) : null;

const renderRate = (estimated, startingRate) =>
  estimated ? renderEstimatedRate(startingRate) : renderProviderRate(startingRate);

const renderReviews = (numReviews, reviewsValue) => {
  if (numReviews > 0) {
    return (
      <RatingWrapper>
        <StyledRating value={reviewsValue} size="small" /> {numReviews}
      </RatingWrapper>
    );
  }
  return null;
};

const SimilarCommunityNearbyTile = ({
  image, name, estimatedRate, startingRate, reviewsValue, numReviews,
}) => (
  <Wrapper>
    <ImageWrapper src={image} aspectRatio="4:3" />
    <Name>{name}</Name>
    {renderRate(estimatedRate, startingRate)}
    {renderReviews(numReviews, reviewsValue)}
  </Wrapper>
);

SimilarCommunityNearbyTile.propTypes = {
  image: string.isRequired,
  name: string.isRequired,
  estimatedRate: number.isRequired,
  startingRate: number.isRequired,
  reviewsValue: number,
  numReviews: number,
};

SimilarCommunityNearbyTile.defaultProps = {
  reviewsValue: 0,
  numReviews: 0,
};

export default SimilarCommunityNearbyTile;
