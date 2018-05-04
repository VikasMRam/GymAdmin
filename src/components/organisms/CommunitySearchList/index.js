import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from "sly/components/atoms/Link";

const SimilarCommunityTileDiv = styled.div`
  padding-bottom: ${size('spacing.large')};
  padding-right: ${size('spacing.regular')};
  padding-left: ${size('spacing.regular')};
`;


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
  }
  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
  }
`;


function getFullCommunity({
  name,
  numRatings,
  ratingsValue,
  description,
  addressString,
  imageUrl,
  startingPrice,
  webViewInfo
  }) {

  return {
    name,
    mainImage: imageUrl,
    startingRate: startingPrice,
    propInfo:{
      communityDescription: description,
      typeCare: webViewInfo.firstLineValue.split(',')
    } ,
    propRatings: {
      reviewsValue: ratingsValue,
      numReviews: numRatings
    }
  };
}


const CommunitySearchList = ({ communityList }) => {

  const components = communityList.map((similarProperty) => {
    return (
      <Link key={similarProperty.id} to={similarProperty.url}>
        <SimilarCommunityTileDiv >
          <SimilarCommunityTile similarProperty={getFullCommunity(similarProperty)} />
        </SimilarCommunityTileDiv>
      </Link>
    );
  });
  return (
    <SectionWrapper>{components}</SectionWrapper>
  );
};

CommunitySearchList.propTypes = {
  communityList: arrayOf(object).isRequired,

};

export default CommunitySearchList;
