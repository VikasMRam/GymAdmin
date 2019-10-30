import React from 'react';
import { arrayOf, object } from 'prop-types';
import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import SlyEvent from 'sly/services/helpers/events';
import { community as communityPropType } from 'sly/propTypes/community';

const sendEvent = (index, to) => {
  const event = {
    action: 'click',
    category: 'similarCommunity',
    label: index.toString(),
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

export default function TrackedSimilarCommunitiesContainer({
  communities,
  communityStyle,
}) {
  return (
    <SimilarCommunities
      onCommunityClick={sendEvent}
      communities={communities}
      communityStyle={communityStyle}
    />
  );
}

TrackedSimilarCommunitiesContainer.propTypes = {
  communities: arrayOf(communityPropType).isRequired,
  communityStyle: object,
};
