import React from 'react';
import { arrayOf, object } from 'prop-types';

import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import { community as communityPropType } from 'sly/common/propTypes/community';

export default function TrackedSimilarCommunitiesContainer({ communities, communityStyle }) {
  return (
    <SimilarCommunities
      communities={communities}
      communityStyle={communityStyle}
      getEvent={(community, index) => ({
        action: 'click',
        category: 'similarCommunity',
        label: index,
        value: community.id,
      })}
    />
  );
}

// EO: this really shouldn't need hydrating. now it only requires it for the lazy image loading.
TrackedSimilarCommunitiesContainer.typeHydrationId = 'TrackedSimilarCommunitiesContainer';
TrackedSimilarCommunitiesContainer.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  communityStyle: object,
};
