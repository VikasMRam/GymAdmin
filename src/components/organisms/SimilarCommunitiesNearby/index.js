import React from 'react';
import { object, arrayOf, number } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  margin-right: ${size('spacing.xLarge')};
  :nth-child(${prop('communitiesperrow')}n) {
    margin-right: 0;
  }
  margin-bottom: ${size('spacing.large')};
`;
StyledLink.displayName = 'StyledLink';

const SimilarCommunitiesNearby = ({ similarCommunities, communitiesPerRow }) => {
  const components = similarCommunities.map(similarCommunity => (
    <StyledLink
      key={similarCommunity.id}
      to={similarCommunity.url}
      communitiesperrow={communitiesPerRow}
    >
      <SimilarCommunityNearbyTile
        image={similarCommunity.imageUrl}
        name={similarCommunity.name}
        estimatedRate={similarCommunity.estimated || 0}
        startingRate={similarCommunity.startingRate}
        reviewsValue={similarCommunity.reviewsValue}
        numReviews={similarCommunity.numReviews}
      />
    </StyledLink>
  ));

  return <Wrapper>{components}</Wrapper>;
};

SimilarCommunitiesNearby.propTypes = {
  similarCommunities: arrayOf(object).isRequired,
  communitiesPerRow: number,
};

SimilarCommunitiesNearby.defaultProps = {
  communitiesPerRow: 2,
};

export default SimilarCommunitiesNearby;
