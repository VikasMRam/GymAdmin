import React from 'react';
import { arrayOf, object } from 'prop-types';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import { community as communityPropType } from 'sly/propTypes/community';
import { addEventToUrl } from 'sly/services/helpers/queryParamEvents';

export default function TrackedSimilarCommunitiesContainer({ communities, communityStyle }) {
  return (
    <SimilarCommunities
      communities={communities.map((community, i) => ({
        ...community,
        url: addEventToUrl(
          {
            action: 'click',
            category: 'similarCommunity',
            label: i,
            value: community.id,
          },
          community.url
        ),
      }))}
      communityStyle={communityStyle}
    />
  );
}
TrackedSimilarCommunitiesContainer.typeHydrationId = 'TrackedSimilarCommunitiesContainer';
TrackedSimilarCommunitiesContainer.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  communityStyle: object,
};
