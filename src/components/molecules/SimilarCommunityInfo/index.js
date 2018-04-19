import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';

const SimilarCommunityNameDiv = styled.div`
  font-size: ${size('text.subtitle')};
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

const ClammpedDiv = styled.div`
  width: 100%;
  overflow: hidden;
  > div {
    // TODO:  Find a better way to do this
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.lineclamp};
    -webkit-box-orient: vertical;
  }
`;

function getArrayAsString(array) {
  let result = '';
  const { length } = array;
  array.forEach((element, index) => {
    result += element;
    if (index !== length - 1) {
      result += ', ';
    }
  });
  return result;
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
      <ClammpedDiv lineclamp={1}>
        <SimilarCommunityNameDiv>{name}</SimilarCommunityNameDiv>
      </ClammpedDiv>
      <SimilarCommunityPriceRatingDiv>
        <div>${startingRate} per month</div>
        <SimilarCommunityRatingDiv>
          <Rating value={averageRating} size="medium" />
          <SimilarCommunityNumberReviewDiv>
            {numberRatings}
          </SimilarCommunityNumberReviewDiv>
        </SimilarCommunityRatingDiv>
      </SimilarCommunityPriceRatingDiv>
      <ClammpedDiv lineclamp={1}>
        <div>Care Type: {getArrayAsString(typeCare)}</div>
      </ClammpedDiv>
      <ClammpedDiv lineclamp={1}>
        <div>Floor Plans: {getArrayAsString(floorPlansArray)}</div>
      </ClammpedDiv>
      <SimilarCommunityDescDiv>
        <ClammpedDiv lineclamp={2}>
          <div>{communityDescription}</div>
        </ClammpedDiv>
      </SimilarCommunityDescDiv>
    </div>
  );
};

SimilarCommunityInfo.propTypes = {
  similarProperty: PropTypes.object.isRequired,
};

export default SimilarCommunityInfo;
