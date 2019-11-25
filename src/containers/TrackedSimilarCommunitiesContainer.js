import React from 'react';
import { arrayOf, object } from 'prop-types';

import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import { community as communityPropType } from 'sly/propTypes/community';
import { withUrlEvent } from 'sly/services/helpers/community';

export default function TrackedSimilarCommunitiesContainer({ communities, communityStyle }) {
  return (
    <SimilarCommunities
      communities={communities.map((community, index) =>
        withUrlEvent(community, {
          action: 'click',
          category: 'similarCommunity',
          label: index,
          value: community.id,
        })
      )}
      communityStyle={communityStyle}
    />
  );
}
TrackedSimilarCommunitiesContainer.typeHydrationId = 'TrackedSimilarCommunitiesContainer';
TrackedSimilarCommunitiesContainer.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  communityStyle: object,
};
