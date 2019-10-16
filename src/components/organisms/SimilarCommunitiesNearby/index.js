import React from 'react';
import { object, arrayOf, number } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import SimilarCommunityNearbyTile from 'sly/components/molecules/SimilarCommunityNearbyTile';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${size('spacing.xLarge')};
  grid-column-gap: ${size('spacing.large')};
`;

const SimilarCommunitiesNearby = ({ similarCommunities, communitiesPerRow }) => {
  const components = similarCommunities.map(similarCommunity => (
    <Link
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
        address={similarCommunity.addressString}
      />
    </Link>
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
