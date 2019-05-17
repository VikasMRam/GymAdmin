import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

// import { size } from 'sly/components/themes';
import { prefetch } from 'sly/services/newApi';
import { getPaginationData } from 'sly/services/helpers/pagination';
import textAlign from 'sly/components/helpers/textAlign';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import { Block, Link } from 'sly/components/atoms';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import Pagination from 'sly/components/molecules/Pagination';

const CenteredBlock = textAlign(Block);

const StyledCommunityTile = styled(shadow(CommunityTile))`
// todo height
`;

const PaddedStyledCommunityTile = pad(StyledCommunityTile, 'xLarge');

const StyledPagination = styled(Pagination)`
  margin: auto;
  justify-content: center;
`;

@prefetch('searchResources', 'getSearchResources', (req, { state, city, pageNumber }) => req({
  state,
  city,
  'page-number': pageNumber,
}))

@withRouter

export default class SearchResultsContainer extends Component {
  static propTypes = {
    status: object.isRequired,
    searchResources: arrayOf(object),
    location: object,
  };

  render() {
    const { searchResources, status, location } = this.props;
    const basePath = location.pathname;

    if (!status.searchResources.hasStarted || status.searchResources.isLoading) {
      return (
        <CenteredBlock>Searching...</CenteredBlock>
      );
    }

    // no results
    if (!searchResources || !searchResources.length) {
      return (
        <CenteredBlock>No matching results found!</CenteredBlock>
      );
    }

    const requestMeta = status.searchResources.meta;
    const { current, total } = getPaginationData(requestMeta);

    const communityTiles = searchResources.map((sr, i) => {
      const ct = i === searchResources.length - 1 && total < 2 ?
        <StyledCommunityTile layout="column" showFloorPlan={false} noGallery community={sr} /> :
        <PaddedStyledCommunityTile layout="column" showFloorPlan={false} noGallery community={sr} />;
      return <Link key={sr.id} href={sr.url} target="_blank">{ct}</Link>;
    });

    return (
      <section>
        {communityTiles}
        <StyledPagination
          basePath={basePath}
          pageParam="page-number"
          current={current}
          total={total}
          useHref={false}
        />
      </section>
    );
  }
}
