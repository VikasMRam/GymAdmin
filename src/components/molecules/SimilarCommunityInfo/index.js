import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import Dotdotdot from 'react-dotdotdot';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';

const SimilarCommunityNameDiv = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
`;

const SimilarCommunityPriceRatingDiv = styled.div`
  display: flex;
  font-size: ${size('text.body')};
`;

const SimilarCommunityRatingDiv = styled.div`
  display: flex;
  margin-left: ${size('spacing.xLarge')};
`;

const SimilarCommunityNumberReviewDiv = styled.div`
  margin-left: ${size('spacing.regular')};
`;

const SimilarCommunityDescDiv = styled.div`
  color: ${palette('grayscale', 0)};
`;

function getArrayAsString(array) {
  return array.join(', ');
}

const SimilarCommunityInfo = ({ similarProperty }) => {
  const { name, startingRate, propInfo } = similarProperty;
  const { communityDescription, typeCare } = propInfo;
  // TODO : Get the following values from API Response
  const averageRating = 5;
  const numberRatings = 60;
  const floorPlansArray = ['1 Bedroom', 'Studio'];
  return (
    <div>
      <SimilarCommunityNameDiv>
        <Dotdotdot clamp={1}>{name}</Dotdotdot>
      </SimilarCommunityNameDiv>
      <SimilarCommunityPriceRatingDiv>
        <Dotdotdot clamp={1}>${startingRate} per month</Dotdotdot>
        <SimilarCommunityRatingDiv>
          <Rating value={averageRating} size="medium" />
          <SimilarCommunityNumberReviewDiv>
            {numberRatings}
          </SimilarCommunityNumberReviewDiv>
        </SimilarCommunityRatingDiv>
      </SimilarCommunityPriceRatingDiv>
      <Dotdotdot clamp={1}>Care Type: {getArrayAsString(typeCare)}</Dotdotdot>
      <Dotdotdot clamp={1}>
        Floor Plans: {getArrayAsString(floorPlansArray)}
      </Dotdotdot>
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
