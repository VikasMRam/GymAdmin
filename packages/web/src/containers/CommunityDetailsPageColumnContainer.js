import React from 'react';

import { community as communityPropType } from 'sly/web/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/web/components/organisms/GetCommunityPricingAndAvailability';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';

export default function CommunityDetailsPageColumnContainer({ community }) {
  const { address: { state }} = community;
  if ( state === 'TX' || state === 'PA' || state === 'NJ') {
    return <GetAssessmentBoxContainer community={community} startLink={`/wizards/assessment/community/${community.id}`} layout="sidebar" />
  } else {
    return <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
  }
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
