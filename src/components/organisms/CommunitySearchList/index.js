import React, { Component } from 'react';
import styled from 'styled-components';
import { object, arrayOf, func } from 'prop-types';

import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from 'sly/components/atoms/Link';
import CommunityFilterBar from 'sly/components/organisms/CommunityFilterBar';
import Pagination from 'sly/components/molecules/Pagination';

const SimilarCommunityTileDiv = styled.div`
  margin-bottom: ${size('spacing.large')};
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
    floorPlanString: webViewInfo.secondLineValue,
    propRatings: {
      reviewsValue,
      numReviews,
    },
  };
}

const getPaginationData = (requestMeta) => ({
  current: requestMeta['page-number'],
  total: requestMeta['filtered-count'] / requestMeta['page-size'],
});

export default class CommunitySearchList extends Component {
  static propTypes = {
    requestMeta: object.isRequired,
    searchParams: object.isRequired,
    onParamsChange: func.isRequired,
    communityList: arrayOf(object).isRequired,
  };

  onPageChange = (page) => {
    const { onParamsChange } = this.props;
    onParamsChange({
      changedParams: { 'page-number': page },
    });
  };

  render() {
    const { communityList, requestMeta, ...props } = this.props;

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
    const { current, total } = getPaginationData(requestMeta);
    return (
      <SectionWrapper>
        <CommunityFilterBar {...props} />
        {components}
        <Pagination onChange={this.onPageChange} current={current} total={total} />
      </SectionWrapper>
    );
  }
};

