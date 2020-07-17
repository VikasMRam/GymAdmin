import React from 'react';

import { community as communityPropType } from 'sly/common/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />;
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
