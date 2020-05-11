import React from 'react';

import { Experiment, Variant } from 'sly/services/experiments';
import { community as communityPropType } from 'sly/propTypes/community';
import GetCommunityPricingAndAvailability from 'sly/components/organisms/GetCommunityPricingAndAvailability';
import GetHelpNowContainer from 'sly/containers/GetHelpNowContainer';
import AskAgentQuestionContainer from 'sly/containers/AskAgentQuestionContainer';

export default function CommunityDetailsPageColumnContainer({ community }) {
  return (
    <GetCommunityPricingAndAvailability community={community} buttonTo={`/custom-pricing/${community.id}`} />
  );
}

CommunityDetailsPageColumnContainer.propTypes = {
  community: communityPropType,
};

CommunityDetailsPageColumnContainer.typeHydrationId = 'CommunityDetailsPageColumnContainer';
