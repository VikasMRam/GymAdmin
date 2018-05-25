import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { object, arrayOf, func } from 'prop-types';


import { size } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import Link from 'sly/components/atoms/Link';
import CommunityFilterBar from 'sly/components/organisms/CommunityFilterBar';
import Pagination from 'sly/components/molecules/Pagination';
import Heading from 'sly/components/atoms/Heading';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';

import { getBreadCrumbsForLocation } from 'sly/services/helpers/url';

const CommunityFilterBarWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
const StyledLink = styled(Link)`
  display: block;
  margin-bottom: ${size('spacing.large')};
`;

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
    console.log('Seeing page change',page);
    onParamsChange({
      changedParams: { 'page-number': page },
    });
  };

  render() {
    const { communityList, requestMeta, searchParams, ...props } = this.props;

    if (communityList.length < 1) {
      return <Heading>It doesn&apos;t look like we have added communities in the area yet.</Heading>;
    }
    const components = communityList.map((similarProperty) => {
      return (
        <StyledLink key={similarProperty.id} to={similarProperty.url}>
          <SimilarCommunityTile
            similarProperty={similarProperty}
          />
        </StyledLink>
      );
    });
    const { current, total } = getPaginationData(requestMeta);
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <CommunityFilterBarWrapper>
          <CommunityFilterBar searchParams={searchParams} {...props} />
        </CommunityFilterBarWrapper>
        {components}
        <Pagination onChange={this.onPageChange} current={current} total={total} />
        <BreadCrumb items={getBreadCrumbsForLocation(searchParams)} />
      </Fragment>
    );
  }
}

