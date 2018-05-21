import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import Dotdotdot from 'react-dotdotdot';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/molecules/Rating';

const SimilarCommunityNameDiv = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const SimilarCommunityPriceRatingDiv = styled.div`
  display: flex;
  color: ${palette('slate', 0)};
  font-size: ${size('text.body')};
  margin-bottom:${size('spacing.regular')}
`;

const SimilarCommunityRatingDiv = styled.div`
  margin-left: ${size('spacing.xLarge')};
`;

const SimilarCommunityNumberReviewDiv = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const CareFloorPlanDiv = styled.div`
  display: flex;
  color: ${palette('slate', 0)}
`;
const SimilarCommunityDescDiv = styled.div`
  display: flex;
  color: ${palette('grayscale', 0)};
  margin-top:${size('spacing.regular')}
`;

function getArrayAsString(array=[]) {
  return array.join(', ');
}

const SimilarCommunityInfo = ({ similarProperty }) => {
  const {
    name, startingRate, propInfo, propRatings, floorPlanString,
  } = similarProperty;
  const { communityDescription, typeCare } = propInfo;
  // TODO : Get the following values from API Response
  const { reviewsValue, numReviews } = propRatings;
  return (
    <div>
      <SimilarCommunityNameDiv>
        <Dotdotdot clamp={1}>{name}</Dotdotdot>
      </SimilarCommunityNameDiv>
      <SimilarCommunityPriceRatingDiv>
        {
          (startingRate && startingRate > 0) ? (<Dotdotdot clamp={1}>${startingRate} per month</Dotdotdot>) : null
        }
        {
          (numReviews && numReviews > 0) ? (
            <SimilarCommunityRatingDiv>
              <Rating value={reviewsValue} size="regular" />
              {numReviews > 0 && (
                <SimilarCommunityNumberReviewDiv>
                  {numReviews}
                </SimilarCommunityNumberReviewDiv>
              )}
            </SimilarCommunityRatingDiv>) : null
        }
      </SimilarCommunityPriceRatingDiv>
      <CareFloorPlanDiv>
        <Dotdotdot clamp={1}>{getArrayAsString(typeCare)}</Dotdotdot>
        <Dotdotdot clamp={1}>Floor Plans: {floorPlanString}</Dotdotdot>
      </CareFloorPlanDiv>
      <SimilarCommunityDescDiv>
        <Dotdotdot clamp={2}>{communityDescription}</Dotdotdot>
      </SimilarCommunityDescDiv>
    </div>
  );
};

SimilarCommunityInfo.propTypes = {
  similarProperty: PropTypes.object.isRequired,
};

export default SimilarCommunityInfo;
