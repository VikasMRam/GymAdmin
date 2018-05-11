import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from 'sly/components/atoms/Link';
import CommunityFilterBar from 'sly/components/organisms/CommunityFilterBar';
import Pagination from 'sly/components/molecules/Pagination';

const SimilarCommunityTileDiv = styled.div`
  padding: 0 ${size('spacing.large')};
  padding-bottom: ${size('spacing.large')};
`;

const SectionWrapper = styled.div``;

function getFullCommunity({
  name,
  numReviews,
  reviewsValue,
  description,
  addressString,
  imageUrl,
  startingRate,
  webViewInfo,
}) {
  return {
    name,
    mainImage: imageUrl,
    startingRate,
    propInfo: {
      communityDescription: description,
      typeCare: webViewInfo.firstLineValue.split(','),
    },
    propRatings: {
      reviewsValue,
      numReviews,
    },
  };;
}

const CommunitySearchList = ({ communityList, ...props }) => {
  if (communityList.length < 1) {
    return <SectionWrapper>Loading!</SectionWrapper>;
  }
  const components = communityList.map((similarProperty) => {
    return (
      <Link key={similarProperty.id} to={similarProperty.url}>
        <SimilarCommunityTileDiv>
          <SimilarCommunityTile
            similarProperty={getFullCommunity(similarProperty)}
          />
        </SimilarCommunityTileDiv>
      </Link>
    );
  });
  return (
    <SectionWrapper>
      <CommunityFilterBar {...props} />
      {components}
      <Pagination onChange={()=>{}} current={0} total={15} />
    </SectionWrapper>
  );
};

CommunitySearchList.propTypes = {
  communityList: arrayOf(object).isRequired,
};

export default CommunitySearchList;
