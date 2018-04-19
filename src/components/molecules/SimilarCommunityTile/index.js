import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';

// TODO : Tech Dept - Similar Code as of RoomTile Molecule. Find how to reuse

const defaultImage =
  '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

const Wrapper = styled.div`
  display: inline-block;
  border: ${size('border')} solid ${palette('grayscale', 2)};
  width: ${size('tile', 'mediumSC', 'width')};
  transition: box-shadow ${key('transitions.default')},
    opacity ${key('transitions.default')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    width: auto;
  }

  &:hover {
    cursor: default;
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.regular')}
      ${palette('grayscale', 1, true)};
    opacity: 0.75;
    background: ${palette('white', 2)};

    button {
      display: initial;
    }
  }
`;

const SCTileImage = styled.img`
  width: ${size('tile', 'mediumSC', 'width')};
  height: ${size('tile', 'mediumSC', 'height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('tile', 'smallSC', 'width')};
    height: ${size('tile', 'smallSC', 'height')};
  }
`;

const ChildrenWrapper = styled.div`
  margin-top: ${size('spacing.large')};
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
  margin-left: ${size('spacing.xLarge')};
`;

const SimilarCommunityTile = ({ similarProperty, onClick }) => {
  const { mainImage } = similarProperty;
  return (
    <Wrapper onClick={onClick}>
      <SCTileImage src={mainImage || defaultImage} />
      <ChildrenWrapper>
        <SimilarCommunityInfo similarProperty={similarProperty} />
      </ChildrenWrapper>
    </Wrapper>
  );
};

SimilarCommunityTile.propTypes = {
  similarProperty: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default SimilarCommunityTile;

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
