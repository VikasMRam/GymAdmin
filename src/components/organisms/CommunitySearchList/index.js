import React, { Component } from 'react';
import styled from 'styled-components';
import { object, arrayOf, func } from 'prop-types';


import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from 'sly/components/atoms/Link';
import CommunityFilterBar from 'sly/components/organisms/CommunityFilterBar';
import Pagination from 'sly/components/molecules/Pagination';
import Heading from 'sly/components/atoms/Heading';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';

import { getBreadCrumbsForCity } from 'sly/services/helpers/url';

const SimilarCommunityTileDiv = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const SectionWrapper = styled.div``;

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
    const { communityList, requestMeta, searchParams, ...props } = this.props;

    if (communityList.length < 1) {
      return <SectionWrapper><Heading>It doesn't look like we have added communities in the area yet. </Heading></SectionWrapper>;
    }
    const components = communityList.map((similarProperty) => {
      return (
        <Link key={similarProperty.id} to={similarProperty.url}>
          <SimilarCommunityTileDiv>
            <SimilarCommunityTile
              similarProperty={similarProperty}
            />
          </SimilarCommunityTileDiv>
        </Link>
      );
    });
    const { current, total } = getPaginationData(requestMeta);
    return (
      <SectionWrapper>
        <CommunityFilterBar searchParams={searchParams} {...props} />
        {components}
        <Pagination onChange={this.onPageChange} current={current} total={total} />
        <BreadCrumb items={getBreadCrumbsForCity(searchParams)} />
      </SectionWrapper>
    );
  }
};

